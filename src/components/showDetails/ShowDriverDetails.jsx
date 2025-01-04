"use client";
import Image from "next/image";


function ShowDetailsDriver({ handleClose, default_data }) {
  console.log(default_data);
  //----------------- Local State ----------------
  
  // --------------------- Return JSX ---------------

  return (
    <main className="grid grid-cols-2 gap-y-6 my-4 px-2">
      <p className="font-medium text-[#646464]">
        ID:{" "}
        <span className="font-normal text-[#82817E]">{default_data?.id}</span>
      </p>
      <p className="font-medium text-[#646464]">
        Name:{" "}
        <span className="font-normal text-[#82817E]">{default_data?.name}</span>
      </p>
      
      <p className="font-medium text-[#646464]">
        Phone number:{" "}
        <span className="font-normal text-[#82817E]">
          {default_data?.phone_number}
        </span>
      </p>
      <p className="font-medium text-[#646464]">
        National id:{" "}
        <span className="font-normal text-[#82817E]">
          {default_data?.national_id}
        </span>
      </p>
      
      
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

export default ShowDetailsDriver;
