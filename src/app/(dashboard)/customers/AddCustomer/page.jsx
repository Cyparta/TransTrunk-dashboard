"use client";
import FormSubmittingButton from "@/components/forms/FormSubmittingButton";
import BreadCrumb from "@/components/helper/BreadCrumb";
import InputDemo from "@/components/helper/Input-demo";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";
const LocationPicker = dynamic(() => import('@/components/helper/Map'), { ssr: false });
import { handleAddCustomer } from "@/lib/actions/CustomerAction";

export default function AddCustomer() {
  const [phoneValue, setPhoneValue] = useState("");
  const [address, setAddress] = useState("");
  const [state, formAction] = useFormState(handleAddCustomer, {
    name: "",
    contact_number: "",
    address: "",
  });
  function handleAddress(e){
    const match = e.match(/POINT \(([\d.-]+) ([\d.-]+)\)/);
    const address={type: "Point",coordinates:[`${match[1]}`,`${match[2]}`]}
    console.log(address)
    setAddress(address)
  }
  useEffect(() => {
    console.log(state);
    state?.error && toast.error(state.error || state.error);
    if (state?.success) {
      toast.success(state.success);
    }
  }, [state]);

  return (
    <main>
      <BreadCrumb href="/customers" title="Add customer" />
      <form className="my-6" action={formAction}>
        <input
          type="text"
          className="hidden"
          value={phoneValue}
          name="contact_number"
        />
        <input
          type="text"
          className="hidden"
          value={address}
          name="address"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputDemo label="Name" id={"name"} type="text" error={state?.name} />
          <div>
            <label
              htmlFor=""
              className="text-[14px] font-medium cursor-pointer w-fit text-primary"
            >
              Phone
            </label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="EG"
              value={phoneValue}
              onChange={setPhoneValue}
              error={state.contact_number}
            />
          </div>
          <LocationPicker
            id="address"
            error={state.address}
            label={"Address"}
            onChange={(e) => handleAddress(e)}
          />
        </div>
        <div className="flex items-center justify-end">
          <FormSubmittingButton name="Add" />
        </div>
      </form>
    </main>
  );
}
