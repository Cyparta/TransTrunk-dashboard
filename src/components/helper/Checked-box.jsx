'use client';

import { useState, useCallback } from 'react';

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label';

export default function CheckedBoxDemo({ id, inputs_details, handleChange, choicesIds = [] }) {
    let choices_ids = choicesIds.map((item) => item?.id)
    let defaultChecked = choices_ids?.includes(id)

    const [checked, setChecked] = useState(defaultChecked || false)
    //------------- Global Functions ---------------
    const handleChecked = useCallback((e) => {
        handleChange(id, e)
        setChecked(!checked)
        // Call parent function to update the state of the checkbox group
    }, [checked])

    return (
        <div className="flex items-center space-x-2" >
            <Checkbox id={id} checked={checked} onCheckedChange={handleChecked} />
            <Label htmlFor={id}>{inputs_details?.title} {`($${inputs_details?.price})`}</Label>
        </div>
    )
}
