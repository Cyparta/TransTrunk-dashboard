import Image from "next/image";
import { cn } from "./utils";
import DescriptionCell from "@/components/ui/discreptionCell";
import Link from "next/link";
import { act } from "react";
import { Car, ClipboardList, CreditCard, Home, UserRound} from "lucide-react";

let NavItems = [
  {
    id: 0,
    title: "Home",
    icon:<Home />,
    path: "/",
    active: "",
  },
  {
    id:1,
    title: "Vehicles",
    icon:<Car />,
    path: "/vehicles",
    active: "vehicles",
  },
  {
    id: 2,
    title: "Drivers",
    icon:<CreditCard />,
    path: "/drivers",
    active: "drivers",
  },
  {
    id: 3,
    title: "Shipping bills",
    icon:<ClipboardList />,
    path: "/shipping",
    active: "shipping",
  },
  {
    id: 4,
    title: "Customers",
    icon:<UserRound />,
    path: "/customers",
    active: "customers",
  },
];



let VehiclesTableColumns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <p>{row.getValue("id")}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p>{row.getValue("name")||'--'}</p>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <p>{row.getValue("category") || '--'}</p>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <p>{row.getValue("type") || '--'}</p>,
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => <p>{row.getValue("capacity") || '--'}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.status;
      return <p className={`${isActive=="available"?'text-[#4CAF50] bg-[#4CAF5066]':"text-[#467DB2] bg-[#467DB266]"} px-[20px] py-[8px] max-w-[90px] text-sm rounded-[7px]`}>{isActive}</p>;
    },
  }
];
let DriversTableColumns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <p>{row.getValue("id")}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p>{row.getValue("name")||'--'}</p>,
  },
  {
    accessorKey: "phone_number",
    header: "Phone number",
    cell: ({ row }) => <p>{row.getValue("phone_number") || '--'}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.status;
      return <p className={`${isActive=="available"?'text-[#4CAF50] bg-[#4CAF5066]':"text-[#467DB2] bg-[#467DB266]"} px-[20px] py-[8px] max-w-[90px] text-sm rounded-[7px]`}>{isActive}</p>;
    },
  }
];
let CustomersTableColumns = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <p>{row.getValue("id")}</p>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <p>{row.getValue("name")||'--'}</p>,
  },
  {
    accessorKey: "contact_number",
    header: "Phone number",
    cell: ({ row }) => <p>{row.getValue("contact_number") || '--'}</p>,
  },
  {
    accessorKey: "num_shipments",
    header: "Shipments",
    cell: ({ row }) => <p>{row.getValue("num_shipments") }</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.status;
      return <p className={`${isActive=="active"?'text-[#4CAF50] bg-[#4CAF5066]':"text-[#F14C4C] bg-[#F14C4C66]"} px-[20px] py-[8px] max-w-[90px] text-sm rounded-[7px]`}>{isActive}</p>;
    },
  }
];
export {
  NavItems,
  VehiclesTableColumns,
  DriversTableColumns,
  CustomersTableColumns
};
