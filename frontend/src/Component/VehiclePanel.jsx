import React from 'react'
import UberCar from '../assets/UberCar.png'
import UberBike from '../assets/UberBike.webp'
import UberAuto from '../assets/UberAuto.png'

const VehiclePanel = (props) => {

  const vehicles = [
    {
      id: 1,
      image: UberCar,
      name: "UberCar",
      valueKey: "car",
      seats: 4,
      time: "2 mins away",
      description: "Affordable,compact rides",
      price: props.fare?.car ? `₹${props.fare.car}` : "₹193.20",
      imageClass: "h-20",
      contentClass: "mr-4 w-1/2 pb-2 pt-2"
    },
    {
      id: 2,
      image: UberAuto,
      name: "UberAuto",
      valueKey: "auto",
      seats: 4,
      time: "7 mins away",
      description: "Affordable,comfartable rides",
      price: props.fare?.auto ? `₹${props.fare.auto}` : "₹118.20",
      imageClass: "h-20",
      contentClass: "mr-4 w-1/2 pb-2 pt-2"
    },
    {
      id: 3,
      image: UberBike,
      name: "Moto",
      valueKey: "moto",
      seats: 1,
      time: "3 mins away",
      description: "Affordable motorcycle rides",
      price: props.fare?.moto ? `₹${props.fare.moto}` : "₹65.17",
      imageClass: "h-20",
      contentClass: "-ml-5 mr-4 w-1/2 pb-2 pt-2"
    }
  ];

  return (
    <>
      <h3 className='text-2xl font-bold'>
        Choose a Vehicle
      </h3>

      <h3
        onClick={() => {
          props.setvehiclePanelOpen(false)
        }}
        className='absolute top-4 right-2 cursor-pointer text-2xl'
      >
        <i className="ri-close-fill"></i>
      </h3>

      {vehicles.map((vehicle) => (
        <div
          key={vehicle.id}
          onClick={() => {
            props.setConfirmedRidePanel(true);
            props.setSelectedVehicle(vehicle);
            props.setvehicleType(vehicle.valueKey)
          }}
          className='flex w-full items-center justify-between rounded-xl border-2 border-gray-500 active:border-black active:border-3 pr-9'
        >
          <img
            className={vehicle.imageClass}
            src={vehicle.image}
            alt={vehicle.name}
          />

          <div className={vehicle.contentClass}>
            <h4 className='text-lg font-medium'>
              {vehicle.name}
              <span>
                <i className="ri-user-3-fill"></i>
                {vehicle.seats}
              </span>
            </h4>

            <h5 className='text-sm font-medium'>
              {vehicle.time}
            </h5>

            <p className='text-xs font-normal text-gray-600'>
              {vehicle.description}
            </p>
          </div>

          <h2 className='text-xl font-semibold'>
            {vehicle.price}
          </h2>
        </div>
      ))}
    </>
  )
}

export default VehiclePanel