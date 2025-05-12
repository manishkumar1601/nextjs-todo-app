"use client";

import Link from "next/link";
import Image from "next/image";
import { FormEvent, useState, ChangeEvent } from "react";
import SpinnerImage from "/public/spinner.svg";
import { defaultSignupData } from "@/constants";
import { useSignupMutation } from "@/store/apis/authApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>(defaultSignupData);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const router = useRouter();

  const [signup] = useSignupMutation();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(event: FormEvent) {
    event.stopPropagation();
    event.preventDefault();

    let errors: {
      firstName?: string;
      lastName?: string;
      userName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    const { firstName, lastName, userName, email, password, confirmPassword } =
      formData;

    if (!firstName || firstName?.length < 3) {
      errors.firstName =
        "First name is required and must be at least 3 characters long";
    }

    if (!lastName || lastName.length < 3) {
      errors.lastName =
        "Last name is required and must be at least 3 characters long";
    }

    if (!userName || userName.length < 3) {
      errors.userName =
        "Username is required and must be at least 3 characters long";
    }

    if (!email || email.length < 6) {
      errors.email = "Email is required and must be at least 6 characters long";
    }

    if (!password || password.length < 4) {
      errors.password =
        "Password is required and must be at least 4 characters long";
    }

    if (!confirmPassword || confirmPassword.length < 4) {
      errors.confirmPassword =
        "Confirm Password is required and must be at least 4 characters long";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    let payload = { ...formData };
    delete payload.confirmPassword;

    try {
      const response = await signup(payload).unwrap();
      if (response?.success) {
        toast.success(response?.message);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setFormData(defaultSignupData);
    }
  }

  return (
    <>
      <form
        className="flex flex-col px-3 py-9 sm:p-12 gap-6"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2 justify-between w-full">
          <div className="w-[48%]">
            <input
              type="text"
              name="firstName"
              placeholder="First Name*"
              value={formData.firstName}
              onChange={handleInputChange}
              className="text-black bg-white outline-none focus:outline-none rounded-sm px-4 py-2"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div className="w-[48%]">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name*"
              value={formData.lastName}
              onChange={handleInputChange}
              className="text-black bg-white outline-none focus:outline-none rounded-sm px-4 py-2"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>
        <input
          type="text"
          name="userName"
          placeholder="Username*"
          value={formData.userName}
          onChange={handleInputChange}
          className="w-full text-black bg-white outline-none focus:outline-none rounded-sm px-4 py-2"
        />
        {errors.userName && <p className="text-red-500">{errors.userName}</p>}
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password*"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="w-full text-black bg-white outline-none focus:outline-none rounded-sm px-4 py-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white cursor-pointer flex justify-center items-center bg-black rounded-sm px-4 py-2 border-gray-300"
        >
          {isLoading ? (
            <Image src={SpinnerImage} alt="Spinner" height={24} width={24} />
          ) : (
            "Signup"
          )}
        </button>
      </form>
      <div className="sm:pl-12 text-center sm:text-left">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-white bg-black px-2 py-1 rounded-md"
        >
          Login
        </Link>
      </div>
    </>
  );
};

export default SignupForm;
