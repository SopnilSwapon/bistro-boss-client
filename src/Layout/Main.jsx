import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes('login') || location.pathname.includes('register')
    // console.log(location);
    return (
        <div className='max-w-6xl mx-auto'>
           {isLogin || <Navbar></Navbar>}
            <Outlet></Outlet>
            {isLogin || <Footer></Footer>}
        </div>
    );
};

export default Main;