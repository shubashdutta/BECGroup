"use client";
import { EmployeeLoginForm } from "@/components/employee/EmployeeLoginForm";
import { loginEmployee } from "@/lib/api/employee";
import { useEmployeeAuthStore } from "@/store/employeeAuthStore";
import { EmployeeAuthGuard } from "@/guards/EmployeeAuthGuard";

export default function EmployeeLoginPage() {
  const { login, loading, error } = useEmployeeAuthStore();
  return <EmployeeLoginForm onLogin={login} loading={loading} error={error} />;
}
