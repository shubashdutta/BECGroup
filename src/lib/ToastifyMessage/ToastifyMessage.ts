/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { toast } from "react-toastify";

export const successMessage = ({ message }: any) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeButton: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

export const errorMessage = ({ error }: any) => {
  toast.error(error?.response?.data?.message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
};
