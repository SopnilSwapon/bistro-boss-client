import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
   const {user} = useAuth();
   const axiosSecure = useAxiosSecure();
   const {isLoading, isError, error, data:cart=[]} = useQuery({
   queryKey: ['cart'],
   queryFn: async () =>{
    const res = await axiosSecure.get('/carts')
    return res.data
   }
   })
   return {isLoading, isError, error, cart}
};

export default useCart;