import React from 'react'
import UberPassenger from '../assets/UberPassenger.png' 
const RidePopUp = (props) => {
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
              <div className='flex items-center p-2 gap-3'>
                <h3 className='text-2xl'><i className="ri-map-pin-2-fill"></i></h3>
                <div className=''>
                  <h3 className='text-2xl font-medium'>{props.address?.place ?? {/*'Unknown place'*/} , 'Dakshineswar Kali Temple'}</h3>
                  <p className='text-lg text-gray-500 '>{/*props.address?.city ?? 'Unknown city'*/} Kolkata {/*props.address?.state ?? {'Unknown state'*/} West Bengal {/*props.address?.pincode ?? ''*/} 700076</p>
                </div> 
              </div>

              <div className='flex items-center gap-5 p-2'>  
                <h3 className='text-2xl'><i className="ri-wallet-2-fill"></i></h3>  
                <div className='font-bold text-xl'>{/*props.selectedVehicle?.price*/}₹165.20</div>     
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
