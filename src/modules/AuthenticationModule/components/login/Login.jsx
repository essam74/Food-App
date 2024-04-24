// import React from 'react'
import axios from "axios";
import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({saveLoginData}) {

  const navigate = useNavigate()

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      localStorage.setItem('token', response.data.token)
      saveLoginData()

      toast.success("login successfully");
      navigate('/dashboard')

      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const forgotPass = ()=>{
    navigate('/forgetpass')
  }

  return (
    <>
    <ToastContainer/>
      <div className="auth-container">
        <div className="container-fluid vh-100 bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6 bg-white p-4 border border-3">
              <div className="text-center">
                <img src={logo} alt="" className="w-50" />
              </div>
              <div className="form-content">
                <h3>Log In</h3>
                <p>Welcome Back! Please enter your details</p>

                <form onSubmit={handleSubmit(submitForm)}>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-envelope"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your E-mail"
                      {...register("email", {
                        required: "E-mail is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid mail",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="alert alert-danger">{errors.email.message}</p>
                  )}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}

                  <div className="links d-flex justify-content-between my-3">
                    <a>Register Now?</a>
                    <a className="text-success" onClick={forgotPass}>Forgot Password?</a>
                  </div>

                  <button className="btn btn-success w-100">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
