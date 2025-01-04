"use client";
import GlobalTableData from "@/components/tables/GlobalTableData";
import { DriversTableColumns} from "@/lib/constant-data";
import ShowDetailsDriver from "../showDetails/ShowDriverDetails";

export default function DriverTable({ row_data }) {
  return (
    <article className="flex flex-col gap-5 min-h-[calc(77vh)] border rounded-[20px]">
      <GlobalTableData
        row_count={row_data?.count}
        row_data={row_data?.results}
        column_data={DriversTableColumns}
        path="/drivers"
        end_point="/logistics/drivers/"
        Edit_path={'/drivers/editDriver'}
        Show_Row_Form={ShowDetailsDriver}
        style={"max-w-[654px]"}
      />
    </article>
  );
}
