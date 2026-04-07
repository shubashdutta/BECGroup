"use client";
import { LoginForm } from "@/components/auth/LoginForm";
import { loginUser } from "@/lib/api/auth";
import { useAuthStore } from "@/store/authStore";
import { SocialLogin } from "@/components/auth/SocialLogin";
import { AuthGuard } from "@/guards/AuthGuard";

export default function LoginPage() {
  const { login, loading, error } = useAuthStore();
  return <LoginForm onLogin={login} loading={loading} error={error} />;
}
