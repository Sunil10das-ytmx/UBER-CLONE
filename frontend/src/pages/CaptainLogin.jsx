import React, { useEffect } from "react";
import UberRider from "../assets/UberRider.jpg";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [riderData, setRiderdata] = useState({});

  const Submitfrom = (e) => {
    e.preventDefault();

    setEmail("");
    setPassword("");

    setRiderdata({
      email: email,
      password: password,
    });
    console.log(userData);
  };

  return (
    <>
      <div className="w-full h-screen relative">
        <img
          src={UberRider}
          alt="RiderImg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <Link to="/" className="absolute top-4 left-4">
          <MoveLeft size={42} color="#110e0e" />
        </Link>

        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-center z-20">
          <h1 className="text-black text-6xl font-extrabold text-outline leading-tight">
            Welcome back!
          </h1>
          <h3 className="text-gray-800 font-semibold text-xl mt-3">
            Ready for your next ride?
          </h3>
        </div>

        <div className="absolute top-65 left-1/2 transform -translate-x-1/2 w-full max-w-md z-20  p-6 ">
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
            <Link className="text-blue-600" to="/captain-singup">
              Register as a Rider
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
};

export default CaptainLogin;
