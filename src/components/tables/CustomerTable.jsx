"use client";
import GlobalTableData from "@/components/tables/GlobalTableData";
import { CustomersTableColumns} from "@/lib/constant-data";
import ShowDetailsDriver from "../showDetails/ShowDriverDetails";
import ShowCustomerDriver from "../showDetails/ShowCustomerDetails";

export default function CustomerTable({ row_data }) {
  return (
    <article className="flex flex-col gap-5 min-h-[calc(77vh)] border rounded-[20px]">
      <GlobalTableData
        row_count={row_data?.count}
        row_data={row_data?.results}
        column_data={CustomersTableColumns}
        path="/customers"
        end_point="/logistics/clients/"
        Edit_path={'/customers/editCustomer'}
        Show_Row_Form={ShowCustomerDriver}
        style={"max-w-[753px]"}
      />
    </article>
  );
}
