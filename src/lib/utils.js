import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL;

export let Expired_time = {
  maxAge: 60 * 60 * 24,
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ############### clear default input numbers  ###############

export const handleKeyDown = (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault();
  }
};

export const handleWheel = (event) => {
  event.target.blur();
};

export function handleDelayWheel(e) {
  if (e.deltaY > 0) {
    e.currentTarget.scrollTop += 50;
  } else {
    e.currentTarget.scrollTop -= 50;
  }
}

export function FilterBath(pathname, numberOfSplit = 1) {
  return pathname.split("/")[numberOfSplit];
}  

export function CompareValues(values, data) {
  const NewValues = Object.keys(values)
    .filter((key) => {
      if (typeof data[key] === "boolean") {
        return values[key] !== String(data[key]); // Convert boolean to string
      }
      return values[key] !== data[key]; // Direct comparison for other types
    })
    .map((key) => {
      return { [key]: values[key] };
    });

  if (NewValues.length === 0) {
    return false;
  } else {
    return Object.assign({}, ...NewValues);
  }
}

export function CompareValuesEdit(newData, oldData) {
  for (const key in newData) {
      if (key === 'image') continue;

      // Convert both values to strings for comparison
      const newValue = newData[key]?.toString();
      const oldValue = oldData[key]?.toString();

      if (newValue !== oldValue) {
          return true; // Values have changed
      }
  }
  return false; // No values changed
}

export function CreateFormData(values, formData = new FormData()) {
  Object.keys(values).map((key) => {
    formData.append(key, values[key]);
  });
  return formData;
}