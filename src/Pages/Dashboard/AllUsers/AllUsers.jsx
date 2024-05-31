import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosPublic = useAxiosSecure();
    const { data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users');
            return res.data
        }
    }
);
    const handleDeleteUser = user => {
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
             
              axiosPublic.delete(`/users/${user._id}`)
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
    };
    const handleMakeAdmin = (user) =>{
        axiosPublic(`/users/admin/${user._id}`,{
            method: 'PATCH'
        })
        .then(res =>{
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    title: `${user.name} is an admin now`,
                    text: "Make Admin Successful.",
                    icon: "success"
                  });
                  refetch()
            }
        })
    }
    return (
        <div className="mt-12">
            <div className="flex justify-evenly">
                <h2 className="text-3xl font-bold">All Users</h2>
                <h2 className="text-3xl font-bold">Total Users : {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <div  key={user._id}>
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                    {
                                        user.Role ==='admin' ? 'Admin' : 
                                        <>
                                        <button onClick={() => handleMakeAdmin(user)} className="text-lg bg-red-600 p-2 text-white rounded-md">
                                            <FaUsers></FaUsers>
                                        </button>
                                        </>
                                    }
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteUser(user)} className="text-lg text-red-600">
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>
                            </div>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;