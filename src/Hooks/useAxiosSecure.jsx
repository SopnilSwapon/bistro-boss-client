import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000/'
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {userSignOut} = useAuth();
    // request interceptors to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('stopped by request', token);
        config.headers.authorization = `Bearer ${token}`;
        return config
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
    //   interceptors status 401 and 403 
    axiosSecure.interceptors.response.use(function(response){
        return response
    }, (error) =>{
        const status = error.response.status
        //for 401 and 403 logOut the user and move the user to the login page
        if(status === 401 || status === 403){
            userSignOut()
            navigate('/login')
        }
        return Promise.reject(error);

    })
   return axiosSecure
};

export default useAxiosSecure;