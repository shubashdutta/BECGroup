"use client";

import React, { useEffect } from "react";

import LoginLeft from "@/asstest/Image/LoginPageImage.jpg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import TextInput from "../Common/TextInput";
import { FORM_TYPE } from "../utils/InputType";
import { ErrorMessage } from "../utils/FormErrorMessage";
import Logo from "@/asstest/Image/SmallLogo.png";
import { AdminLogin } from "../ApiList/LoginAPi";
import {
  errorMessage,
  successMessage,
} from "../lib/ToastifyMessage/ToastifyMessage";
import PasswordShow from "../Common/PasswordShow";
import { useRouter, usePathname } from "next/navigation";
import { EmployeeLogin } from "../ApiList/EmployeeApi";
import RedirectIfAuthenticated from "../lib/RouteGuard/RedirectIfAuthenticated";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const router = useRouter();
  const pathName = usePathname();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Load saved email and "Remember me" state when component mounts
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("rememberedEmail");
      const savedPassword: any = localStorage.getItem("rememberedPassword");
      const rememberChecked = localStorage.getItem("rememberMe") === "true";

      if (savedEmail) {
        setValue("email", savedEmail);
        setValue("password", savedPassword);
      }

      if (rememberChecked) {
        setValue("rememberMe", true);
      }
    } catch (err) {
      console.error("Failed to load remembered credentials:", err);
    }
  }, [setValue]);

  const handleLoginAdmin = async (data: LoginFormData) => {
    // Handle "Remember me" logic before sending the login request
    try {
      if (data.rememberMe && data.email?.trim()) {
        localStorage.setItem("rememberedEmail", data.email.trim());
        localStorage.setItem("rememberedPassword", data?.password?.trim());
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberMe");
      }

      const payload = {
        email: data?.email,
        password: data?.password,
      };

      const res: any = await AdminLogin(payload);

      router.push("/admin");

      localStorage.setItem("token", res?.token);

      // Redirect based on login type
      // if (pathName === "/employee_login") {
      //   router.push("/dashboard");
      // } else {
      //   router.push("/admin");
      // }

      successMessage({ message: res?.message || "Login successful" });
    } catch (error: any) {
      errorMessage({ error });
      // Optional: you could decide not to clear remember me on failed login
      // But usually it's better to keep the checkbox/email as user left it
    }
  };

  return (
    <RedirectIfAuthenticated>
      <div className="relative min-h-screen w-full py-2 h-[800px]">
        <div className="relative animate__animated animate__fadeInLeftBig h-full w-full pb-6">
          <Image
            src={LoginLeft}
            alt="Login Image"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="right-9 top-8 animate__animated animate__fadeInRightBig absolute py-3.5 w-full max-w-md bg-white/5 backdrop-blur-xs rounded-3xl shadow-xl p-8 md:p-12">
          <div className="flex items-center justify-center gap-x-4 mb-6">
            <div className="w-14 h-14 flex items-center justify-center">
              <Image
                src={Logo}
                alt="logo"
                className="object-contain"
                width={200}
                height={100}
                priority
              />
            </div>
            <h2 className="text-4xl font-bold text-white">Login</h2>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit(handleLoginAdmin)}>
            <div>
              <TextInput
                name="email"
                errors={errors}
                type={FORM_TYPE.EMAIL}
                register={register}
                label="Email"
                required
                validation={{ required: ErrorMessage.email }}
              />
            </div>

            <div>
              <PasswordShow
                name="password"
                errors={errors}
                register={register}
                label="Password"
                required
                validation={{ required: "Password is required" }}
              />
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm text-white/90">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>

              <a
                href="#"
                className="text-white/90 hover:text-white hover:underline transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-blue-600/70 text-white py-3 rounded-xl shadow-md hover:bg-blue-700/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </RedirectIfAuthenticated>
  );
};

export default Login;
