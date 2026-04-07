"use client";
import { SatPrep } from "@/components/test/sat/SatPrep";
import { fetchSatData } from "@/lib/api/test/sat";
import { useSatStore } from "@/store/satStore";
import { SatPracticeTest } from "@/components/test/sat/SatPracticeTest";

export default function SatPage() {
  const { content, practiceTests } = useSatStore();
  return <SatPrep content={content} tests={practiceTests} />;
}
