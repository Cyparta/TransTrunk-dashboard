import EditDriverForm from "@/components/forms/EditDriverForm";
import BreadCrumb from "@/components/helper/BreadCrumb";
import { GetDataInServerSide } from "@/lib/action";

export default async function EditDriver({ params }) {
  const Driver_data = await GetDataInServerSide(
    `/logistics/drivers/${params.driverID}`,
    {
      cache: "no-store",
    }
  );
  console.log(Driver_data);

  return (
    <main>
      <BreadCrumb href="/drivers" title="Edit driver" />
      <EditDriverForm defaultData={Driver_data}/>
    </main>
  );
}
