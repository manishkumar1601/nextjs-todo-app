"use client";

import Image from "next/image";
import Link from "next/link"
import { FormEvent, useState } from "react";
import SpinnerImage from "/public/spinner.svg";
import { useForgotPasswordMutation } from "@/store/apis/authApi";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordApi] = useForgotPasswordMutation();
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event?.stopPropagation();
    if (!email) {
      setError("Please enter email");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const response = await forgotPasswordApi(email).unwrap();
      console.log('response', response);
      if (response?.success) {
        setSuccessMessage(response?.message);
      }
    } catch (error: any) {
      console.log('error', error);
      setError(error?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (successMessage) {
    return (
      <div className="sm:max-w-[500px] mx-auto py-12 bg-gray-100 rounded-md sm:my-12 flex-1 h-full">
        <h3 className="font-semibold text-3xl text-center">{successMessage}</h3>
      </div>
    );
  }

  return (
    <div className="sm:max-w-[500px] mx-auto py-12 bg-gray-100 rounded-md sm:my-12 flex-1 h-full">
      <h1 className="font-semibold text-3xl text-center">Forgot Password</h1>
      <form
        className="flex flex-col px-3 py-9 sm:p-12 gap-6"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={email}
          onChange={(event) => setEmail(event?.target?.value)}
          className="w-full text-black bg-white outline-none focus:outline-none rounded-sm px-4 py-2"
        />
        {error && <p className="text-red-500">{error}</p>}
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
        Back to{" "}
        <Link
          href="/login"
          className="text-white bg-black px-2 py-1 rounded-md"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default ForgotPasswordPage