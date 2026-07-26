import React from "react";
import { Link } from "react-router-dom"; // TEMPORARY: Using location state for navigate routing
import UberMap from "../assets/Uber-map.gif";
import UberLogo from '../assets/Uber-logo.png'
import CaptainDetails from "../Component/CaptainDetails";

const CaptainHome = () => {
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

        <div className="h-2/5 p-6 bg-white rounded-tr-lg rounded-tl-lg"> 
          <CaptainDetails/>
        </div>
      </div>
    </>
  );
};

export default CaptainHome;
