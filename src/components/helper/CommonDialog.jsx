
'use client';

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";

import { ArrowLeft, Download, ListFilter, Plus } from "lucide-react";
import { toast } from "sonner";
import { SlidersHorizontal } from "lucide";

export default function CommonDialog({ text, filter = false, FilterForm, DialogForm, importReport = true, show_add_button = true, row_data = [] }) {
    const [open, setOpen] = useState(false);
    const [formType, setFormType] = useState(null); // State to track which form to show

    //------------- Global Functions ---------------
    const handleOpen = (type) => {
        setFormType(type);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setFormType(null);
    };

    // ---------------- Print excel Sheet File ----------------------
    const downloadCSV = (row_data) => {
        if (!row_data || row_data.length === 0) {
            toast.error("No data available to download");
            return;
        }

        const headers = Object.keys(row_data[0]).join(',') + '\n';
        const rows = row_data.map(row => Object.values(row).join(',')).join('\n');
        const csvData = headers + rows;
        const blob = new Blob([csvData], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'table_data.csv';
        link.click();
    };

    return (
        <div className="flex items-center gap-2">
            {importReport && (
                <Button className="bg-custom-gradient text-white capitalize flex items-center gap-2 font-light" onClick={() => downloadCSV(row_data)}>
                    Report
                    <Download color="#ffff" size={20} />
                </Button>
            )}
            {filter && (
                <Button onClick={() => handleOpen('filter')} className="border-2 border-primary bg-white text-primary capitalize flex items-center gap-2 font-semibold">
                    Filter
                    <SlidersHorizontal color="#467db2" size={20} />
                </Button>
            )}
            {show_add_button && (
                <Button onClick={() => handleOpen('add')} className="bg-primary text-white capitalize flex items-center gap-2 font-semibold">
                    {text}
                    <Plus color="#ffff" size={20} />
                </Button>
            )}
            <Dialog open={open} onOpenChange={setOpen} aria-describedby='modal-desc'>
                <DialogContent
                    id='modal-desc'
                    className="max-h-[80vh] overflow-y-auto bg-white">
                    <DialogHeader>
                        <DialogTitle className="flex items-center my-5 capitalize text-primary gap-3">
                            <ArrowLeft onClick={handleClose} className="cursor-pointer" />
                           {formType === 'add'? text:'Filter'} 
                        </DialogTitle>
                    </DialogHeader>
                    {formType === 'add' && DialogForm && <DialogForm handleClose={handleClose} />}
                    {formType === 'filter' && FilterForm && <FilterForm handleClose={handleClose} />}
                </DialogContent>
            </Dialog>
        </div>
    )
}
