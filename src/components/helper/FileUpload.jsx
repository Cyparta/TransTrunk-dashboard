"use client";
import React, { useState, useRef } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SquarePlus, X } from "lucide-react";

export default function FileUpload({
  label,
  placeholder,
  style,
  id,
  onFileChange,
}) {
  const [fileNames, setFileNames] = useState([]); // Track selected files
  const inputRef = useRef(null); // Ref to input element

  // Handle the addition of new files
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFileNames((prevFiles) => {
      const updatedFiles = [...prevFiles, ...files];
      onFileChange(updatedFiles); // Pass the updated file list to parent
      return updatedFiles;
    });
  };

  // Remove a file from the list
  const handleRemoveFile = (e, indexToRemove) => {
    e.stopPropagation(); // Prevent the file picker from opening
    setFileNames((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (_, index) => index !== indexToRemove
      );
      onFileChange(updatedFiles); // Pass the updated file list to parent
      return updatedFiles;
    });

    // Clear the file input value to allow the same file to be added again
    inputRef.current.value = "";
  };

  return (
    <div className={`mt-4 ${style}`}>
      <Label>{label}</Label>
      <div className="relative flex cursor-pointer border border-dashed py-[33px] gap-1 rounded items-center flex-col">
        <SquarePlus className="text-white bg-secondGray-200" />
        <input
          type="file"
          id={id}
          name={id}
          placeholder={placeholder}
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileChange}
          multiple // Allow multiple files
          ref={inputRef}
        />
      </div>

      {/* Display selected files */}
      <div className="p-3">
        {fileNames?.map((file, index) => (
          <div key={index} className="border rounded-md px-3 mb-2">
            <div className="flex justify-between items-center">
              <p className="text-sm">{file.name}</p>
              <button
                type="button"
                onClick={(e) => handleRemoveFile(e, index)}
                className="ml-2"
              >
                <X className="text-black" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
