import React from "react";

export const westBengalAddresses = [
  {
    id: 1,
    place: "Park Street",
    city: "Kolkata",
    district: "Kolkata",
    state: "West Bengal",
    pincode: "700016",
  },
  {
    id: 2,
    place: "Howrah Railway Station",
    city: "Howrah",
    district: "Howrah",
    state: "West Bengal",
    pincode: "711101",
  },
  {
    id: 3,
    place: "Dakshineswar Kali Temple",
    city: "Kolkata",
    district: "North 24 Parganas",
    state: "West Bengal",
    pincode: "700076",
  },
  {
    id: 4,
    place: "Belur Math",
    city: "Howrah",
    district: "Howrah",
    state: "West Bengal",
    pincode: "711202",
  },
  {
    id: 5,
    place: "New Town",
    city: "Kolkata",
    district: "North 24 Parganas",
    state: "West Bengal",
    pincode: "700156",
  },
  {
    id: 6,
    place: "Salt Lake Sector V",
    city: "Bidhannagar",
    district: "North 24 Parganas",
    state: "West Bengal",
    pincode: "700091",
  },
  {
    id: 7,
    place: "Victoria Memorial",
    city: "Kolkata",
    district: "Kolkata",
    state: "West Bengal",
    pincode: "700071",
  },
  {
    id: 8,
    place: "Digha Sea Beach",
    city: "Digha",
    district: "Purba Medinipur",
    state: "West Bengal",
    pincode: "721428",
  },
  {
    id: 9,
    place: "Mandarmani Beach",
    city: "Mandarmani",
    district: "Purba Medinipur",
    state: "West Bengal",
    pincode: "721455",
  },
  {
    id: 10,
    place: "Bakkhali Beach",
    city: "Bakkhali",
    district: "South 24 Parganas",
    state: "West Bengal",
    pincode: "743339",
  },
  {
    id: 11,
    place: "Gangasagar",
    city: "Sagar Island",
    district: "South 24 Parganas",
    state: "West Bengal",
    pincode: "743373",
  },
  {
    id: 12,
    place: "Darjeeling Mall Road",
    city: "Darjeeling",
    district: "Darjeeling",
    state: "West Bengal",
    pincode: "734101",
  },
  {
    id: 13,
    place: "Happy Valley Tea Estate",
    city: "Darjeeling",
    district: "Darjeeling",
    state: "West Bengal",
    pincode: "734101",
  },
  {
    id: 14,
    place: "Kalimpong Town",
    city: "Kalimpong",
    district: "Kalimpong",
    state: "West Bengal",
    pincode: "734301",
  },
  {
    id: 15,
    place: "Siliguri Junction",
    city: "Siliguri",
    district: "Darjeeling",
    state: "West Bengal",
    pincode: "734001",
  },
  {
    id: 16,
    place: "Jaldapara National Park",
    city: "Madarihat",
    district: "Alipurduar",
    state: "West Bengal",
    pincode: "735220",
  },
  {
    id: 17,
    place: "Dooars",
    city: "Malbazar",
    district: "Jalpaiguri",
    state: "West Bengal",
    pincode: "735221",
  },
  {
    id: 18,
    place: "Santiniketan",
    city: "Bolpur",
    district: "Birbhum",
    state: "West Bengal",
    pincode: "731204",
  },
  {
    id: 19,
    place: "Hazarduari Palace",
    city: "Murshidabad",
    district: "Murshidabad",
    state: "West Bengal",
    pincode: "742149",
  },
  {
    id: 20,
    place: "Bishnupur Terracotta Temples",
    city: "Bishnupur",
    district: "Bankura",
    state: "West Bengal",
    pincode: "722122",
  },
  {
    id: 21,
    place: "Purulia Town",
    city: "Purulia",
    district: "Purulia",
    state: "West Bengal",
    pincode: "723101",
  },
  {
    id: 22,
    place: "Durgapur City Centre",
    city: "Durgapur",
    district: "Paschim Bardhaman",
    state: "West Bengal",
    pincode: "713216",
  },
  {
    id: 23,
    place: "Asansol",
    city: "Asansol",
    district: "Paschim Bardhaman",
    state: "West Bengal",
    pincode: "713301",
  },
  {
    id: 24,
    place: "Mayapur ISKCON",
    city: "Mayapur",
    district: "Nadia",
    state: "West Bengal",
    pincode: "741313",
  },
  {
    id: 25,
    place: "Malda Town Railway Station",
    city: "Malda",
    district: "Malda",
    state: "West Bengal",
    pincode: "732101",
  },
];

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  activeField,
  setpanelOpen,
  setvehiclePanelOpen,
  setSelectedAddress,
  pickup,
  destination,
  findTrip
}) => {
  const handleSelectSuggestion = (suggestionItem) => {
    const text = typeof suggestionItem === "string" ? suggestionItem : suggestionItem.place;

    let newPickup = pickup;
    let newDestination = destination;

    if (activeField === "pickup") {
      setPickup(text);
      newPickup = text;
    } else if (activeField === "destination") {
      setDestination(text);
      newDestination = text;
    }

    let addressObj;
    if (typeof suggestionItem === "string") {
      const parts = suggestionItem.split(",").map((s) => s.trim()).filter(Boolean);
      const placeName = parts[0] || suggestionItem;
      const remaining = parts.slice(1).filter((p) => p.toLowerCase() !== "india");
      addressObj = {
        place: placeName,
        city: remaining[0] || "",
        state: remaining.slice(1).join(", "),
        pincode: "",
        fullAddress: suggestionItem
      };
    } else {
      addressObj = suggestionItem;
    }

    setSelectedAddress?.(addressObj);

    if (activeField === "destination" || (newPickup && newDestination)) {
      setpanelOpen?.(false);
      setvehiclePanelO?.(false)
      findTrip?.(newPickup, newDestination);
    }
  };

  return (
    <>
      <div>
        <div className="max-h-129 space-y-2 overflow-y-auto pr-2 pt-2 pl-2 pb-2">
          {suggestions && suggestions.length > 0 ? (
            suggestions.map((elem, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectSuggestion(elem)}
                className="flex items-start gap-3 rounded-xl cursor-pointer active:border-black border border-slate-200 bg-slate-50 p-3 hover:bg-slate-100 transition-all"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                  <i className="ri-map-pin-2-fill"></i>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{elem}</p>
                </div>
              </div>
            ))
          ) : (
            westBengalAddresses.map((address) => (
              <div
                key={address.id}
                onClick={() => handleSelectSuggestion(address)}
                className="flex items-start gap-3 rounded-xl cursor-pointer active:border-black border border-slate-200 bg-slate-50 p-3 hover:bg-slate-100 transition-all"
              >
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                  <i className="ri-map-pin-2-fill"></i>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{address.place}</p>
                  <p className="text-sm text-slate-500">
                    {address.city}, {address.state} • {address.pincode}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LocationSearchPanel;
