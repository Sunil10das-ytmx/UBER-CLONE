import React, { useState } from 'react'
import UberPassenger from '../assets/UberPassenger.png'
import { Link } from "react-router-dom";

const ConfirmedRIdePopUp = (props) => {
    const [otp, setOtp] = useState('')

    const submitOpt = (e) => {
        e.preventDefault()
    }

    const handleKeyClick = (val) => {
        if (val === 'backspace') {
            setOtp(prev => prev.slice(0, -1))
        } else if (val === 'clear') {
            setOtp('')
        } else {
            if (otp.length < 6) {
                setOtp(prev => prev + val)
            }
        }
    }

    return (
        <>
            <div>
                <div className='w-full flex flex-col gap-4'>
                    <h5 onClick={() => {
                        props.setConfirmedRidePopUpPanel(false)
                    }} className=' absolute left-40 top-2 '><i className="text-2xl ri-arrow-down-wide-line"></i></h5>
                    <h2 className='font-bold text-xl mt-3 text-center uppercase'>Confrim Ride To Start</h2>
                    <div className='flex items-center justify-between bg-amber-500 p-4 rounded-3xl '>
                        <div className='flex items-center justify-start gap-3'>
                            <img className='w-15 h-15 border-4 border-black rounded-full' src={UberPassenger} alt='UberPassenger' />
                            <h4 className='text-xl font-semibold'>Sunil Das</h4>
                        </div>
                        <div className='flex'>
                            <i className=" text-xl ri-map-pin-range-line"></i>
                            <h4 className='text-lg font-medium'>11Km</h4>
                        </div>
                    </div>
                    <div className='flex items-center p-2 gap-3 -mt-3'>
                        <h3 className='text-xl'><i className="ri-map-pin-2-fill"></i></h3>
                        <div className=''>
                            <h3 className='text-2xl font-medium'>{/*props.address?.place ?? {/*'Unknown place'*/}Dakshineswar Kali Temple</h3>
                            <p className='text-lg text-gray-500 '>{/*props.address?.city ?? 'Unknown city'*/} Kolkata, {/*props.address?.state ?? {'Unknown state'*/} West Bengal, {/*props.address?.pincode ?? ''*/} 700076</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-2 -mt-3'>
                        <h3 className='text-2xl'><i className="ri-wallet-2-fill"></i></h3>
                        <div className='font-bold text-xl'>{/*props.selectedVehicle?.price*/}₹165.20</div>
                    </div>
                </div>

                <div className='mt-4'>
                    <form onSubmit={(e) => {
                        submitOpt(e)
                    }}>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder='Enter OTP'
                            className="bg-[#eee] font-mono px-12 py-2 text-base rounded-lg w-full mt-4 mb-4 text-center"
                        />

                        {/* Virtual Numeric Keyboard */}
                        <div className='grid grid-cols-3 gap-3 mb-4'>
                            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((key, idx) => (
                                <button
                                    key={idx}
                                    type='button'
                                    onClick={() => {
                                        if (key === '⌫') handleKeyClick('backspace')
                                        else if (key === 'C') handleKeyClick('clear')
                                        else handleKeyClick(key)
                                    }}
                                    className='bg-gray-200 text-black font-semibold text-xl py-3 rounded-lg active:bg-gray-300 hover:bg-gray-300 flex items-center justify-center select-none'
                                >
                                    {key}
                                </button>
                            ))}
                        </div>

                        <div className='flex flex-col gap-3'>
                            <Link to='/captain-riding' className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg text-center'>Confirm</Link>
                            <button type='button' onClick={() => {
                                props.setRidePopUpPanel(false)
                                props.setConfirmedRidePopUpPanel(false)
                            }} className='w-full bg-red-500 text-white font-semibold p-2 rounded-lg'>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ConfirmedRIdePopUp

