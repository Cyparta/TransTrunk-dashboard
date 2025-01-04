'use server'
// export const dynamic = "force-dynamic";
import { GetDataInServerSide } from "@/lib/action";
import NoResultFound from "@/components/helper/NoResultFound";
import BarChart from "@/components/helper/BarChart";
import DonutChart from "@/components/helper/DonutsChart";

export default async function HomePage() {
  try {
    const Home_Data = await GetDataInServerSide("/logistics/statistics/", {
      cache: "no-store",
    });
    console.log(Home_Data);
    if (!Home_Data) {
      throw new Error("Invalid data structure");
    }
   
    return (
      <main className="flex flex-col  w-full">
        <p className="font-bold text-lg">Welcome back, </p>
        <p className="text-sm text-gray-100">
          Here is an overview for logistics operations
        </p>
        <div className="flex  justify-between h-[50vh]  my-3">
          <BarChart />
          <DonutChart />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <NoResultFound />;
  }
}
