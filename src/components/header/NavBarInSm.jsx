import { NavItems } from "@/lib/constant-data"

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import NavLink from "@/components/header/NavLink"

import {  Menu } from "lucide-react"

export function NavBarInSm() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="cursor-pointer text-[25px]">
                    <Menu size={30} />
                </div>
            </SheetTrigger>
            <SheetContent className="overflow-visible bg-gray-100 flex gap-8 flex-col justify-center">
                <SheetTitle></SheetTitle>
                <ul className="flex flex-col  gap-8">
                    {NavItems.map((item) => (
                        <li key={item.id}>
                            <NavLink data={item} key={item.id} />
                        </li>
                    ))}
                </ul>
            </SheetContent>
        </Sheet >
    )
}