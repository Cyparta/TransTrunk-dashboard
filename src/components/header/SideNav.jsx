import Image from "next/image";
import { Suspense } from "react";

import { NavItems } from "@/lib/constant-data";

import NavLink from "@/components/header/NavLink";
import { Plus } from "lucide-react";

const SideNav = () => {
    return (
        <nav className="sticky top-0 left-0 h-screen  w-full max-w-full  flex flex-col  ">
            
            {/*  ###### Nav #####     
                @issue Missing Suspense boundary with useSearchParams
                @solution Wrap the component with Suspense Or Use experimental: {missingSuspenseWithCSRBailout: false,}, inside the next.config.js file
            */}
            <Suspense fallback={<div>Loading...</div>}>
                <main className="h-[calc(100%-200px)] overflow-auto px-4 py-[12px] w-full flex flex-col">
                {NavItems?.map((item) => (
                <>
                  <NavLink data={item} key={item.id} />
                </>
              ))}
                </main>
            </Suspense>
        </nav>
    );
};

export default SideNav;