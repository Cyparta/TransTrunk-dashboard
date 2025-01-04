import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ListFilter, Plus, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export function PopoverDemo({ text, form, buttonStyle }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`text-primary bg-white capitalize flex items-center gap-2 font-medium border border-[#467DB2] rounded hover:text-primary hover:bg-white ${buttonStyle}`}
        >
          {text}
          {text == "Filter" && <SlidersHorizontal color="#467DB2" size={20} />}
          {text == "Customize" && <ListFilter color="#467DB2" size={20} />}
          {text == "new" && <Plus size={20} className="text-[#344054]" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        {typeof form === "function" ? form() : form}
      </PopoverContent>
    </Popover>
  );
}
