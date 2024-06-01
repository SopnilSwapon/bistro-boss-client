import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTiltle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Payment = () => {
    return (
        <div>
            <SectionTitle subHeading='----Pay to Eat' heading='Payment Gateway'></SectionTitle>
           <Elements stripe={stripePromise}>
          <CheckOutForm></CheckOutForm>
           </Elements>
        </div>
    );
};

export default Payment;