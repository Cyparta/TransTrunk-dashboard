import Image from "next/image";
import React from "react";
import Header from "./Header";
import ProfileDropDown from "./ProfileDropDown";
import { Bell, Settings } from "lucide-react";
import { NavBarInSm } from "./NavBarInSm";

export default function NavBar() {
  return (
    <div>
      <div className=" px-10 flex items-center py-4 shadow-custom bg-white justify-between">
        <Image src="/logo.png" alt="logo" width={142} height={70} />
        <div className="hidden md:flex justify-between gap-4">
          <div className="self-center cursor-pointer">
            <Settings color={"#467DB2"} size={18} />
          </div>
          <div className="self-center cursor-pointer">
            <Bell color={"#467DB2"} size={18} />
          </div>
          <ProfileDropDown />
        </div>
        <div className="block md:hidden">
          <NavBarInSm />
        </div>
      </div>
    </div>
  );
}
