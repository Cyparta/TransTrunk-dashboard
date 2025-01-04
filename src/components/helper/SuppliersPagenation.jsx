'use client';
import React from 'react'
import UseSearchParamsHook from "@/hooks/UseSearchParamsHook"
import PaginatedItems from "@/components/helper/Pagination"

export default function SuppliersPagenation({itemNumber}) {
    const { searchParams, pathname, router } = UseSearchParamsHook()

    const handlePageChange = (e) => {
        searchParams.size === 0 ? router.push(`${pathname}?page=${e.selected + 1}`)
            : searchParams.get('page') ? router.push(`${pathname}?page=${e.selected + 1}&search=${searchParams.get('search') || ""}${searchParams.get('active_link') ? "&active_link=" + searchParams.get('active_link') : ""}`)
                : router.push(`${pathname}?${searchParams.toString()}&page=${e.selected + 1}`)
    }
    return (
        <div>
            <PaginatedItems itemNumber={itemNumber} onPageChange={handlePageChange} />

        </div>
    )
}
