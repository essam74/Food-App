// import React from 'react'
import logo from "../../../../assets/images/logo.png";
import notfound from "../../../../assets/images/Group 48101676.png";
import { useNavigate } from 'react-router-dom';


export default function Notfound() {

  const navigate = useNavigate()

  const handleSubmit = ()=>{
    navigate('/dashboard')

  }

  return (
    <div className="notFound vh-100 ">
      <div className="container-fluid ">
        <div className="w-25 pt-3">
            <img src={logo} alt="" className="w-100 " />
        </div>

        <div className="notfound-content ">
              <h2>Oops..</h2>
              <h3 className="text-success">Page not found</h3>
              <p>This Page doesn’t exist or was removed! <br /> We suggest you back to home.</p>
              
              <button className="btn btn-success w-75 py-0 my-4" onClick={handleSubmit}>
                      <div className="d-flex align-items-center justify-content-center py- ">
                        <i className="fa-solid fa-arrow-left "></i>
                        <p className="py-0 my-0 back">Back To <br /> Home</p>
                      </div>
              </button>

              
        </div>

        <div className="notfound-img ">
          <img src={notfound} alt="" className="w-100"/>
        </div>
      </div>
      
    </div>
  )
}
