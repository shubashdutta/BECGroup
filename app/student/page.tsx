"use client";
import { StudentDashboard } from "@/components/student/StudentDashboard";
import { fetchStudentData } from "@/lib/api/student";
import { useStudentStore } from "@/store/studentStore";
import { StudentStats } from "@/components/student/StudentStats";
import { StudentActivity } from "@/components/student/StudentActivity";

export default function StudentPage() {
  const { student, stats, activity } = useStudentStore();
  return (
    <StudentDashboard>
      <StudentStats stats={stats} />
      <StudentActivity activity={activity} />
    </StudentDashboard>
  );
}
