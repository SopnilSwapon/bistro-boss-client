import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const Login = () => {
     const location = useLocation();
     console.log(location);
     const navigate = useNavigate();
     const {loginUser, googleLogin} = useContext(AuthContext);
     const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) =>{
    loginUser(data.email, data.password)
    .then(result =>{
        console.log(result.user);
        Swal.fire({
          icon: "success",
          text: "sign In successful",
        });
        navigate(location.state ? location.state : '/')
    })
    .then(error =>{
      console.log(error)
  })
  }
  const handleGoogleLogin = () =>{
    googleLogin()
    .then(result =>{
      console.log(result.user)
    })
    .then(error =>{
      console.log(error);
    })
  }
    return (
                <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex">
    <div className="text-center lg:text-left mx-auto">
      <h1 className="text-5xl font-bold">Sign In!</h1>
    </div>
    <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email" , {required: true})} name="email" placeholder="email" className="input input-bordered" required />
          {errors.name && <span className="text-red-600">The name field is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password", { 
            required: true, 
            minLength: 6, 
            maxLength: 20,
            pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/
            
            
             } )} placeholder="password" className="input input-bordered" />
          {errors.password?.type === 'required' && <span className="text-red-700">You have filled up  password</span>}
          {errors.password?.type === 'maxLength' && <span className="text-red-700">Password should have max 20 characters</span>}
          {errors.password?.type === 'minLength' && <span className="text-red-700">Password should have at least 6 characters</span>}
          {errors.password?.type === 'pattern' && <span className="text-red-700">Password should have one uppercase one lowercase and one special character</span>}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <div className="flex justify-center mb-2 text-3xl">
      <FcGoogle onClick={handleGoogleLogin}></FcGoogle>
      </div>
      <small>Have an account? <Link to='/register' className="text-green-500">Register</Link></small>
    </div>
  </div>
</div>
    );
};

export default Login;