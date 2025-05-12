"use client";

import Image from "next/image";
import SpinnerImage from "/public/spinner.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useLoginMutation } from "@/store/apis/authApi";
import { useRouter } from "next/navigation";
import {
  setRefreshToken,
  setToken,
  setUserData,
} from "@/store/slices/authSlice";
import { useAppDispatch } from "@/hooks/reduxStore";
import { toast } from "sonner";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [formData, setFormData] = useState<{
    email?: string;
    password?: string;
  }>({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    let errors: {
      email?: string;
      password?: string;
    } = {};
    const { email, password } = formData;

    if (!email || email.length < 6) {
      errors.email = "Email is required and must be at least 6 characters long";
    }
    if (!password || password.length < 4) {
      errors.password =
        "Password is required and must be at least 4 characters long";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    const payload = { ...formData };

    try {
      const response: any = await login(payload).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        dispatch(setUserData(response.data?.userData));
        dispatch(setToken(response.data?.token));
        dispatch(setRefreshToken(response.data?.refreshToken));
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <form
        className="flex flex-col px-3 py-9 sm:p-12 gap-6"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full text-black bg-white outline-none focus:outline-none rounded-sm px-4 py-2"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
        <input
          type="password"
          name="password"
          placeholder="Password*"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full text-black bg-white outline-none focus:outline-none rounded-sm px-4 py-2"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white cursor-pointer flex justify-center items-center bg-black rounded-sm px-4 py-2 border-gray-300"
        >
          {isLoading ? (
            <Image src={SpinnerImage} alt="Spinner" height={24} width={24} />
          ) : (
            "Login"
          )}
        </button>
      </form>
      <div className="sm:pl-12 text-center sm:text-left">
        Forgot Password?{" "}
        <Link
          href="/forgot-password"
          className="text-white bg-black px-2 py-1 rounded-md"
        >
          Reset
        </Link>
      </div>
      <div className="sm:pl-12 text-center sm:text-left mt-3">
        Create new account?{" "}
        <Link
          href="/signup"
          className="text-white bg-black px-2 py-1 rounded-md"
        >
          Signup
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
