'use client'
import BreadCrumb from "@/components/helper/BreadCrumb";
import SuccessPage from "@/components/helper/success";
import { GetDataInServerSide } from "@/lib/action";
import { AssignDriver } from "@/lib/actions/vechilesAction";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AssignDriverPage({ params }) {
    const [driver_data, setDriverData] = useState();
    const [assigned, setAssign] = useState(false);

    useEffect(() => {
        const fetchDriverData = async () => {
            const res = await GetDataInServerSide(`/logistics/drivers/`, {
                cache: "no-store",
            });
            setDriverData(res);
        };
        fetchDriverData();
    }, []);

    const handleAssign = async (id) => {
        const body = { driver_id: id };

        await AssignDriver(body, params.vechilesID)
            .then((response) => {
                if (response?.error) {
                    toast.error(response?.error);
                } else if (response?.success) {
                    toast.success(response?.success);
                    setAssign(true)
                }
            })
            .catch((error) => {
                toast.error(error?.message || error);
            });
    };

    return (
      <>
        {assigned?
        <SuccessPage message={"Drivers has been assigned to vehicle successfully"} href={'/vehicles'}/>:
        <main>
        <BreadCrumb href="/vehicles" title="Assign driver" />
        {/* <div className="grid grid-cols-3 gap-4"> */}
            {driver_data?.results.map((driver) => (
                <div
                    key={driver?.id}
                    className="grid grid-cols-3 justify-between my-5 border-b gap-y-4"
                >
                    <p>{driver?.national_id}</p>
                    <p>{driver?.name ||"Driver Name"}</p>
                    <button
                        onClick={() => handleAssign(driver?.id)}
                        className={`font-semibold text-primary underline`}
                    >
                        Assign
                    </button>
                </div>
            ))}
        {/* </div> */}
    </main>}
      </>
        
    );
}
