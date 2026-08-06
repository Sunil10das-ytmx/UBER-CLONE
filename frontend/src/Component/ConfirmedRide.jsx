import React from 'react'
import { formatAddress } from '../utils/formatAddress'

const ConfirmedRide = (props) => {
  const formattedAddr = formatAddress(props.address);

  return (
    <>
      <div>

        <h3 className='text-2xl font-bold'>
          Confirmed Ride
        </h3>
        <h3
          onClick={() => {
            props.setConfirmedRidePanel(false)
          }}
          className='absolute top-4 right-2 cursor-pointer text-2xl'
        >
        <i className="ri-close-fill"></i>
        </h3>

        {/* Vehicle Image */}
        <div className='flex flex-col gap-4 justify-between items-center mt-8'>
          <img
            className={`${props.selectedVehicle?.imageClass} h-50 `}
            src={props.selectedVehicle?.image}
            alt={props.selectedVehicle?.name}
          />
          <div className='w-full flex flex-col gap-4'>
              <div className='flex items-center p-2 gap-3 min-w-0'>
                <h3 className='text-2xl shrink-0'><i className="ri-map-pin-2-fill"></i></h3>
                <div className='overflow-hidden min-w-0'>
                  <h3 className='text-lg font-semibold truncate'>{formattedAddr.title}</h3>
                  {formattedAddr.subtext ? <p className='text-sm text-gray-500 truncate'>{formattedAddr.subtext}</p> : null}
                </div>
              </div>

              <div className='flex items-center gap-5 p-2'>  
                <h3 className='text-2xl'><i className="ri-wallet-2-fill"></i></h3>  
                <div className='font-bold text-xl'>{props.selectedVehicle?.price || (props.fare && props.selectedVehicle?.valueKey && props.fare[props.selectedVehicle.valueKey] ? `₹${props.fare[props.selectedVehicle.valueKey]}` : '₹193.20')}</div>     
              </div> 
          </div>
          <button onClick={()=>{
            props.setvehicleFound(true)
            props.setConfirmedRidePanel(false)
            props.createRide()
          }} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>
        </div>
        

      </div>
    </>
  )
}

export default ConfirmedRide