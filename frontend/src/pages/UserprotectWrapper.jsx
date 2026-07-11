import React, { useEffect } from 'react'
import {UserDataContext} from "../context/UserContext";
import { useContext } from "react";
import {useNavigate } from "react-router-dom";



const UserprotectWrapper = ({children}) => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    // console.log(token)
    useEffect(()=>{
        if(!token){
            navigate('/login')
        }
    },[token])
  return (
    <>
      {children}
    </>
  )
}

export default UserprotectWrapper
