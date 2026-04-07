"use client";
import { ClassList } from "@/components/student/classes/ClassList";
import { fetchStudentClasses } from "@/lib/api/student/classes";
import { useStudentClassStore } from "@/store/studentClassStore";
import { ClassSchedule } from "@/components/student/classes/ClassSchedule";

export default function StudentClassesPage() {
  const { classes, schedule } = useStudentClassStore();
  return <ClassList classes={classes} schedule={schedule} />;
}
