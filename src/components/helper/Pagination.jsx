
'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPaginate from 'react-paginate';

export default function PaginatedItems({ itemNumber = 0, onPageChange = () => { } }) {

    const pageCount = Math.ceil(Number(itemNumber) / 10);

    if (pageCount < 1) {
        return null;
    }

    return (
        <ReactPaginate
            previousLabel={<ChevronLeft color='#467DB2'/>}
            nextLabel={<ChevronRight color='#467DB2' />}
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={onPageChange}
            containerClassName="flex justify-end items-center mt-1 px-4 h-[50px]"
            pageClassName="mx-1  p-1 px-3 hover:bg-primary hover:text-white rounded-lg Transition cursor-pointer "
            activeClassName=" font-bold  rounded-lg p-1 px-3 text-primary"
            previousClassName="text-2xl"
            nextClassName="text-2xl"
            breakClassName="text-[#467DB2] "
            disabledClassName="opacity-50"
        />
    );
}