'use client';
import React, { useState } from 'react';
import { PlusCircle, UploadCloud } from "lucide-react";

const ImageUploader = ({label, id, error, disabled, inputStyle, placeHolder, imageSrc, onImageChange }) => {
  const [selectedImage, setSelectedImage] = useState(imageSrc || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);

      // Return the new image file
      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <lable className="text-sm text-primary font-medium">{label}</lable>
      <div
        className={`relative bg-transparent rounded h-[200px] w-full flex justify-center items-center cursor-pointer ${
          error ? 'border border-red-800' : 'border border-input border-dashed'
        } ${disabled && 'bg-gray-300'} ${inputStyle}`}
      >
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" className="h-full w-full object-cover rounded" />
        ) : (
          <div className='text-primary flex flex-col items-center'>
            <div className=''><UploadCloud color="#467DB2" size={20} /></div> 
            <p className='underline'>{placeHolder}</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          id={id}
          name={id}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default ImageUploader;

