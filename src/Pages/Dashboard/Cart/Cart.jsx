import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Cart = () => {
    const {cart} = useCart();
    const {refetch} = useCart();
    const axiosSecure = useAxiosSecure()
    const totalPrice = cart.reduce((totalPrice, itemPrice) =>
     totalPrice + itemPrice.price , 0);
    const handleItemDelete = (id) =>{
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete it",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
         
          axiosSecure.delete(`/carts/${id}`)
          .then(res =>{
           if(res.data.deletedCount > 0){
            Swal.fire({
            title: "Deleted!",
            text: "This food has been deleted.",
            icon: "success"
          });
           }
           refetch()
          })
        }
      });

    }
    return (
        <div>
           <div className="flex justify-evenly mt-10 mb-5 font-bold">
           <h2 className="text-2xl">Total Items {cart.length}</h2>
            <h2 className="text-2xl">Total Price ${totalPrice}</h2>
            <button className="btn btn-primary">Pay</button>
           </div>

           <div className="overflow-x-auto">
            <hr />
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     {
        cart.map(item => <tr key={item}>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-16 h-12">
                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </div>
            </td>
            <td>
              <p>{item.name}</p>
              <br/>
            </td>
            <td>${item.price}</td>
            <th>
              <button onClick={()=>handleItemDelete(item._id)} className="btn text-lg text-red-600">
                <FaTrashAlt></FaTrashAlt>
              </button>
            </th>
          </tr>)
     }
      
    </tbody>
    
    
  </table>
</div>
        </div>
    );
};

export default Cart;