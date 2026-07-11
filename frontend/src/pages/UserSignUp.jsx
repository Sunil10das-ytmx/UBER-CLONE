import React, { useState } from "react";
import UberTrafficLight from "../assets/Uber-traffic-light.jpg";
import { MoveLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {UserDataContext} from "../context/UserContext";
import { useContext } from "react";

const UserSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [userData, setUserData] = useState({});

  const navigate = useNavigate()

  const {user,setUser} = React.useContext(UserDataContext)
  useContext

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token)
      navigate('/login');
    }
  } catch (err) {
    console.error('Signup error', err?.response || err);
  
  }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };
  return (
    <>
      <div className="w-full min-h-screen relative flex items-center justify-center py-6">
        <img
          src={UberTrafficLight}
          alt="RiderImg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <Link to="/login" className="absolute top-4 left-4 z-20">
          <MoveLeft size={42} color="#110e0e" />
        </Link>

        <div className="z-20 w-full max-w-md px-6 bg-black/50 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
          <div className="mb-6">
            <h1 className="text-white text-5xl font-extrabold leading-tight">
              REGISTER!!!
            </h1>
          </div>

          <div className="z-20 w-full max-w-md px-6">
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <h3 className="text-lg font-medium mb-2">What's your name</h3>
              <div className="flex gap-4 mb-7">
                <input
                  required
                  className=" w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  required
                  className=" w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <h3 className="text-lg font-medium mb-2">What's your email</h3>
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className=" mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                type="email"
                placeholder="email@example.com"
              />

              <h3 className="text-lg font-medium mb-2">Enter Password</h3>
              <input
                className=" mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                type="password"
                placeholder="password"
              />

              <button className="bg-black text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg">
                Create account
              </button>

              <p className="text-center">
                Already have a account?{" "}
                <Link to="/login" className="text-blue-600">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="absolute bottom-3 w-full text-center z-20 px-6">
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
