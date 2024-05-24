import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useCart = () => {
   const axiosSecure = useAxiosSecure();
   const {user} = useAuth();
   const {isLoading, isError, error, refetch, data:cart=[]} = useQuery({
   queryKey: ['cart', user?.email],
   queryFn: async () =>{
    const res = await axiosSecure.get(`/carts?email=${user?.email}`)
    return res.data
   }
   })
   return {isLoading, isError, error, cart, refetch}
};

export default useCart;
