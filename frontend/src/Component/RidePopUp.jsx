import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UberPassenger from '../assets/UberPassenger.png' 
import { formatAddress } from '../utils/formatAddress'

const RidePopUp = (props) => {
  const [fare, setFare] = useState(null);
  const rawAddr = props.address || props.ride?.destination || 'Dakshineswar Kali Temple';
  const formattedAddr = formatAddress(rawAddr, 'Dakshineswar Kali Temple');

  useEffect(() => {
    const pickup = props.ride?.pickup || props.pickup || "Howrah Railway Station";
    const destination = props.ride?.destination || props.destination || "Dakshineswar Kali Temple";

    if (pickup && destination && !props.ride?.fare && !props.selectedVehicle?.price) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setFare(res.data?.auto || res.data?.car || res.data?.moto || null);
        })
        .catch((err) => {
          console.error("Error fetching fare in RidePopUp:", err);
        });
    }
  }, [props.ride, props.pickup, props.destination, props.selectedVehicle]);

  const displayFare = props.ride?.fare
    ? `₹${props.ride.fare}`
    : props.selectedVehicle?.price
    ? props.selectedVehicle.price
    : fare
    ? `₹${fare}`
    : '₹165.20';

  return (
    <>
      <div>
          <div className='w-full flex flex-col gap-4'>
            <h5 onClick={()=>{
            props.setRidePopUpPanel(false)
          }} className=' absolute left-40 top-2 b'><i className="text-2xl ri-arrow-down-wide-line"></i></h5>
            <h2 className='font-bold text-2xl mt-6'>New Ride For You</h2>
            <div className='flex items-center justify-between bg-amber-500 p-4 rounded-3xl'>
                <div className='flex items-center justify-start gap-3'>
                <img className='w-15 h-15 border-4 border-black rounded-full' src={UberPassenger} alt='UberPassenger'/>
                <h4 className='text-xl font-semibold'>Sunil Das</h4>
            </div>
            <div className='flex'>
                <i className=" text-xl ri-map-pin-range-line"></i>
                <h4 className='text-lg font-medium'>11Km</h4>
            </div>
            </div>
              <div className='flex items-center p-2 gap-3 min-w-0'>
                <h3 className='text-2xl shrink-0'><i className="ri-map-pin-2-fill"></i></h3>
                <div className='overflow-hidden min-w-0'>
                  <h3 className='text-lg font-semibold truncate'>{formattedAddr.title}</h3>
                  {formattedAddr.subtext ? <p className='text-sm text-gray-500 truncate'>{formattedAddr.subtext}</p> : null}
                </div> 
              </div>

              <div className='flex items-center gap-5 p-2'>  
                <h3 className='text-2xl'><i className="ri-wallet-2-fill"></i></h3>  
                <div className='font-bold text-xl'>{displayFare}</div>     
              </div> 
          </div>
          <div className='flex gap-3'>
            <button onClick={()=>{
              props.setConfirmedRidePopUpPanel(true)
            }} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Accpet</button>
          <button onClick={()=>{
            props.setRidePopUpPanel(false)
          }} className='w-full bg-gray-400 text-red-500 font-semibold p-2 rounded-lg'>Reject</button>
          </div>
        </div>
    </>
  )
}

export default RidePopUp
