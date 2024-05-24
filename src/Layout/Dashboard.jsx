import { FaAd, FaCalendar, FaHome, FaList, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-700 text-white font-bold">
                <ul className="menu p-4">
                    <li><NavLink to='/dashboard/userHome'><FaHome></FaHome> User Home</NavLink></li>
                    <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar> Reservation</NavLink></li>
                    <li><NavLink to='/dashboard/cart'><FaShoppingCart></FaShoppingCart>My Cart</NavLink></li>
                    <li><NavLink to='/dashboard/review'><FaAd></FaAd> Add a review</NavLink></li>
                    <li><NavLink to='/dashboard/review'><FaList></FaList> My bookings</NavLink></li>
                    <div className="divider"></div> 
                    <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to='/menu'><FaHome></FaHome>Our menu</NavLink></li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;