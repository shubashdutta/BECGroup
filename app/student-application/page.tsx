"use client";
import { ApplicationForm } from "@/components/student/application/ApplicationForm";
import { submitApplication } from "@/lib/api/student/application";
import { useApplicationStore } from "@/store/applicationStore";
import { ApplicationStatus } from "@/components/student/application/ApplicationStatus";

export default function StudentApplicationPage() {
  const { application, submit, status } = useApplicationStore();
  return <ApplicationForm application={application} onSubmit={submit} status={status} />;
}
