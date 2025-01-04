"use client";
import FormSubmittingButton from "@/components/forms/FormSubmittingButton";
import BreadCrumb from "@/components/helper/BreadCrumb";
import ImageUploader from "@/components/helper/ImageUploader";
import InputDemo from "@/components/helper/Input-demo";
import { CreateFormData } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { handleAddDriver } from "@/lib/actions/DriverAction";
export default function AddDrivers() {
  const [phoneValue, setPhoneValue] = useState("");
  const [photos, setPhotos] = useState([]);
  const [state, formAction] = useFormState(handleAddDriver, {
    name: "",
    phone_number: "",
    national_id: "",
    license_photos: "",
  });
  useEffect(() => {
    console.log(state);
    state?.error && toast.error(state.error || state.error);
    if (state?.success) {
      toast.success(state.success);
    }
  }, [state]);
  console.log(photos);

  return (
    <main>
      <BreadCrumb href="/drivers" title="Add driver" />
      <form className="my-6" action={formAction}>
        <input
          type="text"
          className="hidden"
          value={phoneValue}
          name="phone_number"
        />

        <input
          type="text"
          className="hidden"
          name="license_photos"
          value={JSON.stringify(photos)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputDemo label="Name" id={"name"} type="text" error={state?.name} />
          <div>
            <label htmlFor="" className="text-[14px] font-medium cursor-pointer w-fit text-primary">Phone</label>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              defaultCountry="EG"
              value={phoneValue}
              onChange={setPhoneValue}
              error={state.phone_number}
            />
          </div>

          <InputDemo
            label="National id"
            id={"national_id"}
            type="number"
            error={state.color}
          />
          <InputDemo type="text" inputStyle={"invisible"} />
          <ImageUploader
            label="License photos"
            placeHolder="Upload photo"
            inputStyle="bg-inherit border"
            error={state.license_photos}
            onImageChange={(e) => setPhotos((prev) => [...prev, e])}
          />
          <ImageUploader
            label=" .  "
            placeHolder="Upload photo"
            inputStyle="bg-inherit border"
            onImageChange={(e) => setPhotos((prev) => [...prev, e])}
          />
        </div>
        <div className="flex items-center justify-end">
          <FormSubmittingButton name="Add" />
        </div>
      </form>
    </main>
  );
}
