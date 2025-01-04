"use client";
import GlobalTableData from "@/components/tables/GlobalTableData";
import { VehiclesTableColumns} from "@/lib/constant-data";
import ShowDetailsVechiles from "../showDetails/ShowVechilesDetails";

export default function VechilesTable({ row_data }) {
  return (
    <article className="flex flex-col gap-5 min-h-[calc(77vh)] border rounded-[20px]">
      <GlobalTableData
        row_count={row_data?.count}
        row_data={row_data?.results}
        column_data={VehiclesTableColumns}
        path="/vehicles"
        end_point="/logistics/vehicles/"
        Edit_path={'/vehicles/editVechiles'}
        Show_Row_Form={ShowDetailsVechiles}
        style={" max-w-4xl"}
      />
    </article>
  );
}
