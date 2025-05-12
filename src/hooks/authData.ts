'use client';

import { useGetAuthDataQuery } from "@/store/apis/authApi"

export const useAuthData = () => {
  const { data, error, isLoading, isError, isSuccess } = useGetAuthDataQuery({});
  return { data, error, isLoading, isError, isSuccess }
}