"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamically import the MapComponent (Leaflet doesn't work with SSR)
const MapComponent = dynamic(() => import("../helper/MapComponent"), {
  ssr: false,
});
function ShowDetailsVechiles({ handleClose, default_data }) {
  console.log(default_data);
  //----------------- Local State ----------------
  const parseLocation = (location) => {
    const match = location.match(/POINT\s\(([^)]+)\)/);
    if (match) {
      const [longitude, latitude] = match[1].split(" ").map(Number);
      return { latitude, longitude };
    }
    return null;
  };
  const location = parseLocation(default_data?.location);
  // --------------------- Return JSX ---------------

  return (
    <main className="grid grid-cols-3 gap-y-6 my-4 px-2  max-w-4xl">
      <p className="font-medium text-[#646464]">
        ID:{" "}
        <span className="font-normal text-[#82817E]">{default_data?.id}</span>
      </p>
      <p className="font-medium text-[#646464]">
        Name:{" "}
        <span className="font-normal text-[#82817E]">{default_data?.name}</span>
      </p>
      <p className="font-medium text-[#646464]">
        Type:{" "}
        <span className="font-normal text-[#82817E]">{default_data?.type}</span>
      </p>
      <p className="font-medium text-[#646464]">
        Vechile number:{" "}
        <span className="font-normal text-[#82817E]">
          {default_data?.vehicle_number}
        </span>
      </p>
      <p className="font-medium text-[#646464]">
        Color:{" "}
        <span className="font-normal text-[#82817E]">
          {default_data?.color}
        </span>
      </p>
      <p className="font-medium text-[#646464]">
        Capacity:{" "}
        <span className="font-normal text-[#82817E]">
          {default_data?.capacity}KG
        </span>
      </p>
      <div>
        <p className="font-medium text-primary">Current location</p>
        <div className="mt-4">
          <MapComponent
            latitude={location?.latitude}
            longitude={location?.longitude}
          />
        </div>
      </div>
      <div className="col-span-2 ">
        <p className="font-medium text-primary">License photos</p>
        <div className="grid grid-cols-2 gap-4">
          {default_data.license_photos.map((photo, index) => {
            return (
              <div key={index} className="mt-4 rounded-[13px]">
                <Image
                  src={photo.img}
                  width={0}
                  height={0}
                  className="w-full h-[231px] object-cover rounded-[13px]"
                  alt="license"
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default ShowDetailsVechiles;
