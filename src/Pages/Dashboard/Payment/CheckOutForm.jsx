import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = () => {
    const [payError, setPayError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const {user} = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {cart, refetch} = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price ,0)

    useEffect(() =>{
     if(totalPrice > 0){
        axiosSecure.post('/create-payment-intent', {
            price: totalPrice
         })
         .then(res =>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
         })
     }
    },[axiosSecure, totalPrice])
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement);
        if(card == null){
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            console.log('payment error', error);
            setPayError(error.message)
        }
        else{
            console.log('payment method', paymentMethod);
            setPayError('');
        }
        // confirm payment
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || 'anonymous'
                }
            }
        })
        if(confirmError){
            console.log('confirm error', confirmError);
        }
        else{
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log("transaction id",paymentIntent.id);
                setTransactionId(paymentIntent.id)
            }
            // now save the payment in the database
            const payment = {
                email: user?.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                cardIds: cart.map( item =>item._id),
                menuItemIds: cart.map(item =>item.menuId),
                status: 'pending',
            }
            const res = await axiosSecure.post('/payments', payment);
            console.log('payment save',res.data);
            refetch()
            if(res.data.paymentResult){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Payment has been successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }
    return (
    
           <form className="pl-5" onSubmit={handleSubmit}>
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-primary mt-3 btn-sm" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-500">{payError}</p>
      {
        transactionId && <p className="text-green-600">Your transaction : {transactionId}</p>
      }
           </form>
    );
};

export default CheckOutForm;