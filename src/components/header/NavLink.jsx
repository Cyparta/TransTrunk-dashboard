"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

function NavLink({ data }) {
  const pathname = usePathname();
  // Function to return the first part of the path (after the base URL)
  function FilterBath(numberOfRoutes = 1) {
    return pathname.split("/")[numberOfRoutes];
  }

  // Check if the current page matches the item's path
  function isActive(path) {
    path = path.split("/")[1]
    return FilterBath() === path;
  }

  // Check if the parent item is active (for items with children)
  function isParentActive(path) {
    return FilterBath() === path// check if the current path starts with the parent's path
  }  

  if (data?.children && data?.children?.length > 0) {
    return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-0 px-0 py-0">
          <AccordionTrigger
             className={`text-sm font-normal ${
              isParentActive(data.active) ? "border-l-[6px] border-l-primary rounded-tr-[10px]" : "hover:border-l-[6px] hover:border-l-primary"
            } rounded-br-[10px] h-[60px] flex items-center hover:no-underline`}
          >
            <p
              className={`h-[46px] ${
                isParentActive(data.active) ? "bg-primary text-[#fff]" : "hover:bg-primary hover:text-[#fff] text-gray-400"
              } ml-4 pl-2 flex items-center gap-1 w-full rounded-sm text-sm`}
            >
              {data?.icon}
              {data?.title}
            </p>
          </AccordionTrigger>
          <AccordionContent>
            {data?.children.map((item) => (
              <Link key={item?.title} href={item?.path}>
                <div className="h-[60px] flex items-center">
                  <p
                    className={`h-[42px] ${
                      isActive(item?.path) ? "bg-primary text-[#fff]" : "hover:bg-primary hover:text-[#fff]"
                    } ml-8 pl-6 flex items-center w-full rounded`}
                  >
                    {item?.title}
                  </p>
                </div>
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  } else {
    return (
      data?.path && (
        <Link key={data?.path} href={data?.path} className="no-underline">
          <div
            className={`w-full ${
              isActive(data?.path)
                ? " h-[60px] flex items-center text-base"
                : " rounded-br-xl h-[60px] flex items-center text-base"
            }`}
          >
            <p
              className={`h-[46px] w-full text-[17px] font-medium pl-3 ${
                isActive(data?.path)
                  ? "flex gap-[10px]  bg-primary text-[#fff] rounded-[70px] w-full items-center"
                  : "flex items-center rounded-[70px] gap-[10px] text-gray-200  text-gray-400 hover:bg-primary hover:text-[#fff]"
              }`}
            >
              {data?.icon} {data?.title}
            </p>
          </div>
        </Link>
      )
    );
  }
}

export default NavLink;
