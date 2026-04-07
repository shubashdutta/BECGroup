"use client";
import { HostelStudentDetails } from "@/components/hostel/student/HostelStudentDetails";
import { fetchHostelStudentDetails } from "@/lib/api/hostel/student";
import { useHostelStudentStore } from "@/store/hostelStudentStore";
import { StudentRoomCard } from "@/components/hostel/student/StudentRoomCard";

export default function HostelStudentDetailsPage() {
  const { studentDetails, room } = useHostelStudentStore();
  return <HostelStudentDetails details={studentDetails} room={room} />;
}
