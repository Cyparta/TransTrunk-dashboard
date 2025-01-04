"use client";
import React, { useState } from "react";
import InputDemo from "../helper/Input-demo";
import ImageUploader from "../helper/ImageUploader";
import FormSubmittingButton from "./FormSubmittingButton";
import Image from "next/image";
import { CompareValues } from "@/lib/utils";
import { toast } from "sonner";
import DeleteRow from "../tables/DeleteRow";
import { handleEditDriverRequest } from "@/lib/actions/DriverAction";

export default function EditDriverForm({ defaultData }) {
  console.log(defaultData);
  const [national_id, setNationalID] = useState(
    defaultData?.national_id || null
  );
  const [name, setName] = useState(defaultData?.name || null);
  const [phone_number, setPhoneNumber] = useState(
    defaultData?.phone_number || null
  );
  const [status, setStatus] = useState(defaultData?.status || null);
  const [photos, setPhotos] = useState(defaultData?.license_photos || null);
  console.log(photos);
  console.log(defaultData);
  const handleEdit = async () => {
    const data = {
      name,
      phone_number,
      national_id,
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
    await handleEditDriverRequest(formData, defaultData?.id)
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
            label="Phone number"
            id={"phone_number"}
            type="number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <InputDemo
            label="Status"
            id={"status"}
            type="text"
            value={status}
            disabled={true}
          />
          <InputDemo
            label="National id"
            id={"national_id"}
            type="number"
            value={national_id}
            onChange={(e) => setNationalID(e.target.value)}
          />
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
        </div>
        <div className="flex items-center justify-end gap-1">
          <FormSubmittingButton name="Save" style="px-5 py-2" />
          <DeleteRow
            text="Delete"
            path={"/drivers"}
            id={defaultData?.id}
            end_point={"/logistics/drivers/"}
          />
        </div>
      </form>
    </div>
  );
}
