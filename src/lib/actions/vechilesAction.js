"use server";

import { redirect } from "next/navigation";
import { BASE_URL, CreateFormData, Expired_time } from "@/lib/utils";
import { cookies } from "next/headers";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";
import { revalidatePath } from "next/cache";

/* 
    ! ############ ADD VECHILES FUNCTION ###################
*/
async function handleAddVechiles(prevState, formData) {
 
  if (formData.get("category") !== "rental_cars") {
    formData.delete("rental_price");
    formData.delete("num_days");
  }
  // if(formData.get("license_photos")){
  //   formData.append("license_photos", JSON.parse(formData.get("license_photos")));
  // }
  // ######### Validation #########
  console.log(formData);
  if (!formData.get("name")) {
    return { name: "Name is required" };
  }
  if (!formData.get("vehicle_number")) {
    return { vehicle_number: "Vehicle number is required" };
  }
  if (!formData.get("color")) {
    return { color: "Color is required" };
  }
  if (!formData.get("type")) {
    return { type: "Type is required" };
  }
  if (!formData.get("status")) {
    return { status: "Status is required" };
  }
  if (!formData.get("capacity")) {
    return { capacity: "Capacity is required" };
  }
  if (!formData.get("location")) {
    return { location: "Location is required" };
  }
  // if (!formData.get("license_photos")) {
  //   return { license_photos: "License photos is required" };
  // }
  if (!formData.get("category")) {
    return { category: "Category is required" };
  }

  // ######### Post Actions #########
  else {
    let redirectPath;
    try {
      const response = await fetch(BASE_URL + "/logistics/vehicles/", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("token", { cookies })}`,
        },
        body: formData,
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.status === 201 || response.status === 200) {
        redirectPath = `/vehicles/assignDriver/${data.data?.id}`;
        return { success: "Vehicles created successfully" };
      } else if (response.status === 401) {
        deleteCookie("token", { cookies });
        redirectPath = "/login";
      } else {
        redirectPath = null;
        return {
          error:
            data?.detail || "Something went wrong please try again later !!!",
        };
      }
    } catch (error) {
      redirectPath = null;
      throw new Error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong please try again later !!!"
      );
    } finally {
      redirectPath && redirect(redirectPath);
    }
  }
}
async function AssignDriver(formData, id) {
  // ######### Post Actions #########
  let redirectPath;
  try {
    const response = await fetch(
      BASE_URL + `/logistics/vehicles/${id}/assign_driver/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token", { cookies })}`,
        },
        body: JSON.stringify(formData),
      }
    );
    // console.log(response);
    const data = await response.json();
    // console.log(data);
    if (response.status === 201 || response.status === 200) {
      return { success: "Driver assigned successfully" };
    } else if (response.status === 401) {
      deleteCookie("token", { cookies });
      redirectPath = "/login";
    } else {
      redirectPath = null;
      return {
        error:
          data?.detail || "Something went wrong please try again later !!!",
      };
    }
  } catch (error) {
    redirectPath = null;
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong please try again later !!!"
    );
  } finally {
    redirectPath && redirect(redirectPath);
  }
}

async function handleEditVehiclesRequest(formData, id) {
  // ######### Patch Actions #########

  let redirectPath;
  // console.log(formData, "formData");
  // const form_data= CreateFormData(formData);
  // console.log(form_data);
  try {
    const response = await fetch(BASE_URL + `/logistics/vehicles/${id}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getCookie("token", { cookies })}`,
      },
      body: formData,
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (response.status === 201 || response.status === 200) {
      // revalidatePath("/products", "page");
      return { success: "Vehicles Updated successfully" };
    } else if (response.status === 401) {
      deleteCookie("token", { cookies });
      redirectPath = "/login";
    } else {
      redirectPath = null;
      return {
        error:
          data?.detail || 
          data?.rental_price||
          data?.num_days 
      }
    }
  } catch (error) {
    redirectPath = null;
    throw new Error(
      error?.response?.data?.message ||
        error?.message ||
        "Something went wrong please try again later !!!"
    );
  } finally {
    redirectPath && redirect(redirectPath);
  }
}
export { handleAddVechiles, AssignDriver, handleEditVehiclesRequest };
