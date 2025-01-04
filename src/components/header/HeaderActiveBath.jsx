"use client";

import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HeaderActiveBath() {
  const { pathname, searchParams } = UseSearchParamsHook();

  let active_link =
    searchParams.get("active_link") || pathname.split("/")[1] || "Animals";

  if (active_link === "sales" || pathname.split("/")[2] === "customers") {
    return (
      <div className=" hidden md:flex items-center gap-8">
        <Link href="/sales" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] !== "customers" ? "text-primary" : "text-gray-300"
            )}
          >
            Invoice
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] !== "customers" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
        <Link href="/sales/customers" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] === "customers" ? "text-primary" : "text-gray-300"
            )}
          >
            Customers
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] === "customers" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
      </div>
    );
  }
  // console.log(active_link, "active_link");
  // console.log(pathname, "pathname");
  if (active_link === "products" || pathname.split("/")[2] === "orders") {
    return (
      <div className=" hidden md:flex items-center gap-8">
        <Link href="/products" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] !== "orders" ? "text-primary" : "text-gray-300"
            )}
          >
            Products
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] !== "orders" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
        <Link href="/products/orders" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] === "orders" ? "text-primary" : "text-gray-300"
            )}
          >
            Orders
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] === "orders" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
      </div>
    );
  }
  if (active_link === "employees" || pathname.split("/")[2] === "tasks" || pathname.split("/")[2] === "attendance") {
    return (
      <div className="hidden md:flex items-center gap-8">
        <Link href="/employees" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] !== "tasks" && pathname.split("/")[2] !== "attendance"
                ? "text-primary"
                : "text-gray-300"
            )}
          >
            Employees
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] !== "tasks" && pathname.split("/")[2] !== "attendance"
                ? "bg-primary"
                : "bg-gray-300"
            )}
          ></p>
        </Link>
  
        <Link href="/employees/tasks" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] === "tasks" ? "text-primary" : "text-gray-300"
            )}
          >
            Tasks
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] === "tasks" ? "bg-primary" : "bg-gray-300"
)}
          ></p>
        </Link>
  
        <Link href="/employees/attendance" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] === "attendance" ? "text-primary" : "text-gray-300"
            )}
          >
            Attendance
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] === "attendance" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
      </div>
    );
  }
  if (active_link === "drivers" || pathname.split("/")[2] === "vehicles") {
    return (
      <div className=" hidden md:flex items-center gap-8">
        <Link href="/drivers" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] !== "vehicles" ? "text-primary" : "text-gray-300"
            )}
          >
            Drivers
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] !== "vehicles" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
        <Link href="/drivers/vehicles" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] === "vehicles" ? "text-primary" : "text-gray-300"
            )}
          >
            Vehicles
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] === "vehicles" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
      </div>
    );
  }
  if (active_link === "food" || pathname.split("/")[2] === "warehouse") {
    return (
      <div className=" hidden md:flex items-center gap-8">
        <Link href="/food" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] !== "warehouse" ? "text-primary" : "text-gray-300"
            )}
          >
            Food
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] !== "warehouse" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
        <Link href="/food/warehouse" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] === "warehouse" ? "text-primary" : "text-gray-300"
            )}
          >
            Warehouse
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] === "vehicles" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
      </div>
    );
  }
  if (active_link === "Animals" || pathname.split("/")[2] === "barns" || pathname.split("/")[2] === "slaughtering" || pathname.split("/")[2] === "storage") {
    return (
      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] !== "barns" && pathname.split("/")[2] !== "slaughtering" && pathname.split("/")[2] !== "storage"
                ? "text-primary"
                : "text-gray-300"
            )}
          >
            Animals
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] !== "barns" && pathname.split("/")[2] !== "slaughtering" && pathname.split("/")[2] !== "storage"
                ? "bg-primary"
                : "bg-gray-300"
            )}
          ></p>
        </Link>
  
        <Link href="/animals/barns" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] === "barns" ? "text-primary" : "text-gray-300"
            )}
          >
            Barns
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] === "barns" ? "bg-primary" : "bg-gray-300"
)}
          ></p>
        </Link>
  
        <Link href="/animals/slaughtering" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] === "slaughtering" ? "text-primary" : "text-gray-300"
            )}
          >
            Slaughtering
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] === "slaughtering" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
        <Link href="/animals/storage" className="relative">
          <p
            className={cn(
              "text-[16px] capitalize font-semibold",
              pathname.split("/")[2] === "storage" ? "text-primary" : "text-gray-300"
            )}
          >
            Storage
          </p>
          <p
            className={cn(
              "absolute -left-0 -bottom-6 w-[110%] h-[3px] rounded-lg",
              pathname.split("/")[2] === "storage" ? "bg-primary" : "bg-gray-300"
            )}
          ></p>
        </Link>
      </div>
    );
  }
  return (
    <div className="relative hidden md:block">
      <p className="text-[16px] font-semibold text-primary capitalize">
        {active_link}
      </p>
      <p className="absolute -left-0 -bottom-6 w-[110%] h-[3px] bg-primary rounded-lg"></p>
    </div>
  );
}
