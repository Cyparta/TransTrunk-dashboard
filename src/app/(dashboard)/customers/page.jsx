import AddNew from '@/components/forms/AddNew';
import CommandProductSearch from '@/components/helper/CommandGlobalSearch';
import NoResultFound from '@/components/helper/NoResultFound';
import CustomerTable from '@/components/tables/CustomerTable';
import { GetDataInServerSide } from '@/lib/action';
import React from 'react'

export default async function CustomerPage({searchParams}) {
    const Customer_data = await GetDataInServerSide(`/logistics/clients/?page=${searchParams?.page ||1 }&search=${searchParams.search || ""}`, {
        cache: "no-store",
      });
      console.log(Customer_data);
  return (
    <main className="flex flex-col gap-5 w-full">
      {/* Search and Add New */}
      <div className="flex flex-col md:flex-row items-center gap-5">
        <CommandProductSearch />
        <AddNew path={"/customers/AddCustomer"}/>
      </div>
      {Customer_data?.count === 0 ? (
        <NoResultFound />
      ) : (
        <CustomerTable row_data={Customer_data} />
      )}
    </main>
  )
}
