'use client';

import { useFormStatus } from "react-dom";


import { Button } from "@/components/ui/button";

import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";


export default function FormSubmittingButton({ name, type = 'submit', loading = false, style = '' }) {
    const { pending } = useFormStatus();
    return (
        <Button type={type} className={cn("my-5 px-12 text-lg font-medium rounded-lg text-white text-[16px] bg-primary ", style)} disabled={pending || loading}>
            {(pending || loading) ? <LoaderCircle className="animate-spin" size={25} /> : name}
        </Button >
    );
}