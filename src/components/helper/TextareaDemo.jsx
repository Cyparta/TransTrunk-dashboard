import React from 'react'
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

export default function TextareaDemo({ label,value, id, placeholder, style,onChange ,error,disabled,...props }) {
    return (
        <div className={`grid grid-cols-1 w-full items-center `}>
            {label && (
                <Label
                    htmlFor={id}
                    className={`text-[14px] font-medium  cursor-pointer w-fit  ${error ? "text-red-800" : "text-primary"
                        }`}
                >
                    {label}
                </Label>
            )}
            <div className="w-full flex-1">
                <Textarea
                    id={id}
                    className={`  ${
                        error ? "border border-red-800" : "border border-secondary-foreground"
                        } focus-visible:ring-0 focus-visible:ring-offset-0  ${
                        disabled && "bg-secondary"
                        } ${style}`}
                    placeholder={placeholder}
                    onChange={onChange}
                    name={id}
                    value={value}
                    {...props}
                />
            </div>
        </div>
    )
}
