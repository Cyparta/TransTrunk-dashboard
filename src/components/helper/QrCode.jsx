'use client';
import QRCode from "react-qr-code";
import {PRODUCTION_URL} from "@/lib/utils";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

export default function QrCodeDemo({ value = "", path }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    let scannedData = {};
    if (path === '/slaughtering') {
        scannedData = {
            // id: value.id,
            animal_code: value?.animal_details?.code,
            stock_location: value?.stock_details?.location,
            supplier_name: value?.animal_details?.supplier_data?.name,
            supplier_address: value?.animal_details?.supplier_data?.address,
            supplier_type: value?.animal_details?.supplier_data?.type,
            supplier_phone: value?.animal_details?.supplier_data?.phone,
            barn_location: value?.animal_details?.barn_data?.location,
            barn_capacity: value?.animal_details?.barn_data?.capacity,
            animal_count_in_barn: value?.animal_details?.barn_data?.animal_count,
            animal_type: value?.animal_details?.animal_type?.name,
            animal_name: value?.animal_details?.name,
            animal_weight: value?.animal_details?.weight,
            status: value?.animal_details?.status,
            place_of_slaughtering: value?.location,
            net_weight: value?.weight,
            slautering_price: value?.price,
            date_of_slaughtering: value?.date,
        }
    } else if (path === '/') {
        scannedData = {
            animal_code: value.code,
            supplier_name: value?.supplier_data?.name,
            supplier_address: value?.supplier_data?.address,
            supplier_type: value?.supplier_data?.type,
            supplier_phone: value?.supplier_data?.phone,
            barn_location: value?.barn_data?.location,
            barn_capacity: value?.barn_data?.capacity,
            animal_count_in_barn: value?.barn_data?.animal_count,
            animal_type: value?.animal_type?.name,
            animal_name: value?.name,
            animal_price: value?.price,
            animal_weight: value?.weight,
            animal_age: value?.age,
            arrival_date: value?.arrival_date,
            status: value?.status,
        }
    }else if(path === '/storage'){
        scannedData = {
            id: value.id,
            capacity: value.capacity,
            location: value.location,
            weight: value.quantity,
        }
    }
    function nestedObjectToString(obj, indent = 0) {
        let result = "";
        const indentSpace = "  ".repeat(indent);
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === "object" && obj[key] !== null) {
                    result += `${indentSpace}${key}:\n`;
                    result += nestedObjectToString(obj[key], indent + 1);
                } else {
                    result += `${indentSpace}${key}: ${obj[key]}\n`;
                }
            }
        }

        return result;
    }
    // Generate the QR code value based on the condition
    const qrValue =
    path === "/barns"
      ? `${PRODUCTION_URL}/barns/${value.id}?redirectPage=/barns/${value.id}`
      : path === "/slaughtering"
      ? nestedObjectToString(scannedData)
      : path === "/storage"
      ? nestedObjectToString(scannedData)
      : nestedObjectToString(scannedData);
    return (
        <div className="flex items-center gap-2">
            <Button onClick={handleOpen} className="bg-inherit text-primary capitalize flex items-center gap-2 font-light">
                <QrCode size={20} />
            </Button>
            <Dialog open={open} onOpenChange={setOpen} aria-describedby='modal-desc' >
                <DialogContent
                    id='modal-desc'
                    className="max-h-[80vh] overflow-auto bg-white">
                    <DialogHeader>
                        <DialogTitle className='text-center text-primary'>Scan QR Code</DialogTitle>
                    </DialogHeader>
                    <div style={{ height: "auto", margin: "0 auto", maxWidth: 180, width: "100%", marginTop: 30, marginBottom: 30 }}>
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={qrValue}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
