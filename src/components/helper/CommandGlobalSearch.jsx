'use client';

import { useEffect, useState } from "react";

import InputDemo from "@/components/helper/Input-demo";

import { Search } from "lucide-react";
import UseSearchParamsHook from "@/hooks/UseSearchParamsHook";


export default function CommandProductSearch() {
    const [search, setSearch] = useState("");
    const { router, searchParams, pathname } = UseSearchParamsHook();

    //  Effects for searching products
    useEffect(() => {
        const timer = setTimeout(async () => {
            handlePageChange();
        }, 1000);
        return () => clearTimeout(timer);
    }, [search]);

    // ---------- Global Function ----------------

    const handlePageChange = () => {
        searchParams.size === 0 ? router.push(`${pathname}?search=${search}`)
            : router.push(`${pathname}?page=${1}&search=${search}`)
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className="hidden md:flex items-center  rounded-md  relative w-full ">
            <InputDemo
                value={search}
                onChange={handleSearch}
                inputStyle="pl-8 bg-[#F5F6FA99] border"
                placeHolder="Search"

            />
            <Search className="absolute left-2 top-0 h-full flex items-center pr-2" color="#888073" />
        </div>)
};
