import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupInputs({ inputs_details, choiceDefaultValue = [], handleChange }) {

    let choices_ids = choiceDefaultValue.map((item) => item?.id)
    let defaultChecked = inputs_details?.extras?.find((item) => choices_ids?.includes(item?.id))

    return (
        <RadioGroup onValueChange={handleChange} defaultValue={defaultChecked?.id} >
            <p className="text-xl font-medium mb-2 ">{inputs_details?.title}</p>
            {
                inputs_details?.extras?.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2" >
                        <RadioGroupItem value={item?.id} id={item?.id} />
                        <Label htmlFor={item?.id}>{item?.title} {`($${item?.price})`}</Label>
                    </div>
                ))
            }
        </RadioGroup>
    )
}
