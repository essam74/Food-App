// import React from 'react'
import axios from "axios";
import logo from "../../../../assets/images/logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function ResetPass() {
  const navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      console.log(response);
      toast.success(" successful");
      navigate("/login");
      
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === newPassword);

  };


  return (
    <>
      <ToastContainer />
      <div className="auth-container">
        <div className="container-fluid vh-100 bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6 bg-white p-4 border border-3">
              <div className="text-center">
                <img src={logo} alt="" className="w-50" />
              </div>
              <div className="form-content">
                <h3>Reset Password?</h3>
                <p className="mb-5">
                  Please Enter Your OTP or Check Your Inbox
                </p>

                <form onSubmit={handleSubmit(submitForm)}>
                  {/* email */}
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

                  {/* OTP  */}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="OTP"
                      {...register("OTP", {
                        required: "OTP is required",
                      })}
                    />
                  </div>
                  {errors.OTP && (
                    <p className="alert alert-danger">{errors.OTP.message}</p>
                  )}

                  {/* new password */}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      className="form-control"
                      placeholder="New Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />

                    {/* <i
                      style={{ cursor: "pointer" }}
                      onClick={x}
                      className="fa-solid fa-eye my-auto mx-2 border border-1 p-2"
                    >
                      {newPassword}
                    </i> */}
                  </div>
                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )}

                  {/* confirm new password  */}
                  <div className="input-group mb-3"> 
                     <span className="input-group-text" id="basic-addon1">
                      <i className="fa fa-key"></i>
                    </span>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      className="form-control"
                      placeholder="Confirm New Password"
                      {...register("password", {
                        required: " Password is required",
                      })}
                    /> 

                    {/* <i
                      style={{ cursor: "pointer" }}
                      onClick={x}
                      className="fa-solid fa-eye my-auto mx-2 border border-1 p-2"
                    >
                      {showPassword}
                    </i>  */}
                   </div> 
                  {errors.password && (
                    <p className="alert alert-danger">
                      {errors.password.message}
                    </p>
                  )} 
        {!passwordMatch && <span style={{ color: 'red' }}>Passwords do not match</span>}

                  <button className="btn btn-success w-100 my-5">
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
