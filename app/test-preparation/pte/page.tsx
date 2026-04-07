"use client";
import { PtePrep } from "@/components/test/pte/PtePrep";
import { fetchPteData } from "@/lib/api/test/pte";
import { usePteStore } from "@/store/pteStore";
import { PteMockTest } from "@/components/test/pte/PteMockTest";

export default function PtePage() {
  const { content, mockTests } = usePteStore();
  return <PtePrep content={content} tests={mockTests} />;
}
