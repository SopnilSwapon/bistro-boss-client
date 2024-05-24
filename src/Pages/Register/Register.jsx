

import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
  const [disabled, setDisabled] = useState(true);
  const {crateAccount} = useContext(AuthContext)
  const location = useLocation();
     console.log(location);
     const navigate = useNavigate();
    useEffect(()=>{
      loadCaptchaEnginge(6);
    },[])
    const handleRegister = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        crateAccount(email, password)
        .then(result =>{
          console.log(result.user);
          Swal.fire({
            icon: "success",
            text: "Register in successful",
          });
          navigate(location.state ? location.state : '/')
        })
        .then(error =>{
          console.log(error);
        })
        
    }
    const captchaValidation = (e) =>{
      e.preventDefault()
      const user_captcha_value = e.target.value;
      if(validateCaptcha(user_captcha_value)){
            setDisabled(false)
      }
      else{
           setDisabled(true)
      }
      // console.log(value);



    }

    return (
      <div className="md:w-1/2 mx-auto">
        <div className="">
          <div className="text-center lg:text-left mt-20">
            <h1 className="text-5xl font-bold text-center">Please Register!</h1>
          </div>
          <div className="card shrink-0 w-full  mx-auto max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input onBlur={captchaValidation} type="text" name="captcha" placeholder="type the above captcha" className="input input-bordered" required />
                              </div>
              <div className="form-control mt-6">
                <button disabled={disabled} className="btn btn-primary">Register</button>
              </div>
            </form>
            <small>New here? <Link to='/login' className='text-orange-500'>Login</Link></small>
          </div>
        </div>
      </div>

    );
};

export default Register;