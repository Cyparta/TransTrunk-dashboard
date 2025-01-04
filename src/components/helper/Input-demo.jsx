"use client";

import { useState } from "react";

import { handleKeyDown, handleWheel } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Eye, EyeOff } from "lucide-react";
import { SelectDemo } from "./SelectInput";

const InputDemo = ({
  id,
  label,
  style,
  inputStyle,
  type = "text",
  placeHolder,
  disabled = false,
  value,
  onChange,
  error,
  selectValue = "",
  selectItem = [],
  defaultValue,
  isChoices = null,
  onFocus
}) => {
  const [isPassword, setIsPassword] = useState(false);

  // --------- Global functions ------------------
  const handleChangePassword = () => {
    setIsPassword(!isPassword);
  };
  return (
    <div className={`grid grid-cols-1 w-full ${style} items-center `}>
      {label && (
        <Label
          htmlFor={id}
          className={`text-[14px] font-medium   cursor-pointer w-fit  ${
            error ? "text-red-800" : "text-primary"
          }`}
        >
          {label}
        </Label>
      )}
      <div className="w-full flex-1">
        {type === "email" ? (
          <Input
            type={"email"}
            id={id}
            className={`outline-0 bg-transparent  ${
              error ? "border border-red-800" : "border rounded-[70px]"
            } focus-visible:ring-0 focus-visible:ring-offset-0  ${
              disabled && "bg-secondary"
            } ${inputStyle}`}
            placeholder={placeHolder}
            onKeyDown={handleKeyDown}
            onWheel={handleWheel}
            value={value}
            onChange={onChange}
            disabled={disabled}
            name={id}
          />
        ) : type === "date" ? (
          <Input
            type="date"
            name={id}
            id={id}
            className={`outline-0 bg-secondary   ${
              error
                ? "border border-red-800"
                : "border rounded-[70px]"
            } focus-visible:ring-0 focus-visible:ring-offset-0  ${
              disabled && "bg-gray-300"
            } ${type === "file" && "cursor-pointer"} ${inputStyle}`}
            placeholder={placeHolder}
            onKeyDown={handleKeyDown}
            onWheel={handleWheel}
            value={value}
            onChange={onChange}
            disabled={disabled}
            // min={new Date().toISOString().split("T")[0]}
          />
        ) : type=== "radio"?(
        <div className="flex items-center space-x-4 mb-1">
          {selectItem.map((item, index) => (
            <label key={index} className="flex items-center space-x-2 ">
              <Input
                type="radio"
                name={id}
                id={id}
                value={item.value}
                checked={value === item.value}
                onChange={onChange}
                className=" custom-radio"
              />
              <span className="text-gray-300">{item.label}</span>
            </label>
          ))}
        </div>): type==="file"&&id=="image"?( 
          <div className="flex justify-center">
          <Input
              type="file"
              accept="image/*"
              id={id}
              className={` outline-0 bg-secondary h-[200px] max-w-[200px]   ${
                error
                  ? "border border-red-800"
                  : "border rounded-[70px]"
              } focus-visible:ring-0 focus-visible:ring-offset-0  ${
                disabled && "bg-gray-300"
              } ${inputStyle}`}
              placeholder={placeHolder}
              onKeyDown={handleKeyDown}
              onWheel={handleWheel}
              value={value}
              onChange={onChange}
              disabled={disabled}
              name={id}
            />
            </div>):type === 'selected' ?
                            <SelectDemo
                                id={id}
                                placeholder={placeHolder}
                                selectItem={selectItem}
                                selectValue={selectValue}
                                defaultValue={defaultValue}
                                onChange={onChange}
                                value={value} 
                                className={` outline-0 ${
                                  error
                                    ? "border border-red-800"
                                    : "border rounded-[70px]"
                                } focus-visible:ring-0 focus-visible:ring-offset-0  ${
                                  disabled && "bg-gray-300"
                                } ${inputStyle}`}/>:(
          <div className="relative">
            <Input
              type={
                type === "password" ? (isPassword ? "text" : "password") : type
              }
              id={id}
              className={` outline-0  ${
                error
                  ? "border border-red-800 rounded-[70px]"
                  : "border rounded-[70px]"
              } focus-visible:ring-0 focus-visible:ring-offset-0  ${
                disabled && "bg-gray-300"
              } ${inputStyle}`}
              placeholder={placeHolder}
              onKeyDown={handleKeyDown}
              onFocus={onFocus}
              onWheel={handleWheel}
              value={value}
              onChange={onChange}
              disabled={disabled}
              name={id}
            />
            {type === "password" &&
              (isPassword ? (
                <EyeOff
                  onClick={handleChangePassword}
                  className="absolute right-2 top-2 cursor-pointer z-40  "
                  size={25}
                />
              ) : (
                <Eye
                  onClick={handleChangePassword}
                  className="absolute right-2 top-2 cursor-pointer z-40  "
                  size={25}
                />
              ))}
          </div>
        )}

        {error && <p className="text-red-800 text-xs pt-1 m-0">{error}</p>}
      </div>
    </div>
  );
};

export default InputDemo;
