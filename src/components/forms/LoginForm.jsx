"use client";
import { useFormState } from "react-dom";
import { handleLogin } from "@/lib/action";
import InputDemo from "@/components/helper/Input-demo";
import FormSubmittingButton from "@/components/forms/FormSubmittingButton";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginForm({ searchParams }) {
  const [state, formAction] = useFormState(handleLogin, {
    phone_number: "",
    password: "",
  });
  useEffect(() => {
    state?.error && toast.error(state.error || state.error);
    if (state?.success) {
      toast.success(state.success);
    }
  }, [state]);
  return (
    <main className="container h-[90vh] flex items-center flex-col justify-center">
      <form
        action={formAction}
        className="flex flex-col bg-white justify-center py-2 px-14 gap-4  order-2 md:order-1  shadow-lg w-[649px] max-w-full  rounded-[40px]"
      >
        <h1 className="text-2xl font-bold text-center mt-20 mb-10  text-primary">Welcome Back !</h1>
        <InputDemo
          id={"phone_number"}
          label="Phone Number"
          type="number"
          placeHolder="Enter Phone Number"
          error={state?.phone_number}
        />
        <div className="flex items-end justify-between flex-col">
          <InputDemo
            id={"password"}
            label="Password"
            type="password"
            placeHolder="Enter Password"
            error={state?.password}
          />
        </div>
        <div className="flex items-center justify-center">
          <FormSubmittingButton name="Login" style="w-3/5" />
        </div>
      </form>
    </main>
  );
}
