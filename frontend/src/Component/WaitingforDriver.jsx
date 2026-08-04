import React from "react";
import { formatAddress } from "../utils/formatAddress";
import uberDriver from "../assets/UberDriver.png";
import UberCar from "../assets/UberCar.png";
import UberBike from "../assets/UberBike.webp";
import UberAuto from "../assets/UberAuto.png";

const WaitingforDriver = (props) => {
  const formattedAddr = formatAddress(props.address, "Pickup Point");
  const uberdrivers = [
    // ===================== CARS =====================
    {
      id: 1,
      src: UberCar,
      alt: "UberCar",
      vehicleType: "car",
      driverName: "Rahul Sharma",
      vehicleModel: "Maruti Suzuki Dzire",
      vehicleColor: "White",
      numberPlate: "WB 34 AB 5821",
      rating: 4.9,
    },
    {
      id: 2,
      src: UberCar,
      alt: "UberCar",
      vehicleType: "car",
      driverName: "Amit Kumar",
      vehicleModel: "Hyundai Aura",
      vehicleColor: "Silver",
      numberPlate: "WB 12 CK 1943",
      rating: 4.8,
    },
    {
      id: 3,
      src: UberCar,
      alt: "UberCar",
      vehicleType: "car",
      driverName: "Priya Das",
      vehicleModel: "Honda Amaze",
      vehicleColor: "Blue",
      numberPlate: "WB 20 AR 7615",
      rating: 4.7,
    },
    {
      id: 4,
      src: UberCar,
      alt: "UberCar",
      vehicleType: "car",
      driverName: "Sourav Ghosh",
      vehicleModel: "Toyota Etios",
      vehicleColor: "White",
      numberPlate: "WB 02 BL 4389",
      rating: 4.9,
    },
    {
      id: 5,
      src: UberCar,
      alt: "UberCar",
      vehicleType: "car",
      driverName: "Sneha Banerjee",
      vehicleModel: "Kia Sonet",
      vehicleColor: "Blue",
      numberPlate: "WB 04 FH 9814",
      rating: 5.0,
    },

    // ===================== AUTO =====================
    {
      id: 6,
      src: UberAuto,
      alt: "UberAuto",
      vehicleType: "auto",
      driverName: "Rakesh Singh",
      vehicleModel: "Bajaj RE Compact",
      vehicleColor: "Yellow & Green",
      numberPlate: "WB 73 A 4567",
      rating: 4.8,
    },
    {
      id: 7,
      src: UberAuto,
      alt: "UberAuto",
      vehicleType: "auto",
      driverName: "Neha Roy",
      vehicleModel: "TVS King Deluxe",
      vehicleColor: "Yellow & Green",
      numberPlate: "WB 73 B 2784",
      rating: 4.9,
    },
    {
      id: 8,
      src: UberAuto,
      alt: "UberAuto",
      vehicleType: "auto",
      driverName: "Arjun Patel",
      vehicleModel: "Piaggio Ape City",
      vehicleColor: "Yellow & Green",
      numberPlate: "WB 73 C 9125",
      rating: 4.7,
    },
    {
      id: 9,
      src: UberAuto,
      alt: "UberAuto",
      vehicleType: "auto",
      driverName: "Mohit Agarwal",
      vehicleModel: "Mahindra Alfa",
      vehicleColor: "Yellow & Green",
      numberPlate: "WB 73 D 5543",
      rating: 4.6,
    },
    {
      id: 10,
      src: UberAuto,
      alt: "UberAuto",
      vehicleType: "auto",
      driverName: "Pooja Mishra",
      vehicleModel: "Atul Gem",
      vehicleColor: "Yellow & Green",
      numberPlate: "WB 73 E 8831",
      rating: 4.9,
    },

    // ===================== BIKES =====================
    {
      id: 11,
      src: UberBike,
      alt: "UberBike",
      vehicleType: "bike",
      driverName: "Deepak Gupta",
      vehicleModel: "Hero Splendor Plus",
      vehicleColor: "Black",
      numberPlate: "WB 40 K 7412",
      rating: 4.9,
    },
    {
      id: 12,
      src: UberBike,
      alt: "UberBike",
      vehicleType: "bike",
      driverName: "Ritu Chakraborty",
      vehicleModel: "Honda Shine",
      vehicleColor: "Red",
      numberPlate: "WB 40 L 2651",
      rating: 4.8,
    },
    {
      id: 13,
      src: UberBike,
      alt: "UberBike",
      vehicleType: "bike",
      driverName: "Karan Mehta",
      vehicleModel: "TVS Raider 125",
      vehicleColor: "Blue",
      numberPlate: "WB 40 M 9834",
      rating: 4.7,
    },
    {
      id: 14,
      src: UberBike,
      alt: "UberBike",
      vehicleType: "bike",
      driverName: "Vikram Yadav",
      vehicleModel: "Bajaj Pulsar 150",
      vehicleColor: "Black",
      numberPlate: "WB 40 N 1198",
      rating: 4.9,
    },
    {
      id: 15,
      src: UberBike,
      alt: "UberBike",
      vehicleType: "bike",
      driverName: "Anjali Verma",
      vehicleModel: "TVS Apache RTR 160",
      vehicleColor: "Grey",
      numberPlate: "WB 40 P 6754",
      rating: 4.8,
    },
  ];

  const selectedVehicleName = props.selectedVehicle?.name || "UberCar";
  const vehicleType =
    selectedVehicleName === "UberCar"
      ? "car"
      : selectedVehicleName === "UberAuto"
        ? "auto"
        : "bike";

  const driver =
    uberdrivers.find((d) => d.vehicleType === vehicleType) || uberdrivers[0];
  const driverFirstNameUpper = driver.driverName.split(" ")[0].toUpperCase();

  return (
    <>
      <div className="relative w-full  pb-4">
        <h3
          onClick={() => {
            props.setWaitingForDriver(false);
          }}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-gray-400 hover:text-black transition-colors"
        >
          <i className="ri-arrow-down-wide-line"></i>
        </h3>

        <h3 className="text-2xl font-bold mb-4 pr-10">Driver is on the way</h3>

        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div className="relative flex items-center h-20 min-w-35">
            <img
              src={uberDriver}
              alt="Driver"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm z-10"
            />
            <img
              src={props.selectedVehicle?.image || driver.src}
              alt={props.selectedVehicle?.name || driver.alt}
              className="w-20 h-22 object-contain -ml-5 z-0"
            />
          </div>

          <div className="flex flex-col items-end text-right">
            <h4 className="text-sm text-gray-500 font-medium tracking-wide uppercase">
              {driverFirstNameUpper}
            </h4>
            <h2 className="text-2xl font-bold text-black leading-tight my-0.5">
              {driver.numberPlate}
            </h2>
            <p className="text-sm text-gray-600 font-semibold">
              {driver.vehicleColor} {driver.vehicleModel}
            </p>
            <div className="flex items-center gap-1 mt-1 text-gray-700">
              <i className="ri-star-fill text-yellow-500"></i>
              <span className="text-sm font-bold">{driver.rating}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-4 p-2 border-b border-gray-100 min-w-0">
            <h3 className="text-xl text-gray-700 shrink-0">
              <i className="ri-map-pin-2-fill"></i>
            </h3>
            <div className="overflow-hidden min-w-0">
              <h3 className="text-lg font-semibold truncate">
                {formattedAddr.title}
              </h3>
              {formattedAddr.subtext ? (
                <p className="text-sm text-gray-500 truncate">
                  {formattedAddr.subtext}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <h3 className="text-xl text-gray-700">
              <i className="ri-wallet-2-fill"></i>
            </h3>
            <div>
              <h3 className="text-lg font-semibold">
                {props.selectedVehicle?.price || (props.fare && props.selectedVehicle?.valueKey && props.fare[props.selectedVehicle.valueKey] ? `₹${props.fare[props.selectedVehicle.valueKey]}` : "₹0")}
              </h3>
              <p className="text-sm text-gray-500">Cash payment</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingforDriver;
