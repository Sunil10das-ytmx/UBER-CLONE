import React from 'react';
import UberPassenger from '../assets/UberPassenger.png';
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
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
                    <div className='flex items-center gap-4 p-2'>
                        <h3 className='text-2xl text-gray-700'><i className="ri-map-pin-user-fill"></i></h3>
                        <div>
                            <h3 className='text-xl font-medium'>{props.ride?.pickup || 'Howrah Railway Station'}</h3>
                            <p className='text-sm text-gray-500'>Kolkata, West Bengal, 700076</p>
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
                    <div className='flex items-center gap-4 p-2 border-b border-gray-200'>
                        <h3 className='text-2xl text-gray-700'><i className="ri-map-pin-2-fill"></i></h3>
                        <div>
                            <h3 className='text-xl font-medium'>{props.ride?.destination || 'Dakshineswar Kali Temple'}</h3>
                            <p className='text-sm text-gray-500'>Kolkata, West Bengal, 700076</p>
                        </div>
                    </div>

                    {/* Fare & Payment Method */}
                    <div className='flex items-center gap-4 p-2'>
                        <h3 className='text-2xl text-gray-700'><i className="ri-wallet-2-fill"></i></h3>
                        <div>
                            <h3 className='text-xl font-bold'>₹{props.ride?.fare || '165.20'}</h3>
                            <p className='text-sm text-gray-500'>Cash Payment</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Complete Action & Note */}
            <div className='mt-6 px-2 flex flex-col gap-3 mb-4'>
                <Link 
                    to='/captain-home' 
                    className='w-full bg-green-600 text-white font-semibold p-3 rounded-lg text-center text-lg block hover:bg-green-700 transition-colors'
                >
                    Finish Ride
                </Link>
                
                <p className='text-red-500 text-xs text-center font-medium'>
                    Click on "Finish Ride" button if you have collected the cash payment.
                </p>
            </div>
        </div>
    );
};

export default FinishRide;
