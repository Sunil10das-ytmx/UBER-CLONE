import React, { useState, useRef, useEffect } from "react";
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

const Home = () => {
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
  const inputRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const [pickup, setPickup] = useState("");
  const [panelOpen, setpanelOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const [ConfirmedRidePanel, setConfirmedRidePanel] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [vehicleFound, setvehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

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


        {/* <div className="absolute left-0 right-0 top-42.5 z-20">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop
            centeredSlides
            slidesPerView={1}
            spaceBetween={20}
            className="w-full h-55"
          >
            {ubervehicle.map((vehicle) => {
              const bgColor =
                vehicle.id === 1
                  ? "bg-sky-100"
                  : vehicle.id === 2
                    ? "bg-orange-100"
                    : "bg-yellow-100";

              return (
                <SwiperSlide
                  key={vehicle.id}
                  className="flex! justify-center items-center h-55"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`w-44 h-44 rounded-full ${bgColor} shadow-lg flex items-center justify-center`}
                  >
                    <img
                      src={vehicle.src}
                      alt=""
                      className="w-32 h-32 object-contain select-none"
                      draggable={false}
                    />
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div> */}

        <div className=" flex flex-col justify-end absolute h-screen  top-0  w-full">
          <div
            ref={inputRef}
            className="h-[30%] p-6 bg-white relative rounded-tr-3xl rounded-tl-3xl border-2 border-black "
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

            <h4 className="text-3xl font-semibold absolute top-2 left-29 ">
              Find a trip
            </h4>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              className="mt-7"
            >
              <div className="line mt-3 absolute h-16 w-1 bottom-[17%] -translate-y-1/2 left-9 bg-gray-700 rounded-full"></div>
              <input
                onClick={() => {
                  setpanelOpen(true);
                }}
                value={pickup}
                onChange={(e) => {
                  setPickup(e.target.value);
                }}
                className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-4 mb-4"
                type="text"
                placeholder="Add a pick up location"
              />

              <input
                onClick={() => {
                  setpanelOpen(true);
                }}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
                className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full "
                type="text"
                placeholder="Enetr your destination"
              />
            </form>
          </div>

          <div ref={panelRef} className=" bg-gray-200  h-0">
            <LocationSearchPanel
              setpanelOpen={setpanelOpen}
              setvehiclePanelOpen={setvehiclePanelOpen}
              setSelectedAddress={setSelectedAddress}
            />
          </div>
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed bottom-0 left-0 right-0 z-10 flex flex-col translate-x-full gap-3 bg-white border-2 border-black rounded-tr-3xl rounded-tl-3xl p-3"
        >
          <VehiclePanel
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
            selectedVehicle={selectedVehicle}
            address={selectedAddress}
            setWaitingForDriver={setWaitingForDriver}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
