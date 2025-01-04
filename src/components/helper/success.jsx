import BreadCrumb from "@/components/helper/BreadCrumb";
import Image from "next/image";
import React from "react";

export default function SuccessPage({href, message }) {
  return (
    <>
      <BreadCrumb href={href} title={""} />
      <div className="flex flex-col justify-center items-center h-[80vh] ">
        <Image src={'/Group.png'} width={300} height={300} alt="success"/>
        <p className="font-semibold text-[20px] max-w-80 text-center">{message}</p>
      </div>
    </>
  );
}
