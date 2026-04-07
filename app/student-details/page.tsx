"use client";
import { StudentDetails } from "@/components/student/StudentDetails";
import { fetchStudentDetails } from "@/lib/api/student/details";
import { useStudentStore } from "@/store/studentStore";
import { StudentDocuments } from "@/components/student/StudentDocuments";
import { StudentTimeline } from "@/components/student/StudentTimeline";

export default function StudentDetailsPage() {
  const { studentDetails, documents, timeline } = useStudentStore();
  return <StudentDetails details={studentDetails} documents={documents} />;
}
