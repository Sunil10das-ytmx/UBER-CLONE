import React, { useState, useRef, useEffect }  from "react";
import { Link } from "react-router-dom"; // TEMPORARY: Using location state for navigate routing
import UberMap from "../assets/Uber-map.gif";
import UberLogo from '../assets/Uber-logo.png'
import CaptainDetails from "../Component/CaptainDetails";
import RidePopUp from "../Component/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainHome = (props) => {
  const RidePopUpRef = useRef(null)

  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)

  useGSAP(function () {
      if (ridePopUpPanel) {
        gsap.to(RidePopUpRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(RidePopUpRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopUpPanel],
  );

  return (
    <>
      <div className="h-screen">
        <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
        <img 
        className="w-20"
        src={UberLogo} 
        alt="UberLogo"
        />
          <Link
          to="/captain-login"
          className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
        </div>

        <div className="h-[68%]">
          <img className="h-full w-full object-cover" src={UberMap} />
        </div>

        <div className="h-2/5 p-6 bg-white rounded-t-3xl relative -mt-6 z-10"> 
          <CaptainDetails/>
        </div>

        <div ref={RidePopUpRef} className="fixed bottom-0 left-0 right-0 z-10 flex flex-col translate-y-full  gap-3 bg-white border-2 border-black rounded-tr-3xl rounded-tl-3xl p-3">
            <RidePopUp  setRidePopUpPanel={setRidePopUpPanel} />
        </div>
          
      </div>
    </>
  );
};

export default CaptainHome;
