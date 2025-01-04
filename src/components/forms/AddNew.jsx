"use client";
import { Plus } from "lucide-react";
import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";
import { PopoverDemo } from "../helper/PopOver";
import { Button } from "../ui/button";

const AddNew = ({path,exportURL,data}) => {
    const { router, searchParams, pathname } = UseSearchParamsHook();
    
    return (
        <>
            <PopoverDemo text={"Filter"} form={() => (
                <div className="flex flex-col ">
                    
                </div>
            )} />
            {/* <CommonDialog text="Export" show_add_button={false} exportURL={exportURL} data={data}/> */}
            <Button
                onClick={() => router.push(path)}
                className="bg-primary text-white capitalize flex items-center gap-2 font-semibold"
            >
                Add 
                <Plus color="#ffff" size={20} />
            </Button>
        </>
    );
};

export default AddNew;
