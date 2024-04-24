// import React from 'react'
import axios from "axios";
import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ForgetPass() {

  const navigate = useNavigate()

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {

    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );

      toast.success(" successful");
      navigate('/resetpass')

      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

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
                <h3>Forgot Your Password?</h3>
                <p className="mb-5">No worries! Please enter your email and we will send a password reset link</p>

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

                  <button className="btn btn-success w-100 my-5">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
