import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function BreadCrumb({href, title}) {
  return (
    <div className='flex gap-2'>
        <Link href={href}><ChevronLeft size={20} /></Link>
        <p className='text-sm font-medium text-[#212121]'>{title}</p>
    </div>
  )
}
