'use client';

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";

import { ArrowLeft } from "lucide-react";

export default function EditRowDemo({ DialogForm, default_data, icon }) {
    const [open, setOpen] = useState(false);

    //------------- Global Functions ---------------
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="flex items-center gap-2">
            {
                icon ? <Button onClick={handleOpen} className="bg-inherit text-primary capitalize flex items-center gap-2  font-light hover:text-white">
                    {icon}
                </Button> : <Button onClick={handleOpen} className="bg-gray-800 text-white capitalize flex items-center gap-2  font-light hover:bg-gray-800">
                    Edit
                </Button>
            }
            <Dialog open={open} onOpenChange={setOpen} aria-describedby='modal-desc' >
                <DialogContent
                    id='modal-desc'
                    className="max-h-[80vh] overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center my-5 capitalize text-primary gap-3">
                            <ArrowLeft onClick={handleClose} className="cursor-pointer" />
                            Edit
                        </DialogTitle>
                    </DialogHeader>
                    <DialogForm handleClose={handleClose} default_data={default_data} />  {/* Form Component */}
                </DialogContent>
            </Dialog>
        </div>
    )
}