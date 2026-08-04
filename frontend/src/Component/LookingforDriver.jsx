import React from "react";
import { motion } from "framer-motion";
import { formatAddress } from "../utils/formatAddress";

const LookingforDriver = (props) => {
  const formattedAddr = formatAddress(props.address);

  return (
    <>
      <div className="h-[477.56px]">
        <h3
          onClick={() => {
            props.setvehicleFound(false);
          }}
          className="absolute top-4 right-2 cursor-pointer text-2xl"
        >
          <i className="ri-close-fill"></i>
        </h3>

        {/* Vehicle Image */}
        <div className="flex flex-col gap-4 justify-between items-center mt-8">
          <motion.img
            className={`${props.selectedVehicle?.imageClass} h-50 `}
            src={props.selectedVehicle?.image}
            alt={props.selectedVehicle?.name}
          />
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl p-2 font-bold leading-none">
              Searching for nearby drivers
            </h3>

            <div className="flex items-center gap-1 mt-0.5">
              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-blue-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
              />

              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-blue-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />

              <motion.div
                className="w-2.5 h-2.5 rounded-full bg-blue-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>

          <div className="w-full flex flex-col mt-3 gap-4">
            <div className="flex items-center p-2 gap-3 min-w-0">
              <h3 className="text-2xl shrink-0">
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

            <div className="flex items-center gap-5 p-2">
              <h3 className="text-2xl">
                <i className="ri-wallet-2-fill"></i>
              </h3>
              <div className="font-bold text-xl">
                {props.selectedVehicle?.price || (props.fare && props.selectedVehicle?.valueKey && props.fare[props.selectedVehicle.valueKey] ? `₹${props.fare[props.selectedVehicle.valueKey]}` : '₹193.20')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LookingforDriver;
