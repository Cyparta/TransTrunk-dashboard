import Image from 'next/image'
import { hasCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AuthLayout({ children }) {

    if (hasCookie('token', { cookies })) {
        redirect('/')
    }

    return (
        <main className="flex flex-col h-screen w-full gap-8 bg-mainBg">
            <div className=' px-10 flex items-center py-4 shadow-custom bg-white'>
                <Image src='/logo.png' alt='logo' width={142} height={70} />
            </div>
            {children}
        </main>
    )
}