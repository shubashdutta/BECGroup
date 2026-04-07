"use client";
import { TestPrepDashboard } from "@/components/test/TestPrepDashboard";
import { fetchTestPrepData } from "@/lib/api/test";
import { useTestPrepStore } from "@/store/testPrepStore";
import { TestPrepCard } from "@/components/test/TestPrepCard";

export default function TestPrepPage() {
  const { tests, enrolled, loading } = useTestPrepStore();
  return <TestPrepDashboard tests={tests} enrolled={enrolled} />;
}
