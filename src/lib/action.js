"use server";

import { redirect } from "next/navigation";
import { BASE_URL, Expired_time } from "@/lib/utils";
import { cookies } from "next/headers";
import { setCookie, getCookie, hasCookie, deleteCookie } from "cookies-next";
import { revalidatePath } from "next/cache";

function ISValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ISValidPassword(password) {
  return password.length >= 1;
}

function ISValidUserName(userName) {
  return /^[a-zA-Z0-9 ]{3,30}$/.test(userName);
}

function IsValidateNumber(number) {
  // Regular expression to match EG. phone number formats
  const usPhoneNumberPattern =
    /^\+20\d{10}$/;
  return usPhoneNumberPattern.test(number);
}

/* 
    ! ############ GET DATA IN SERVER SIDE FUNCTION ###################
    * @param {string} End_Point - request end point
    * @param {object} headers - request headers
    * @param {object} method - request Another method
    ? {...} - request body parameters or query parameters
*/
async function GetDataInServerSide(
  End_Point = "",
  ExtraMethod = {},
  Authorization = true
) {
  /*
   * Default Headers If Not Provided Or Not Valid.
   */
  let headers = Authorization
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer  ${getCookie("token", { cookies })}`
      }
    : {
        "Content-Type": "application/json",
      };

  let redirectPath;
  try {
    // console.log(BASE_URL + End_Point)
    const response = await fetch(BASE_URL + End_Point, {
      method: "GET",
      headers: headers,
      // ? if You Want To Use Extra Method For Request Such as Cache Control, etc.
      cache: "no-store",
    });
    console.log(response, "response");
    const data = await response.json();
    if (response.status === 201 || response.status === 200) {
      return data;
    } else if (response.status === 401) {
      deleteCookie("token", { cookies });
      redirectPath = "/login";
    } else if (response.status === 404) {
      throw new Error(
        data.message || response.error || response?.data?.message
      );
    }
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
        "Something went wrong please try again later !!!"
    );
  } finally {
    redirectPath && redirect(redirectPath);
  }
}

/* 
    ! ############ DELETE ROW FUNCTION ###################
    * @param {string} End_Point - request end point
    * @param {object} id - request id
    * @param {object} path - revaildate path
    ? {...} - request body parameters or query parameters
*/
async function handleDeleteRow(End_Point, id, path) {
  let redirectPath;
  console.log(BASE_URL + End_Point  + id + path)
  try {
    const response = await fetch(BASE_URL + End_Point + id + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token", { cookies })}`,
      },
    });
    console.log(response, "response");
    let data = {};
    if (response.status !== 204) {
      // 204 No Content
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(e?.message || e);
        // Handle malformed JSON or unexpected content here
      }
    }

    if (response.ok) {
      // Shorthand for status 200-299
      redirectPath=`${path}`;
      return { success: "Record deleted successfully" };
    } else if (response.status === 401) {
      deleteCookie("token", { cookies });
      redirectPath = "/login";
    } else {
      return {
        error: data.message || response.error || response?.data?.message,
      };
    }
  } catch (e) {
    throw new Error(e?.message || e);
  } finally {
    redirectPath && redirect(redirectPath);
  }
}

/* 
    ! ############ LOGIN FUNCTION ###################
    * @param {object} prevState - previous state of the form
    * @param {object} formData - form data
    ? @returns {object} - return object with error or success message and User token
*/
async function handleLogin(prevState, formData) {
  const FormData = {
    phone_number: "+"+formData.get("phone_number"),
    password: formData.get("password"),
  };
  if (!IsValidateNumber(FormData.phone_number)) {
    return { phone_number: "phone number is not valid" };
  }
  if (!FormData.password) {
    return {
      password:
        "Password is not valid must have at least one Uppercase & lowercase ",
    };
  }
  // ######### Post Actions #########
  else {
    let redirectPath;
    try {
      const response = await fetch(BASE_URL + "/core/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FormData),
      });
      const data = await response.json();
      if (response.status === 201 || response.status === 200) {
        setCookie("token", data?.access, { cookies }, Expired_time);
        redirectPath = "/";
        return { success: "User created successfully" };
      } else if (response.status === 403) {
        redirectPath = `/login`;
      } else {
        redirectPath = null;
        return data?.phone_number
          ? data
          : data?.password
          ? data
          : { email: data?.message || data?.detail || "User not found" };
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


export {
  handleLogin,
  GetDataInServerSide,
  handleDeleteRow,
  
};
