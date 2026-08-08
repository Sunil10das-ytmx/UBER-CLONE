import React, { useState, useRef, useEffect,useContext } from "react";
import { Link } from "react-router-dom"; // TEMPORARY: Using location state for navigate routing
import UberMap from "../assets/Uber-map.gif";
import LiveTracking from "../Component/LiveTracking";
import UberLogo from '../assets/Uber-logo.png'
import CaptainDetails from "../Component/CaptainDetails";
import RidePopUp from "../Component/RidePopUp";
import ConfirmedRidePopUp from "../Component/ConfirmedRidePopUp";
import {SocketContext} from '../context/SocketContext'
import {CaptainDataContext} from '../context/CaptianContext'

const CaptainHome = (props) => {
  const RidePopUpRef = useRef(null)
  const ConfirmedRidePopUpRef = useRef(null)

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [ConfirmedRidePopUpPanel, setConfirmedRidePopUpPanel] = useState(false)
  const [ride,setRide]= useState(null)

  const ridePanelClasses = `fixed bottom-0 left-0 right-0 z-20 flex flex-col gap-3 bg-white border-2 border-black rounded-tr-3xl rounded-tl-3xl p-3 transition-transform duration-300 ${ridePopUpPanel ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`;
  const confirmedPanelClasses = `fixed bottom-0 left-0 right-0 z-30 w-full h-screen flex flex-col gap-3 bg-white border-2 border-black p-3 transition-transform duration-300 ${ConfirmedRidePopUpPanel ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`;

  const {socket} = useContext(SocketContext)
  const {captain} = useContext(CaptainDataContext)


  useEffect(() => {
    if (!captain?._id) return;

    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval);
  }, [captain]);

  useEffect(() => {
    const handleNewRide = (data) => {
      setRide(data);
      setRidePopUpPanel(true);
    };

    socket.on('new-ride', handleNewRide);

    return () => {
      socket.off('new-ride', handleNewRide);
    };
  }, [socket]);
  

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

        <div className="h-[68%] relative overflow-hidden">
          <LiveTracking height="100%" showInfoCard={false} />
        </div>

        <div className="h-2/5 p-6 bg-white rounded-t-3xl relative -mt-6 z-10">
          <CaptainDetails />
        </div>

        <div ref={RidePopUpRef} className={ridePanelClasses}>
          <RidePopUp 
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel} setConfirmedRidePopUpPanel={setConfirmedRidePopUpPanel} />
        </div>

        <div ref={ConfirmedRidePopUpRef} className={confirmedPanelClasses}>
          <ConfirmedRidePopUp ride={ride} setConfirmedRidePopUpPanel={setConfirmedRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
        </div>

      </div>
    </>
  );
}
export default CaptainHome;
