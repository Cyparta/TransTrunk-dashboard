'use client'

import { Button } from "@/components/ui/button"

// Error components must be Client Components
export default function Error({ error, reset }) {

    return (
        <section className="flex items-center justify-center gap-5 flex-col min-h-[60vh]" >
            <h2 className="text-[35px] font-mono text-primary px-8 md:px-0">OOPS  {error?.message}!</h2>
            <Button
                className=" hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </section>
    )
}