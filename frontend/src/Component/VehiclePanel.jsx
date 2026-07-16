import React from 'react'
import UberCar from '../assets/UberCar.png'
import UberBike from '../assets/UberBike.webp'
import UberAuto from '../assets/UberAuto.png'

const VehiclePanel = (props) => {
  return (
    <>
      <h3 className=' text-2xl font-bold'>Choose a Vehicle</h3>
            <h3 
            onClick={()=>{
              props.setvehiclePanelOpen(false)
            }}
             className='absolute top-4 right-2 cursor-pointer text-2xl'><i className="ri-close-fill"></i></h3>
            <div className='flex w-full items-center justify-between rounded-xl border-2 border-gray-500 active:border-black active:border-3 pr-9'>
              <img className='h-20' src={UberCar} />
              <div className='mr-4 w-1/2 pb-2 pt-2'>
                <h4 className='text-lg font-medium'>UberCar <span><i className="ri-user-3-fill"></i>4</span></h4>
                <h5 className='text-sm font-medium'>2 mins away</h5>
                <p className='text-xs font-normal text-gray-600'>Affordable,compact rides</p>
              </div>
              <h2 className='text-xl font-semibold'>₹193.20</h2>
            </div>

            <div className='flex w-full items-center justify-between rounded-xl border-2 border-gray-500 active:border-black active:border-3 pr-9'>
              <img className='h-20' src={UberAuto} />
              <div className='mr-4 w-1/2 pb-2 pt-2'>
                <h4 className='text-lg font-medium'>UberAuto <span><i className="ri-user-3-fill"></i>4</span></h4>
                <h5 className='text-sm font-medium'>7 mins away</h5>
                <p className='text-xs font-normal text-gray-600'>Affordable,comfartable rides</p>
              </div>
              <h2 className='text-xl font-semibold'>₹118.20</h2>
            </div>

            <div className='flex w-full items-center justify-between rounded-xl border-2 border-gray-500 active:border-black active:border-3 pr-9'>
              <img className='h-20' src={UberBike} />
              <div className='-ml-5 mr-4 w-1/2 pb-2 pt-2'>
                <h4 className='text-lg font-medium'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                <h5 className='text-sm font-medium'>3 mins away</h5>
                <p className='text-xs font-normal text-gray-600'>Affordable motorcycle rides</p>
              </div>
              <h2 className='text-xl font-semibold'>₹65.17</h2>
            </div>
    </>
  )
}

export default VehiclePanel
