// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () =>{
    const axiosPublic = useAxiosPublic();
    const {data:menu=[], isPending, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async () =>{
         const res = await axiosPublic.get('/menu');
         return res.data
        }
    })
    return {menu,isPending,refetch }
    // const [loading, setLoading] = useState(true)
    // const [menu, setMenu] = useState([]);
    // useEffect(()=>{
    //     fetch('http://localhost:5000/menu')
    //     .then(res => res.json())
    //     .then(data =>{
    //        setMenu(data)
    //        setLoading(false)
    //     })
    // },[]);
    // return [menu, loading]

}
export default useMenu;