"use client"

import * as React from "react"
import {
    flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import PaginatedItems from "@/components/helper/Pagination"
import UseSearchParamsHook from "@/hooks/UseSearchParamsHook"


export function DataTableDemo({ data = [], columns = [], itemsNumber }) {
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { searchParams, pathname, router } = UseSearchParamsHook()

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting, columnFilters, columnVisibility, rowSelection,
        },
    })

    const handlePageChange = (e) => {
        searchParams.size === 0 ? router.push(`${pathname}?page=${e.selected + 1}`)
            : searchParams.get('page') ? router.push(`${pathname}?page=${e.selected + 1}&search=${searchParams.get('search') || ""}${searchParams.get('active_link') ? "&active_link=" + searchParams.get('active_link') : ""}`)
                : router.push(`${pathname}?${searchParams.toString()}&page=${e.selected + 1}`)
    }

    return (
        <div className="w-full flex flex-col justify-between  rounded-md min-h-[calc(77vh)]">
            <div className="">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (<TableHead key={header.id} className='text-[#82817E] border-b '>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>)
                            })}
                        </TableRow>))}
                    </TableHeader>
                    <TableBody className="min-h-[500px]">
                        {
                            table?.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className='border-none'
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-[calc(72vh)] text-center text-[30px] font-mono "
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
            <PaginatedItems itemNumber={itemsNumber} onPageChange={handlePageChange} />
        </div>)
}