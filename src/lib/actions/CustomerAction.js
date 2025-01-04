"use server";
import { redirect } from "next/navigation";
import { BASE_URL } from "@/lib/utils";
import { cookies } from "next/headers";
import { getCookie, deleteCookie } from "cookies-next";

async function handleAddCustomer(prevState, formData) {
    const FormData={
        name: formData.get("name"),
        contact_number: formData.get("contact_number"),
        address: formData.get("address"),
    }
    // ######### Validation #########
    
    if (!formData.get("name")) {
      return { name: "Name is required" };
    }
    if (!formData.get("contact_number")) {
      return { contact_number: "Phone number is required" };
    }
    if (!formData.get("address")) {
      return { address: "Address is required" };
    }
    
    // ######### Post Actions #########
    else {
      let redirectPath;
      try {
        const response = await fetch(BASE_URL + "/logistics/clients/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token", { cookies })}`,
          },
          body: JSON.stringify(FormData),
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status === 201 || response.status === 200) {
          redirectPath=`/customers`;
          return { success: "Customers created successfully" };
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

export { handleAddCustomer };