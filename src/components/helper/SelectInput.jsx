'use client';

import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export function SelectDemo({ id, placeholder, selectValue = "", selectItem = [], defaultValue, value, onChange , style }) {
    return (
            <Select
                defaultValue={defaultValue}
                onValueChange={onChange}
                value={value}
                name={id}
                className={`focus-visible:ring-accent focus-visible:ring-offset-accent focus-visible:ring-1 focus-visible:ring-offset-0 ${style}`}>
                <SelectTrigger
                    id={id}
                    className="w-full  focus-visible:ring-accent focus-visible:ring-offset-accent rounded-[70px] border border-input"
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="focus-visible:ring-accent focus-visible:ring-offset-accent">
                    <SelectGroup>
                        <SelectLabel>{selectValue}</SelectLabel>
                        {
                            selectItem.map((item, index) => {
                                return <SelectItem key={index} value={item} name={id} className="cursor-pointer">{item}</SelectItem>
                            })
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
    )
}
