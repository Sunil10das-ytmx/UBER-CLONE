import React,{useState,useRef,useEffect,useContext} from 'react'
import UberLogo from '../assets/Uber-logo.png'
import UberMap from "../assets/Uber-map.gif";
import { Link } from "react-router-dom"; 
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from '../Component/FinishRide';
import { SocketContext } from '../context/SocketContext';
import { toast } from 'react-toastify';

const CaptainRiding = () => {
const finishRef = useRef(null)
const { state } = useLocation();
const ride = state?.ride;

const [finishRidePanel, setFinishRidePanel] = useState(false)
const [paymentReceived, setPaymentReceived] = useState(false)
const { socket } = useContext(SocketContext)

useEffect(() => {
    const captainId = ride?.captain?._id || ride?.captain;
    if (captainId) {
      socket.emit('join', { userType: 'captain', userId: captainId });
    }
  }, [ride, socket]);

  useEffect(() => {
    const handleRidePaid = ({ rideId }) => {
      if (rideId !== ride?._id) return;

      setPaymentReceived(true);
      toast.success('Passenger payment received. You can complete the ride.');
    };

    socket.on('ride-paid', handleRidePaid);

    return () => {
      socket.off('ride-paid', handleRidePaid);
    };
  }, [ride?._id, socket]);

    useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRef.current, {
        transform: "translateY(100%)",
      });
    }
  },
    [finishRidePanel],
  );

  return (
    <>
    <div className='h-screen'>

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

        <div className="h-[80%]">
            <img className="h-full w-full object-cover" src={UberMap} />
        </div>

        <div className='flex bg-yellow-500 h-1/5 p-6 items-center justify-between relative'
        onClick={()=>{
            setFinishRidePanel(true)
        }}
        >
        <h5 className=' absolute left-40 top-2 text-black'><i className=" text-xl ri-arrow-up-wide-line"></i></h5>
            <h4 className='text-xl font-semibold '>6 Km Away</h4>
            <button className='bg-green-600 text-white font-semibold text-lg p-3 px-5 rounded-lg'>Completed Ride</button>
        </div>

        <div ref={finishRef} className="fixed bottom-0 left-0 right-0 z-10 w-full h-screen flex flex-col translate-y-full gap-3 bg-white border-2 border-black p-3">
          <FinishRide
            ride={ride}
            paymentReceived={paymentReceived}
            setFinishRidePanel={setFinishRidePanel}
          />
        </div>
        </div>
    </>
  )
}

export default CaptainRiding
