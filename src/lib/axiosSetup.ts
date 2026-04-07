/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios, { AxiosError, AxiosResponse } from "axios";
import { errorMessage } from "./ToastifyMessage/ToastifyMessage";
import { baseUrl } from "@/config";

export const apiRequest = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  // timeout: 10000,
  timeout: 0,
});

// REQUEST INTERCEPTOR
apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // always fresh
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
apiRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      errorMessage({
        message: (error.response?.data as { message: string })?.message,
      });
      // depoly check

      localStorage.removeItem("token");
      window.location.href = "/";
    }

    if (error?.response?.status === 400) {
      errorMessage({
        message: (error.response?.data as any)?.message || "Bad Request",
      });
    }

    return Promise.reject(error);
  },
);
