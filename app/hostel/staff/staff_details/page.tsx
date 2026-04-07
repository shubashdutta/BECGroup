"use client";
import { StaffDetails } from "@/components/hostel/staff/StaffDetails";
import { fetchStaffDetails } from "@/lib/api/hostel/staff";
import { useHostelStaffStore } from "@/store/hostelStaffStore";
import { StaffProfileCard } from "@/components/hostel/staff/StaffProfileCard";

export default function StaffDetailsPage() {
  const { staff, loading } = useHostelStaffStore();
  return <StaffDetails staff={staff} />;
}
