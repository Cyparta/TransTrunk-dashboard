import AddNew from '@/components/forms/AddNew';
import CommandProductSearch from '@/components/helper/CommandGlobalSearch';
import NoResultFound from '@/components/helper/NoResultFound';
import DriverTable from '@/components/tables/DriverTable';
import { GetDataInServerSide } from '@/lib/action';
import React from 'react'

export default async function ShippingPage({searchParams}) {
    const Shipping_data = await GetDataInServerSide(`/logistics/shipping_bills/?page=${searchParams?.page ||1 }&search=${searchParams.search || ""}`, {
        cache: "no-store",
      });
      console.log(Shipping_data);
  return (
    <main className="flex flex-col gap-5 w-full">
      {/* Search and Add New */}
      <div className="flex flex-col md:flex-row items-center gap-5">
        <CommandProductSearch />
        <AddNew path={"/shipping/AddShipping"}/>
      </div>
      {Shipping_data?.count === 0 || Shipping_data?.length ===0 ? (
        <NoResultFound />
      ) : (
        <DriverTable row_data={Shipping_data} />
      )}
    </main>
  )
}
