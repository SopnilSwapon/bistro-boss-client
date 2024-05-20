import { useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true)
    useEffect(()=>{
      loadCaptchaEnginge(6);
    },[])
    const handleLogin = e =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
    }
    const captchaValidation = () =>{
      const user_captcha_value = captchaRef.current.value;
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
            <h1 className="text-5xl font-bold text-center">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full  mx-auto max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
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
                <input type="text" ref={captchaRef} name="captcha" placeholder="type the above captcha" className="input input-bordered" required />
                
              <button onClick={captchaValidation} className="btn mt-2 bg-gray-600 text-white btn-xs btm-nav-label">Validate Captcha</button>
              </div>
              <div className="form-control mt-6">
                <button disabled={disabled} className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login;