'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react';


export default function UseSearchParamsHook() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name, value) => {
            const params = new URLSearchParams(searchParams.toString())
            
            params.set(name, value)
            const NewPath = pathname + '?' + params.toString()
            return NewPath
        },
        [searchParams]
    )

    return { pathname, searchParams, router, createQueryString }
}