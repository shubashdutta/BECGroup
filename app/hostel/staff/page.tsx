"use client";
import { StaffList } from "@/components/hostel/staff/StaffList";
import { fetchHostelStaff } from "@/lib/api/hostel/staff";
import { useHostelStaffStore } from "@/store/hostelStaffStore";
import { StaffFilter } from "@/components/hostel/staff/StaffFilter";

export default function HostelStaffPage() {
  const { staffList, loading } = useHostelStaffStore();
  return <StaffList staff={staffList} />;
}
