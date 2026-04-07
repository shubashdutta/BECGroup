"use client";
import { EmployeeProfile } from "@/components/user/EmployeeProfile";
import { fetchEmployeeProfile } from "@/lib/api/user/employee";
import { useEmployeeStore } from "@/store/employeeStore";
import { EmployeeEditForm } from "@/components/user/EmployeeEditForm";

export default function EmployeeProfilePage() {
  const { profile, updateProfile, loading } = useEmployeeStore();
  return <EmployeeProfile profile={profile} onUpdate={updateProfile} />;
}
