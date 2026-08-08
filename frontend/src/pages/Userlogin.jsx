import React, { useEffect } from "react";
import UberTrafficLight from "../assets/Uber-traffic-light.jpg";
import { MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {UserDataContext} from "../context/UserContext";
import { useContext } from "react";
import axios from 'axios'



const Userlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [userData, setUserdata] = useState({});

    const navigate = useNavigate()

    const {user,setUser} = React.useContext(UserDataContext)

  const Submitfrom = async (e) => {
    e.preventDefault();

    const userData={
      email: email,
      password: password,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
      if(response.status === 200){
        const data=response.data
        setUser(data.user)
        localStorage.setItem('token',data.token)
        navigate('/home')
      }
    } catch (err) {
      console.error('login error', err?.response || err);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="w-full h-screen relative">
        <img
          src={UberTrafficLight}
          alt="trafficLightImg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <Link to="/" className="absolute top-4 left-4">
          <MoveLeft size={42} color="#110e0e" />
        </Link>

        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-20">
          <h1 className="text-black text-6xl font-extrabold text-outline leading-tight">
            WELCOME
          </h1>
          <h3 className="text-gray-800 font-semibold text-xl mt-3">
            No Keys, No Maps, Just Taps
          </h3>
        </div>

        <div className="absolute top-44 left-1/2 transform -translate-x-1/2 w-full max-w-md z-20  p-6 ">
          <form onSubmit={Submitfrom} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email
              </label>
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                placeholder="Enter your email here"
                className="w-full px-4 py-2 rounded-md border border-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Password
              </label>
              <input
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Enter your password here"
                className="w-full px-4 py-2 rounded-md border border-gray-800 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-md font-semibold hover:opacity-90"
              >
                Sign In
              </button>
            </div>
          </form>
          <h3 className="flex font-semibold items-center justify-center align-middle">
            Don't have an account?
            <Link className="text-blue-600" to="/singup">
              Sign up.
            </Link>
          </h3>
        </div>
        <div className="flex justify-center items-center align-middle">
          <Link
            to="/captain-login"
            className="bg-blue-500 rounded-3xl p-3 w-3xs text-2xl font-semibold absolute bottom-4 flex justify-center items-center "
          >
            Sign in as Rider
          </Link>
        </div>
      </div>
    </>
  );
};

export default Userlogin;
