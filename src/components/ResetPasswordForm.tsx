"use client";

import Image from "next/image";
import { useState } from "react";
import SpinnerImage from "/public/spinner.svg";
import Link from "next/link";
import { useResetPasswordMutation } from "@/store/apis/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ResetPasswordForm = ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordApi] = useResetPasswordMutation();
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    let errors = {
      password: "",
      confirmPassword: "",
    };
    if (!formData?.password) {
      errors.password = "Password is required";
    }
    if (!formData?.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }
    if (formData?.password !== formData?.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (errors?.password || errors?.confirmPassword) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);
    setErrors(errors);

    const payload = {
      token,
      password: formData?.password,
      id,
    };

    try {
      const response: any = await resetPasswordApi(payload).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="sm:max-w-[500px] mx-auto py-12 bg-gray-100 rounded-md sm:my-12 flex-1 h-full">
      <h1 className="font-semibold text-3xl text-center">
        Reset your password
      </h1>
      <form
        className="flex flex-col px-3 py-9 sm:p-12 gap-6"
        onSubmit={handleSubmit}
      >
        <input
          type="password"
          name="password"
          placeholder="Password*"
          value={formData?.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event?.target?.value })
          }
          className="w-full text-black bg-white outline-none focus:outline-none rounded-sm px-4 py-2"
        />
        {errors?.password && <p className="text-red-500">{errors?.password}</p>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password*"
          value={formData?.confirmPassword}
          onChange={(event) =>
            setFormData({ ...formData, confirmPassword: event?.target?.value })
          }
          className="w-full text-black bg-white outline-none focus:outline-none rounded-sm px-4 py-2"
        />
        {errors?.confirmPassword && (
          <p className="text-red-500">{errors?.confirmPassword}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white cursor-pointer flex justify-center items-center bg-black rounded-sm px-4 py-2 border-gray-300"
        >
          {isLoading ? (
            <Image src={SpinnerImage} alt="Spinner" height={24} width={24} />
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
      <div className="sm:pl-12 text-center sm:text-left">
        Back to{" "}
        <Link
          href="/login"
          className="text-white bg-black px-2 py-1 rounded-md"
        >
          Login
        </Link>
      </div>
    </div>
  );
};
