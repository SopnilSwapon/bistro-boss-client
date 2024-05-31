import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";

const AdminRoute = ({children}) => {
    const [isAdmin, isAdminPending] = useAdmin();
    const {user, loading} = useAuth();
    const location = useLocation()
    if(loading || isAdminPending){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children
    }
    return <Navigate to='/' state={location.pathname}></Navigate>
};


export default AdminRoute;