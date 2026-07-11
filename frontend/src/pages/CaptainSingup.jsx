import React, { useState } from "react";
import UberRider from "../assets/UberRider.jpg";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptianContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainSingup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [riderData, setRiderdata] = useState({});
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const CaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        vehicleType: vehicleType,
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        CaptainData,
      );

      if (response.status === 201 || response.status === 200) {
        // APIs often return 201 for successful creation
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");

        // // Reset fields only on success to allow users to fix errors
        // setEmail("");
        // setFirstName("");
        // setLastName("");
        // setPassword("");
        // setVehicleType("");
        // setVehicleColor("");
        // setVehiclePlate("");
        // setVehicleCapacity("");
      }
    } catch (err) {
      console.error("Signup error", err?.response || err);
    }

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setVehicleType("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
  };
  return (
    <>
      <div className="w-full h-screen relative flex items-center justify-center">
        <img
          src={UberRider}
          alt="RiderImg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <Link to="/captain-login" className="absolute top-4 left-4 z-20">
          <MoveLeft size={42} color="#110e0e" />
        </Link>

        <div className="z-20 w-full max-w-md px-6 bg-black/50 rounded-3xl p-5 shadow-2xl backdrop-blur-sm max-h-[90vh] overflow-y-auto">
          <div className="mb-4">
            <h1 className="text-white text-3xl font-extrabold leading-tight">
              REGISTER!!!
            </h1>
          </div>

          <div className="z-20 w-full">
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
            >
              <h3 className="text-sm font-medium mb-2">What's your name</h3>
              <div className="flex gap-4 mb-4">
                <input
                  required
                  className="w-1/2 rounded-lg px-3.5 py-2 border text-sm placeholder:text-xs"
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  required
                  className="w-1/2 rounded-lg px-3.5 py-2 border text-sm placeholder:text-xs"
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

              <h3 className="text-sm font-medium mb-2">What's your email</h3>
              <input
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="mb-4 rounded-lg px-3.5 py-2 border w-full text-sm placeholder:text-xs"
                type="email"
                placeholder="email@example.com"
              />

              <h3 className="text-sm font-medium mb-2">Enter Password</h3>
              <input
                className="mb-4 rounded-lg px-3.5 py-2 border w-full text-sm placeholder:text-xs"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                type="password"
                placeholder="password"
              />

              <h3 className="text-sm font-medium mb-3">Vehicle Information</h3>

              <div className="flex gap-3 mb-4">
                <div className="w-1/2">
                  <h4 className="text-xs font-medium mb-1.5">Vehicle Type</h4>
                  <select
                    required
                    value={vehicleType}
                    onChange={(e) => {
                      setVehicleType(e.target.value);
                    }}
                    className="rounded-lg px-3 py-2 border w-full text-xs"
                  >
                    <option value="">Select Type</option>
                    <option value="car">Car</option>
                    <option value="auto">Auto</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>

                <div className="w-1/2">
                  <h4 className="text-xs font-medium mb-1.5">Vehicle Color</h4>
                  <input
                    required
                    className="rounded-lg px-3 py-2 border w-full text-xs placeholder:text-xs"
                    type="text"
                    placeholder="Red, Blue..."
                    value={vehicleColor}
                    onChange={(e) => {
                      setVehicleColor(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3 mb-4">
                <div className="w-1/2">
                  <h4 className="text-xs font-medium mb-1.5">Plate Number</h4>
                  <input
                    required
                    className="rounded-lg px-3 py-2 border w-full text-xs placeholder:text-xs"
                    type="text"
                    placeholder="AB12CD1234"
                    value={vehiclePlate}
                    onChange={(e) => {
                      setVehiclePlate(e.target.value);
                    }}
                  />
                </div>

                <div className="w-1/2">
                  <h4 className="text-xs font-medium mb-1.5">Capacity</h4>
                  <input
                    required
                    className="rounded-lg px-3 py-2 border w-full text-xs placeholder:text-xs"
                    type="number"
                    placeholder="e.g., 4"
                    value={vehicleCapacity}
                    onChange={(e) => {
                      setVehicleCapacity(e.target.value);
                    }}
                  />
                </div>
              </div>

              <button className="bg-black text-white font-semibold mb-3 rounded-lg px-3.5 py-2 w-full text-sm">
                Create account
              </button>

              <p className="text-center text-xs">
                Already have a account?{" "}
                <Link to="/captain-login" className="text-blue-600">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="absolute bottom-2 w-full text-center z-20 px-6">
          <p className="text-[8px] leading-tight text-white">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </>
  );
};

export default CaptainSingup;
