import EditVehiclesForm from "@/components/forms/EditVehicles";
import BreadCrumb from "@/components/helper/BreadCrumb";
import { GetDataInServerSide } from "@/lib/action";

export default async function EditVechiles({ params }) {
  const Vechile_data = await GetDataInServerSide(
    `/logistics/vehicles/${params.vechilesID}`,
    {
      cache: "no-store",
    }
  );
  console.log(Vechile_data);

  return (
    <main>
      <BreadCrumb href="/vehicles" title="Edit vehicle" />
      <EditVehiclesForm defaultData={Vechile_data}/>
    </main>
  );
}
