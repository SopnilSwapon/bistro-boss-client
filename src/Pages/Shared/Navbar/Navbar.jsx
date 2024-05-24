import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const {cart, isLoading, isError, error} = useCart();
  const handleSignOut = () => {
    userSignOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "sign out successful",
        });
      })
      .then(error => {
        console.log(error.message);
      })
  }
  const navlinks = <>
    <li><NavLink to='/'>HOME</NavLink></li>
    <li><NavLink to='/menu'>OUR MENU</NavLink></li>
    <li><NavLink to='/order/salad'>ORDER</NavLink></li>
    <li><NavLink to='/dashboard/cart'>
      <button className="flex items-center gap-2">
        <FaShoppingCart className="text-xl"></FaShoppingCart>
        <div className="badge badge-secondary">+{cart.length}</div>
      </button>
    </NavLink></li>

    {
      user ?
        <>
          <li onClick={handleSignOut}><Link>Sign Out</Link></li>
        </>
        :
        <>
          <li><NavLink to='/login'>Login</NavLink></li>
        </>
    }
  </>
  if(isLoading){
    return <p>loading.............</p>
  }
  if(isError){
    return <p>{error}</p>
  }
  return (
    <div className="navbar max-w-6xl bg-black font-extrabold fixed z-10 opacity-70 text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navlinks}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Bistro Boss</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navlinks}
        </ul>
      </div>
      <div className="navbar-end">
        {user && <a className="btn">Profile</a>}
      </div>
    </div>
  );
};

export default Navbar;