'use client';

import { useState } from "react";
import Image from "next/image";

import { handleDeleteRow } from "@/lib/action";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import FormSubmittingButton from "@/components/forms/FormSubmittingButton";
import { toast } from "sonner";


export default function DeleteRow({ text, id, end_point, path, icon = null }) {
    const [open, setOpen] = useState(false);

    //------------- Global Functions ---------------
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        // Your delete logic here
        await handleDeleteRow(end_point, id, path).then((res) => {
            toast.success("Record deleted successfully");
            
            // if (res.success) {
            //     toast.success(res.success);
            // } else {
            //     toast.error(res.error);
            // }
            handleClose();
        }).catch((err) => {
            toast.error(err?.message);
            handleClose();
        });
    }

    return (
        <div className="flex items-center gap-2">
            {
                icon ? <Button onClick={handleOpen} className="bg-inherit text-primary capitalize flex items-center gap-2 font-light">
                    {icon}
                </Button> : <Button type="button" onClick={handleOpen} className="bg-[#CDCBC6] text-[#646464] py-2 px-4 capitalize flex items-center gap-4  font-light hover:bg-[#CDCBC6]">
                    {text}
                </Button>
            }
            <Dialog open={open} onOpenChange={setOpen} aria-describedby='modal-desc' >
                <DialogContent
                    id='modal-desc'
                    className="max-h-[80vh] max-w-80 overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                    <form
                        action={handleDelete}
                        className="flex justify-center items-center gap-4 flex-col">
                        <h1 className="text-[20px] font-medium">Delete Record</h1>
                        <h2 className="text-[#646464] text-lg text-center">Are you sure you need to delete the record ?</h2>
                        <div className="flex gap-4 my-4">
                            <FormSubmittingButton name='Delete' style='m-0 px-4 bg-primary font-light hover:bg-primary' />
                            <Button onClick={handleClose} type='button' className="bg-gray-200  text-black capitalize flex items-center gap-2  font-light hover:bg-gray-200">
                                Discard
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}