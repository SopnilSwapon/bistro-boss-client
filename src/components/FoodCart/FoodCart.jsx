import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const FoodCart = ({item}) => {
    const {name,image, price, recipe, _id} = item;
    const {user} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const handleAddToCart = () =>{
      if(user && user?.email){
        // console.log("bangladesh" , food);
        const cartItem = {
          menuId: _id,
          name,
          image,
          price,
          email: user?.email
        }
       
        axiosSecure.post('/carts', cartItem)
        .then(res =>{
          console.log(res.data);
          if(res.data.insertedId){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} added to the cart`,
              showConfirmButton: false,
              timer: 1500
            });
          }
        })

      }
    else{
      Swal.fire({
        title: "You are'nt logged In",
        text: "Please login to add cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes,log In"
      }).then((result) => {
        if (result.isConfirmed) {
           navigate('/login', {state: location.pathname})
        }
      });
    }
    }
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" /></figure>
  <p className="bg-black text-white absolute right-2 mt-3 p-1 rounded-sm font-bold">${price}</p>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{recipe}</p>
    <div className="card-actions justify-end">
      <button onClick={()=> handleAddToCart()} className="btn btn-outline bottom-0 border-b-4 border-orange-600 bg-slate-300">ADD CART</button>
    </div>
  </div>
</div>
    );
};

export default FoodCart;