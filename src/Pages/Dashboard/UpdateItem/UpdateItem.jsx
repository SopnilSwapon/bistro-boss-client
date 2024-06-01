import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTiltle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const vite_img_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const vite_img_hosting_api = `https://api.imgbb.com/1/upload?key=${vite_img_hosting_key}`
const UpdateItem = () => {
    const {name, price, category, recipe, _id} = useLoaderData();
    const { register, handleSubmit , reset} = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = {image: data.image[0]};
        const res = await axiosPublic.post(vite_img_hosting_api, imageFile , {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data);
        const menuItem = {name: data.name, image: res.data.display_url, price: data.price, category: data.category, recipe: data.recipe}
        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
        console.log(menuRes.data);
        if(menuRes.data.modifiedCount){
            reset();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} has been updated`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    }
    return (
        <div>
            <SectionTitle subHeading='---be update---' heading='update an item'></SectionTitle>
            <div>
            <div className="">
                <form onSubmit={handleSubmit(onSubmit)} className="ml-5">
                    <label>Recipe Name</label>
                    <br />
                    <input defaultValue={name} {...register("name", {required: true})} className="input input-bordered w-[95%]" placeholder="Type Recipe Name" />
                    <br />
                    <div className="w-[95%] my-6 flex gap-6">
                        <div className="w-full">
                            <label defaultValue={category}>Select a Category</label>
                            <br />
                            <select className="w-full select select-bordered mx-auto" {...register("category", {required:true})}>
                                <option value="salad">salad</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                                <option value="desserts">desserts</option>
                                <option value="drinks">drinks</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label>Price</label>
                            <input defaultValue={price} {...register("price", {required: true})} className="input input-bordered w-full" placeholder="Type Price" />
                        </div>
                    </div>
                    <label className="form-control w-[95%]">
                        <div className="label">
                            <span className="label-text">Recipe Details</span>
                        </div>
                        <textarea defaultValue={recipe} {...register ('recipe', {required: true})} className="textarea textarea-bordered h-24" placeholder="Type details"></textarea>
                    </label>
                    <input {...register ('image' , {required: true})} type="file" className="file-input w-full my-6" />
                    <button className="btn bg-black text-white">Update Item</button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default UpdateItem;