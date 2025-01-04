import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GetDataInServerSide } from "@/lib/action";
import LogOutBtn from "./LogOutBtn";
import { getCookie, setCookie } from "cookies-next";

export default async function ProfileDropDown() {
  const data = await GetDataInServerSide("/core/profile/", {
    cache: "no-store",
  });

  const user_detail = {
    image: data?.profile_picture,
    name: data?.name,
    phone: data?.phone_number,
    role: data?.role,
  };
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none flex gap-2">
        <Avatar className={"m-0"}>
          <AvatarImage src={user_detail?.image} />
        </Avatar>
        <div className="self-center">
          <p className="text-left text-sm font-bold">{user_detail?.name} </p>
          <p className="text-[12px] font-semibold text-[#565656]">{user_detail?.role}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="w-[366px] max-w-full px-2 min-h-[140px] rounded-md py-2 border border-secondary-foreground flex items-start justify-between flex-col  ">
          <div className="flex items-center gap-2">
            <Avatar className="w-[60px] h-[60px]">
              <AvatarImage src={user_detail?.image} />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{user_detail?.name}</p>
              <p className="text-lg text-[#646464]">{user_detail?.phone}</p>
            </div>
          </div>
          <LogOutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
