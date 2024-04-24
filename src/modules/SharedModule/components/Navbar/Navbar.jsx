// import React from 'react'

import { useNavigate } from "react-router-dom"

export default function Navbar({loginData}) {

  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }
  
  return (
    <div>
      <button onClick={logout} className="btn btn-danger">Logout</button>
    </div>
  )
}
