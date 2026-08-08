import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UberPassenger from '../assets/UberPassenger.png';
import { useNavigate } from 'react-router-dom';
import { formatAddress } from '../utils/formatAddress';
import { toast } from 'react-toastify';

const FinishRide = (props) => {
    const [fare, setFare] = useState(null);
    const [finishing, setFinishing] = useState(false);
    const navigate = useNavigate();
    const pickupAddr = formatAddress(props.ride?.pickup || 'Howrah Railway Station', 'Howrah Railway Station');
    const destAddr = formatAddress(props.ride?.destination || 'Dakshineswar Kali Temple', 'Dakshineswar Kali Temple');

    useEffect(() => {
        const pickup = props.ride?.pickup ;
        const destination = props.ride?.destination ;

        if (pickup && destination && props.ride?.fare == null) {
            axios
                .get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                    params: { pickup, destination },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    setFare(res.data?.car || res.data?.auto || res.data?.moto || null);
                })
                .catch((err) => {
                    console.error("Error fetching fare in FinishRide:", err);
                });
        }
    }, [props.ride]);

    const displayFare = props.ride?.fare != null
        ? `₹${props.ride.fare}`
        : fare != null
            ? `₹${fare}`
            : '₹0';

    const completeRide = async () => {
        if (!props.paymentReceived || !props.ride?._id || finishing) return;

        setFinishing(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
                { rideId: props.ride._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            toast.success('Ride completed successfully.');
            navigate('/captain-home');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to complete the ride.');
        } finally {
            setFinishing(false);
        }
    };

    return (
        <div className='h-full flex flex-col justify-between select-none'>
            <div>
                {/* Close Arrow */}
                <h5 
                    onClick={() => {
                        if (props.setFinishRidePanel) {
                            props.setFinishRidePanel(false);
                        }
                    }} 
                    className='absolute left-1/2 -translate-x-1/2 top-2 cursor-pointer p-1'
                >
                    <i className="text-2xl ri-arrow-down-wide-line"></i>
                </h5>

                <h2 className='font-bold text-2xl mt-6 text-center uppercase mb-4'>Finish This Ride</h2>

                {/* Passenger Info Card */}
                <div className='flex items-center justify-between bg-amber-500 p-4 rounded-3xl mb-4'>
                    <div className='flex items-center justify-start gap-3'>
                        <img className='w-14 h-14 border-2 border-black rounded-full object-cover' src={UberPassenger} alt='UberPassenger' />
                        <h4 className='text-xl font-semibold'>{props.ride?.user?.fullname?.firstname ? `${props.ride.user.fullname.firstname} ${props.ride.user.fullname.lastname || ''}` : 'Sunil Das'}</h4>
                    </div>
                    <div className='flex items-center gap-1'>
                        <i className="text-xl ri-map-pin-range-line"></i>
                        <h4 className='text-lg font-medium'>11Km</h4>
                    </div>
                </div>

                {/* Ride Trip Locations & Fare Details */}
                <div className='flex flex-col gap-2 px-2'>
                    {/* Pickup Location */}
                    <div className='flex items-center gap-4 p-2 min-w-0'>
                        <h3 className='text-2xl text-gray-700 shrink-0'><i className="ri-map-pin-user-fill"></i></h3>
                        <div className='overflow-hidden min-w-0'>
                            <h3 className='text-lg font-semibold truncate'>{pickupAddr.title}</h3>
                            {pickupAddr.subtext ? <p className='text-sm text-gray-500 truncate'>{pickupAddr.subtext}</p> : null}
                        </div>
                    </div>

                    {/* Route Arrow Indicator */}
                    <div className='flex items-center gap-4 px-2 -my-1'>
                        <div className='w-6 flex justify-center text-gray-500'>
                            <i className="ri-arrow-down-line text-xl font-bold"></i>
                        </div>
                        <div className='flex-1 border-b border-gray-200'></div>
                    </div>

                    {/* Dropoff Location */}
                    <div className='flex items-center gap-4 p-2 border-b border-gray-200 min-w-0'>
                        <h3 className='text-2xl text-gray-700 shrink-0'><i className="ri-map-pin-2-fill"></i></h3>
                        <div className='overflow-hidden min-w-0'>
                            <h3 className='text-lg font-semibold truncate'>{destAddr.title}</h3>
                            {destAddr.subtext ? <p className='text-sm text-gray-500 truncate'>{destAddr.subtext}</p> : null}
                        </div>
                    </div>

                    {/* Fare & Payment Method */}
                    <div className='flex items-center gap-4 p-2'>
                        <h3 className='text-2xl text-gray-700'><i className="ri-wallet-2-fill"></i></h3>
                        <div>
                            <h3 className='text-xl font-bold'>{displayFare}</h3>
                            <p className='text-sm text-gray-500'>Cash Payment</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Complete Action & Note */}
            <div className='mt-6 px-2 flex flex-col gap-3 mb-4'>
                <button
                    type='button'
                    onClick={completeRide}
                    disabled={!props.paymentReceived || finishing}
                    className='w-full bg-green-600 text-white font-semibold p-3 rounded-lg text-center text-lg block hover:bg-green-700 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400'
                >
                    {finishing ? 'Completing Ride...' : props.paymentReceived ? 'Finish Ride' : 'Waiting for Payment'}
                </button>
                
                <p className='text-red-500 text-xs text-center font-medium'>
                    {props.paymentReceived
                        ? 'Payment received. You can now complete the ride.'
                        : 'The passenger must pay before you can complete the ride.'}
                </p>
            </div>
        </div>
    );
};

export default FinishRide;
