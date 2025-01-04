"use client";
import React, { useState } from "react";
import InputDemo from "../helper/Input-demo";
import ImageUploader from "../helper/ImageUploader";
import dynamic from "next/dynamic";
const LocationPicker = dynamic(() => import('@/components/helper/Map'), { ssr: false });
import FormSubmittingButton from "./FormSubmittingButton";
import { CompareValues} from "@/lib/utils";
import { handleEditVehiclesRequest } from "@/lib/actions/vechilesAction";
import { toast } from "sonner";
import DeleteRow from "../tables/DeleteRow";

export default function EditVehiclesForm({ defaultData }) {
  const [category, setCategory] = useState(defaultData?.category || null);
  const [name, setName] = useState(defaultData?.name || null);
  const [vehiclesNumber, setVehiclesNumber] = useState(
    defaultData?.vehicle_number || null
  );
  const [type, setType] = useState(defaultData?.type || null);
  const [rentalPrice, setRentalPrice] = useState(
    defaultData?.rental_price || null
  );
  const [capacity, setCapacity] = useState(defaultData?.capacity || null);
  const [color, setColor] = useState(defaultData?.color || null);
  const [location, setLocation] = useState(defaultData?.location || null);
  const [num_days, setNumDays] = useState(defaultData?.num_days || null);
  const [status, setStatus] = useState(defaultData?.status || null);
  const [photos, setPhotos] = useState(defaultData?.license_photos || null);
  console.log(photos);
  console.log(defaultData);
  const handleEdit = async () => {
    const data = {
      category,
      name,
      vehicle_number: vehiclesNumber,
      type,
      rental_price: rentalPrice,
      capacity,
      color,
      location,
      num_days,
      status,
      license_photos: photos,
    };

    console.log(CompareValues(data, defaultData));
    console.log(defaultData.license_photos);
    if (!CompareValues(data, defaultData)) {
      toast.warning("No changes made to save");
      return;
    }
    const formData = new FormData();
    for (const key in data) {
      if (key === "license_photos") {
        // Append files individually
        data[key].forEach((file) => formData.append("license_photos", file));
      } else {
        formData.append(key, data[key]);
      }
    }
    await handleEditVehiclesRequest(formData, defaultData?.id)
      .then((response) => {
        if (response?.error) {
          toast.error(response?.error);
          return;
        } else if (response?.success) {
          toast.success(response?.success);
          return;
        }
      })
      .catch((error) => {
        toast.error(error?.message || error);
      });
  };
  return (
    <div>
      <form action={handleEdit} className="my-6">
        <input
          type="text"
          className="hidden"
          name="license_photos"
          value={photos}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputDemo
            label="Name"
            id={"name"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputDemo
            label="Vehicle number"
            id={"vehicle_number"}
            type="text"
            value={vehiclesNumber}
            onChange={(e) => setVehiclesNumber(e.target.value)}
          />
          <InputDemo
            label="Color"
            id={"color"}
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
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
            value={type}
            onChange={(e) => setType(e)}
          />
          <InputDemo
            label="Status"
            id={"status"}
            type="selected"
            selectItem={["in_transit", "available", "maintenance", "assigned"]}
            value={status}
            onChange={(e) => setStatus(e)}
          />
          <InputDemo
            label="Capacity"
            id={"capacity"}
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
          <LocationPicker
            id="location"
            label="Location"
            error={null}
            initialValue={location}
            onChange={(newValue) => setLocation(newValue)}
          />
          <InputDemo type="text" inputStyle={"invisible"} />
          {defaultData?.license_photos.map((photo, index) => {
            return (
              <ImageUploader
                key={index}
                label="License photos"
                placeHolder="Upload photo"
                inputStyle="bg-inherit border"
                imageSrc={photo.img}
                onImageChange={(e) =>
                  setPhotos((prev) => {
                    const updatedPhotos = [...prev];
                    updatedPhotos[index] = e; // Replace the photo at the specific index
                    return updatedPhotos;
                  })
                }
              />
            );
          })}
          {defaultData?.license_photos.length == 0 && (
            <>
              <ImageUploader
                label="License photos"
                placeHolder="Upload photo"
                inputStyle="bg-inherit border"
                onImageChange={(e) => setPhotos((prev) => [...prev, e])}
              />
              <ImageUploader
                label=" .  "
                placeHolder="Upload photo"
                inputStyle="bg-inherit border"
                onImageChange={(e) => setPhotos((prev) => [...prev, e])}
              />
            </>
          )}

          <InputDemo
            label="Category"
            id={"category"}
            type="selected"
            selectItem={["rental_cars", "company_owned"]}
            onChange={(e) => setCategory(e)}
            value={category}
          />
          {category === "rental_cars" && (
            <>
              <InputDemo
                label="Rental price"
                id={"rental_price"}
                type="number"
                value={rentalPrice}
                onChange={(e) => setRentalPrice(e.target.value)}
              />
              <InputDemo
                label="Days"
                id={"num_days"}
                type="number"
                value={num_days}
                onChange={(e) => setNumDays(e.target.value)}
              />
            </>
          )}
        </div>
        <div className="flex items-center justify-end gap-1">
          
          <FormSubmittingButton name="Save" style="px-5 py-2"/>
          <DeleteRow
            text="Delete"
            path={"/vehicles"}
            id={defaultData?.id}
            end_point={"/logistics/vehicles/"}
          />
        </div>
      </form>
    </div>
  );
}
