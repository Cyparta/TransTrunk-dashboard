import { GetDataInServerSide } from "@/lib/action";
import CommandProductSearch from "@/components/helper/CommandGlobalSearch";
import NoResultFound from "@/components/helper/NoResultFound";
import AddNew from "@/components/forms/AddNew";
import DriverTable from "@/components/tables/DriverTable";

export default async function DriversPage({ searchParams }) {
  const Drivers_data = await GetDataInServerSide(`/logistics/drivers/?page=${searchParams?.page ||1 }&search=${searchParams.search || ""}`, {
    cache: "no-store",
  });
  // console.log(Drivers_data); 
  return (
    <main className="flex flex-col gap-5 w-full">
      {/* Search and Add New */}
      <div className="flex flex-col md:flex-row items-center gap-5">
        <CommandProductSearch />
        <AddNew path={"/drivers/AddDrivers"}/>
      </div>
      {Drivers_data?.count === 0 ? (
        <NoResultFound />
      ) : (
        <DriverTable row_data={Drivers_data} />
      )}
    </main>
  );
}
