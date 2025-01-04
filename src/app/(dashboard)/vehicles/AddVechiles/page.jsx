"use client";
import FormSubmittingButton from "@/components/forms/FormSubmittingButton";
import BreadCrumb from "@/components/helper/BreadCrumb";
import ImageUploader from "@/components/helper/ImageUploader";
import InputDemo from "@/components/helper/Input-demo";
// import LocationPicker from "@/components/helper/Map";
import dynamic from "next/dynamic";
const LocationPicker = dynamic(() => import('@/components/helper/Map'), { ssr: false });
import { handleAddVechiles } from "@/lib/actions/vechilesAction";
import { CreateFormData } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export default function AddVechiles() {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [photos, setPhotos] = useState([]);
  const [state, formAction] = useFormState(handleAddVechiles, {
    name: "",
    vehicle_number: "",
    color: "",
    type: "",
    status: "",
    capacity: "",
    location: "",
    license_photos: "",
    category: "",
    rental_price: "",
    num_days: "",
  });
  useEffect(() => {
    console.log(state);
    state?.error && toast.error(state.error || state.error);
    if (state?.success) {
      toast.success(state.success);
    }
  }, [state]);
  return (
    <main>
      <BreadCrumb href="/vehicles" title="Add vehicle" />
      <form className="my-6" action={formAction}>
        <input
          type="text"
          className="hidden"
          name="license_photos"
          value={CreateFormData(photos) }
        />
        <input
          type="text"
          className="hidden"
          name="location"
          value={location}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputDemo label="Name" id={"name"} type="text" error={state?.name} />
          <InputDemo
            label="Vehicle number"
            id={"vehicle_number"}
            type="text"
            error={state.vehicle_number}
          />
          <InputDemo
            label="Color"
            id={"color"}
            type="text"
            error={state.color}
          />
          <InputDemo
            label="Type"
            id={"type"}
            type="selected"
            selectItem={[
              "cargo_van",
              "box_truck",
              "flatbed_truck",
              "refrigerated_truck",
              "minivan",
            ]}
            error={state.type}
          />
          <InputDemo
            label="Status"
            id={"status"}
            type="selected"
            selectItem={["in_transit", "available", "maintenance"]}
            error={state.status}
          />
          <InputDemo
            label="Capacity"
            id={"capacity"}
            type="number"
            error={state.capacity}
          />
          <LocationPicker
            id="location"
            error={state.location}
            label={"Location"}
            onChange={(e) => setLocation(e)}
          />
          <InputDemo type="text" inputStyle={"invisible"} />
          <ImageUploader
            label="License photos"
            placeHolder="Upload photo"
            inputStyle="bg-inherit border"
            error={state.license_photos}
            onImageChange={(e)=>setPhotos((prev)=>[...prev ,e])}
          />
          <ImageUploader
            label=" .  "
            placeHolder="Upload photo"
            inputStyle="bg-inherit border"
            onImageChange={(e)=>setPhotos((prev)=>[...prev ,e])}
          />
          <InputDemo
            label="Category"
            id={"category"}
            type="selected"
            selectItem={["rental_cars", "company_owned"]}
            onChange={(e) => setCategory(e)}
            error={state.category}
          />
          {category === "rental_cars" && (
            <>
              <InputDemo
                label="Rental price"
                id={"rental_price"}
                type="number"
                error={state.rental_price}
              />
              <InputDemo
                label="Days"
                id={"num_days"}
                type="number"
                error={state.num_days}
              />
            </>
          )}
        </div>
        <div className="flex items-center justify-end">
          <FormSubmittingButton name="Add" />
        </div>
      </form>
    </main>
  );
}
