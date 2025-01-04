import { GetDataInServerSide } from "@/lib/action";
import CommandProductSearch from "@/components/helper/CommandGlobalSearch";
import NoResultFound from "@/components/helper/NoResultFound";
import AddNew from "@/components/forms/AddNew";
import VechilesTable from "@/components/tables/VechilesTable";

export default async function VechilesPage({ searchParams }) {
  const Vechiles_data = await GetDataInServerSide(`/logistics/vehicles/?page=${searchParams?.page ||1 }&search=${searchParams.search || ""}`, {
    cache: "no-store",
  });
  console.log(Vechiles_data); 
  return (
    <main className="flex flex-col gap-5 w-full">
      {/* Search and Add New */}
      <div className="flex flex-col md:flex-row items-center gap-5">
        <CommandProductSearch />
        <AddNew path={"/vehicles/AddVechiles"}/>
      </div>
      {Vechiles_data?.count === 0 ? (
        <NoResultFound />
      ) : (
        <VechilesTable row_data={Vechiles_data} />
      )}
    </main>
  );
}
