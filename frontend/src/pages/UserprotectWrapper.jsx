import React, { useEffect } from 'react'
import {UserDataContext} from "../context/UserContext";
import { useContext } from "react";
import {useNavigate } from "react-router-dom";



const UserprotectWrapper = ({children}) => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { user, setUser } = useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    // console.log(token)
    useEffect(()=>{
        if(!token){
            navigate('/login')
            setIsLoading(false)
            return

            axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setUser(response.data.user)
                setIsLoading(false)
            }
        }).catch((error) => {
            console.error('Error fetching user profile:', error)
            localStorage.removeItem('token')
            navigate('/login')
            setIsLoading(false)
        })
        }
    },[token, navigate])
  return (
    <>
      {children}
    </>
  )
}

export default UserprotectWrapper
