'use client'

import { LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next";

import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";



export default function LogOutBtn() {
    const { router } = UseSearchParamsHook()

    //-------------- Public Functions -------------------
    function handleLogOut() {
      deleteCookie("token");
      router.push("/login");
    }
  return (
    <button onClick={handleLogOut} className="py-2 border-t border-secondary-foreground w-full text-start px-4 flex items-center gap-2 text-lg font-medium">
    <LogOut size={20} color="#212121" className="rotate-180" />
    Log Out
  </button>
  )
}
