import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"

export function InputOTPDemo({ error, id }) {
    return (
        <div className="">
            <div
                className={`w-full flex justify-center`}>
                <InputOTP
                    name={id}
                    maxLength={6}
                >
                    <InputOTPGroup >
                        <InputOTPSlot className={cn('w-12 mx-1 md:mx-2 lg:mx-3 border rounded-md ', error ? 'border-red-500':'border-black')}  index={0} />
                        <InputOTPSlot className={cn('w-12 mx-1 md:mx-2 lg:mx-3 border rounded-md ', error ? 'border-red-500':'border-black')} index={1} />
                        <InputOTPSlot className={cn('w-12 mx-1 md:mx-2 lg:mx-3 border rounded-md ', error ? 'border-red-500':'border-black')} index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                        <InputOTPSlot className={cn('w-12 mx-1 md:mx-2 lg:mx-3 border rounded-md ', error ? 'border-red-500':'border-black')} index={3} />
                        <InputOTPSlot className={cn('w-12 mx-1 md:mx-2 lg:mx-3 border rounded-md ', error ? 'border-red-500':'border-black')} index={4} />
                        <InputOTPSlot className={cn('w-12 mx-1 md:mx-2 lg:mx-3 border rounded-md ', error ? 'border-red-500':'border-black')} index={5} />
                    </InputOTPGroup>
                </InputOTP>

            </div>
            {
                error &&
                <p className="text-red-500 text-sm pt-1 m-0 text-center mt-4">{error}</p>
            }
        </div>
    )
}