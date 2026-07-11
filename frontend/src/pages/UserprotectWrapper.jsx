import React from 'react'
import {UserDataContext} from "../context/UserContext";
import { useContext } from "react";
import {useNavigate } from "react-router-dom";



const UserprotectWrapper = ({children}) => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    // console.log(token)
    if(!token){
        navigate('/login')
    }
  return (
    <>
      {children}
    </>
  )
}

export default UserprotectWrapper
