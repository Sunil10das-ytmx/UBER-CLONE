import React, { useEffect, useState, useContext } from 'react'
import { CaptainDataContext } from "../context/CaptianContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
            setIsLoading(false)
            return
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data)
                setIsLoading(false)
            }
        }).catch((error) => {
            console.error('Error fetching captain profile:', error)
            localStorage.removeItem('token')
            navigate('/captain-login')
            setIsLoading(false)
        })
    }, [token, navigate])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper
