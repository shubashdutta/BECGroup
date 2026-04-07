"use client";
import { IeltsPrep } from "@/components/test/ielts/IeltsPrep";
import { fetchIeltsData } from "@/lib/api/test/ielts";
import { useIeltsStore } from "@/store/ieltsStore";
import { IeltsMockTest } from "@/components/test/ielts/IeltsMockTest";

export default function IeltsPage() {
  const { content, mockTests } = useIeltsStore();
  return <IeltsPrep content={content} tests={mockTests} />;
}
