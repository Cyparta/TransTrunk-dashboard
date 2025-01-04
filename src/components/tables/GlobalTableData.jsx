'use client';

import { DataTableDemo } from "@/components/helper/TableDemo";
import DeleteRow from "@/components/tables/DeleteRow";
import EditTableDemo from "@/components/forms/EditTableDemo";
import QrCodeDemo from "@/components/helper/QrCode";

import Link from "next/link";
import { EllipsisVertical, Eye, Pencil } from "lucide-react";
import ShowDetailsTableDemo from "../forms/ShowTableDemo";

export default function GlobalTableData({ row_data = [], column_data = [],style, Show_Row_Form, row_count,edit=true, Edit_Row_Form, hidden_actions = false ,details=true,Edit_path}) {
    // console.log("path", path);
    const columns = hidden_actions ? [
        ...column_data,
    ] : [
        ...column_data,
        !hidden_actions && {
            id: "actions",
            enableHiding: true,
            header: '',
            cell: ({ row }) => {
                // console.log("row", row.original);
                return (
                    <div className="flex items-center  gap-3">
                        {edit&&<Link href={`${Edit_path}/${row.getValue("id")}`}><Pencil size={16} color={"#467DB2"} /></Link>}
                        {details && <ShowDetailsTableDemo style={style} Show_Row_Form={Show_Row_Form} default_data={row.original} icon={<EllipsisVertical  size={16}/>}/>}
                        
                    </div>
                )
            },
        },

    ];

return (
    <div className="w-full">
        {/* Table Data */}
        <DataTableDemo
            data={row_data}
            columns={columns}
            id="myTable"
            itemsNumber={row_count}
        />
    </div>
)
};