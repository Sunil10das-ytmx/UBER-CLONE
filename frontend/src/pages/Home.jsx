import React, { useEffect } from "react";
import HeroImage from "../assets/UberFrontHeroImg.jpg";
import Uberlogo from '../assets/Uber-logo.png'
import { MoveRight } from 'lucide-react'
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <>
      <div>
        <div className="w-full h-screen relative">
          <img
            src={HeroImage}
            alt="CarImg"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />

          <div className="absolute inset-0 flex flex-col justify-between items-center py-12">
          <img src={Uberlogo} className="w-56" />

            <div className="text-center">
              <h2 className="text-white text-3xl font-bold text-outline">
                Get Started With Uber
              </h2>

              <Link to='/login' className="mt-6 border-2 text-white bg-black px-6 py-3 rounded-lg font-extrabold active:bg-white active:text-black hover:bg-blue-500 inline-flex items-center justify-between w-56">
                <span>CONTINUE</span>
                <MoveRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
