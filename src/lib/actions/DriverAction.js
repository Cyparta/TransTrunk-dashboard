"use server";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/lib/utils";
import { cookies } from "next/headers";
import { getCookie, deleteCookie } from "cookies-next";

async function handleAddDriver(prevState, formData) {
    
    // ######### Validation #########
    if(formData.get("license_photos")){
        formData.set("license_photos", JSON.parse(formData.get("license_photos")));
    }
    console.log(formData.get("license_photos"));
    if (!formData.get("name")) {
      return { name: "Name is required" };
    }
    if (!formData.get("phone_number")) {
      return { phone_number: "Phone number is required" };
    }
    if (!formData.get("national_id")) {
      return { national_id: "National id is required" };
    }
    
  
    // ######### Post Actions #########
    else {
      let redirectPath;
      try {
        const response = await fetch(BASE_URL + "/logistics/drivers/", {
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
          redirectPath=`/drivers`;
          return { success: "Drivers created successfully" };
        } else if (response.status === 401) {
          deleteCookie("token", { cookies });
          redirectPath = "/login";
        } else {
          redirectPath = null;
          return { error: data?.detail || "Something went wrong please try again later !!!" };
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
  async function handleEditDriverRequest(formData, id) {
    // ######### Patch Actions #########
  
    let redirectPath;
    // console.log(formData, "formData");
    // const form_data= CreateFormData(formData);
    // console.log(form_data);
    try {
      const response = await fetch(BASE_URL + `/logistics/drivers/${id}/`, {
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
        return { success: "Driver Updated successfully" };
      } else if (response.status === 401) {
        deleteCookie("token", { cookies });
        redirectPath = "/login";
      } else {
        redirectPath = null;
        return {
          error:
            data?.detail || 
            data?.national_id||
            data?.phone_number||
            data?.name||
            "Something went wrong please try again later !!!", 
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
export { handleAddDriver, handleEditDriverRequest };