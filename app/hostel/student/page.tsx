"use client";
import { HostelStudentList } from "@/components/hostel/student/HostelStudentList";
import { fetchHostelStudents } from "@/lib/api/hostel/student";
import { useHostelStudentStore } from "@/store/hostelStudentStore";

export default function HostelStudentPage() {
  const { students, loading } = useHostelStudentStore();
  return <HostelStudentList students={students} />;
}
