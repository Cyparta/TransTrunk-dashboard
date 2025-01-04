import { hasCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/header/Header";
import SideNav from "@/components/header/SideNav";
import NavBar from "@/components/header/NavBar";

export default function MainLayout({ children }) {
  if (!hasCookie("token", { cookies })) {
    redirect("/login");
  }

  return (
    <div className="bg-mainBg w-full">
      <NavBar />
      <section className="w-full p-4 gap-4  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
        <main className="2xl:col-span-1 hidden md:block relative w-full bg-white rounded-[40px] shadow-custom">
          <SideNav />
        </main>
        <main className="2xl:col-span-6 xl:col-span-4 lg:col-span-3 col-span-2 bg-white rounded-[40px] shadow-custom">
          <div className="px-1 md:px-8 my-6">{children}</div>
        </main>
      </section>
    </div>
  );
}
