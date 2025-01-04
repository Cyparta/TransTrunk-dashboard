"use client";
import Link from "next/link";


function ShowCustomerDriver({ handleClose, default_data }) {
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
        Address:{" "}
        <span className="font-normal text-[#82817E]">{default_data?.address}</span>
      </p>
      
      <p className="font-medium text-[#646464]">
        Phone:{" "}
        <span className="font-normal text-[#82817E]">
          {default_data?.contact_number}
        </span>
      </p>
      <p className="font-medium text-[#646464]">
        Shipments:{" "}
        <span className="font-normal text-[#82817E]">
          {default_data?.num_shipments}
        </span>
      </p>
      
      <div className="flex justify-end mt-4">
        <Link href={""} className="text-primary underline font-medium">Shipments history</Link>
      </div>
    </main>
  );
}

export default ShowCustomerDriver;
