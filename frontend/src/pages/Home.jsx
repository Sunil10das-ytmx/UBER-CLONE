import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import UberLogo from "../assets/Uber-logo.png";
import ubermap from "../assets/uber-map.gif";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import LocationSearchPanel from "../Component/LocationSearchPanel";
import VehiclePanel from "../Component/VehiclePanel";
import ConfirmedRide from "../Component/ConfirmedRide";
import LookingforDriver from "../Component/LookingforDriver";
import UberCar from "../assets/UberCar.png";
import UberBike from "../assets/UberBike.webp";
import UberAuto from "../assets/UberAuto.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import WaitingforDriver from "../Component/WaitingforDriver";
import Riding from "./Riding";

const Home = (props) => {
  const ubervehicle = [
    {
      id: 1,
      src: UberCar,
    },
    {
      id: 2,
      src: UberBike,
    },
    {
      id: 3,
      src: UberAuto,
    },
  ];

  const panelRef = useRef(null);
  const panelCloeRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const ridingRef = useRef(null);
  const inputRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const [ConfirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [selectedVehicle, setSelectedVehicleState] = useState(null);
  const [selectedAddress, setSelectedAddressState] = useState(null);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});

  const findTrip = async (pickupVal, destVal) => {
    setvehiclePanelOpen(true);
    setpanelOpen(false);

    const getStr = (val) => {
      if (!val) return "";
      if (typeof val === "object") return val.place || val.fullAddress || "";
      return String(val);
    };

    const pStr = getStr(pickupVal !== undefined ? pickupVal : pickup);
    const dStr = getStr(destVal !== undefined ? destVal : destination);

    if (pStr.trim().length >= 3 && dStr.trim().length >= 3) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
          {
            params: { pickup: pStr.trim(), destination: dStr.trim() },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFare(response.data);
      } catch (error) {
        console.error("Error fetching fare:", error?.response?.data || error.message);
      }
    }
  };

  useEffect(() => {
    if (vehiclePanelOpen && pickup.trim().length >= 3 && destination.trim().length >= 3) {
      findTrip(pickup, destination);
    }
  }, [vehiclePanelOpen]);

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField("pickup");
    setpanelOpen(true);

    if (value.trim().length >= 3) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField("destination");
    setpanelOpen(true);

    if (value.trim().length >= 3) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
          {
            params: { input: value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const setSelectedAddress = (addr) => {
    setSelectedAddressState(addr);
    props.setSelectedAddress?.(addr);
  };

  const setSelectedVehicle = (veh) => {
    setSelectedVehicleState(veh);
    props.setSelectedVehicle?.(veh);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setPickup("");
    setDestination("");
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(panelCloeRef.current, {
          opacity: "1",
        });
        gsap.to(inputRef.current, {
          borderTopLeftRadius: "0rem",
          borderTopRightRadius: "0",
          borderColor: "transparent",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(panelCloeRef.current, {
          opacity: "0",
        });
        gsap.to(inputRef.current, {
          borderTopLeftRadius: "1.5rem",
          borderTopRightRadius: "1.5rem",
          borderColor: "#000000",
        });
      }
    },
    [panelOpen],
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translate(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translate(100%)",
        });
      }
    },
    [vehiclePanelOpen],
  );

  useGSAP(
    function () {
      if (ConfirmedRidePanel) {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translate(0)",
        });
      } else {
        gsap.to(confirmedRidePanelRef.current, {
          transform: "translate(100%)",
        });
      }
    },
    [ConfirmedRidePanel],
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translate(0)",
        });
        gsap.to(confirmedRidePanelRef.current, {
          height: "0%",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translate(100%)",
        });
        gsap.to(confirmedRidePanelRef.current, {
          height: "67%",
        });
      }
    },
    [vehicleFound],
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver],
  );

  useEffect(() => {
    if (vehicleFound) {
      const timer = setTimeout(() => {
        setvehicleFound(false);
        setvehiclePanelOpen(false);
        setWaitingForDriver(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [vehicleFound]);

  return (
    <>
      <div className="h-screen relative overflow-hidden">
        <img
          className="w-35 absolute left-30 top-5 "
          src={UberLogo}
          alt="uber logo"
        />

        <div className="absolute top-28 left-1/2 -translate-x-1/2 text-center">
          <h4 className="text-sm font-semibold uppercase tracking-[0.55em] text-zinc-700">
            FOR YOU
          </h4>

          <h1 className="mt-2 text-[38px] font-black leading-none whitespace-nowrap">
            ALWAYS MOVING
          </h1>
        </div>

        <div className=" flex flex-col justify-end absolute h-screen  top-0  w-full">
          <div
            ref={inputRef}
            className="h-[33%] p-6 bg-white relative rounded-tr-3xl rounded-tl-3xl border-2 border-black "
          >
            <h5
              ref={panelCloeRef}
              onClick={() => {
                setpanelOpen(false);
              }}
              className="absolute top-6 opacity-0 right-6 text-2xl"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>

            <h4 className="text-3xl font-semibold absolute top-5 left-29 ">
              Find a trip
            </h4>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              className="mt-7"
            >
              <div className="line mt-3 absolute h-16 w-1 bottom-[25%] -translate-y-1/2 left-9 bg-gray-700 rounded-full"></div>
              <input
                onClick={() => {
                  setpanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChange}
                className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4 mb-4"
                type="text"
                placeholder="Add a pick up location"
              />

              <input
                onClick={() => {
                  setpanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full "
                type="text"
                placeholder="Enetr your destination"
              />
            </form>
            <button
              onClick={() => {
                  findTrip()
              }}
              className="bg-black text-white px-12 py-2 text-base rounded-lg w-full mt-4 mb-4"
            >
              Find Trip
            </button>
          </div>

          <div ref={panelRef} className=" bg-gray-200  h-0">
            <LocationSearchPanel
              suggestions={suggestions}
              setpanelOpen={setpanelOpen}
              setvehiclePanelOpen={setvehiclePanelOpen}
              setSelectedAddress={setSelectedAddress}
              pickup={pickup}
              setPickup={setPickup}
              destination={destination}
              setDestination={setDestination}
              activeField={activeField}
              findTrip={findTrip}
            />
          </div>
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed bottom-0 left-0 right-0 z-10 flex flex-col translate-x-full gap-3 bg-white border-2 border-black rounded-tr-3xl rounded-tl-3xl p-3"
        >
          <VehiclePanel
            fare={fare}
            setvehiclePanelOpen={setvehiclePanelOpen}
            setConfirmedRidePanel={setConfirmedRidePanel}
            setSelectedVehicle={setSelectedVehicle}
          />
        </div>

        <div
          ref={confirmedRidePanelRef}
          className="fixed bottom-0 left-0 right-0 z-10 flex flex-col translate-x-full gap-3 bg-white border-2 border-black rounded-tr-3xl rounded-tl-3xl p-3"
        >
          <ConfirmedRide
            fare={fare}
            setvehicleFound={setvehicleFound}
            selectedVehicle={selectedVehicle}
            setConfirmedRidePanel={setConfirmedRidePanel}
            address={selectedAddress}
          />
        </div>

        <div
          ref={vehicleFoundRef}
          className="fixed bottom-0 left-0 right-0 z-10 flex flex-col translate-x-full gap-3 bg-white border-2 border-black rounded-tr-3xl rounded-tl-3xl p-3"
        >
          <LookingforDriver
            fare={fare}
            address={selectedAddress}
            selectedVehicle={selectedVehicle}
            setvehicleFound={setvehicleFound}
          />
        </div>

        <div
          ref={waitingForDriverRef}
          className="fixed bottom-0 left-0 right-0 z-10 flex flex-col translate-y-full gap-3 bg-white border-2 border-black rounded-tr-3xl rounded-tl-3xl p-3"
        >
          <WaitingforDriver
            fare={fare}
            selectedVehicle={selectedVehicle}
            address={selectedAddress}
            setWaitingForDriver={setWaitingForDriver}
          />
        </div>

        <div
          ref={ridingRef}
          className="fixed bottom-0 left-0 right-0 z-10 flex flex-col translate-x-full gap-3 bg-white border-2 border-black rounded-tr-3xl rounded-tl-3xl p-3"
        >
          <Riding
            fare={fare}
            selectedVehicle={selectedVehicle}
            address={selectedAddress}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
