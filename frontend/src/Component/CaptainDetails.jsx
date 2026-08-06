import React,{useContext} from 'react'
import UberDriver from '../assets/UberDriver.png'
import {CaptainDataContext} from '../context/CaptianContext.jsx'


const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)

  return (
    <>
      <div className="flex items-center justify-between">
            <div className="flex text-center items-center gap-2">
            <img 
            className="w-12 h-12"
            src={UberDriver}  alt="UberDriver"/>
              <h4 className="text-lg font-bold capitalize">
                {captain?.fullname?.firstname + " " + captain?.fullname?.lastname}
              </h4>
            </div>
            <div className=" flex flex-col">
              <h4 className="text-xl font-bold">₹665.40</h4>
              <p className="text-sm text-gray-900 font-semibold">Earned</p>
            </div>
          </div>

          <div className=" bg-yellow-500 flex p-4 gap-8 mt-4 rounded-2xl">
            <div className="text-center">
              <i className=" text-2xl font-thin ri-timer-line"></i>
              <h5 className="text-lg font-medium">10.2</h5>
              <p className="text-sm text-gray-600">Hours Online</p>
            </div>
          <div className="text-center">
              <i className=" text-2xl font-thin ri-speed-up-line"></i>
              <h5 className="text-lg font-medium">10.2</h5>
              <p className="text-sm text-gray-600" >Total Time</p>
          </div>
          <div className="text-center">
              <i className="text-2xl font-thin ri-calendar-todo-line"></i>
              <h5 className="text-lg font-medium">10.2</h5>
              <p className="text-sm text-gray-600">Hours Online</p>
          </div>
          </div>
    </>
  )
}

export default CaptainDetails
