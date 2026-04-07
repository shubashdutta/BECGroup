"use client";
import { ProgramDetails } from "@/components/search/ProgramDetails";
import { fetchProgramById } from "@/lib/api/programs";
import { useProgramStore } from "@/store/programStore";
import { ProgramEnrollButton } from "@/components/search/ProgramEnrollButton";

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const { program, loading } = useProgramStore();
  return <ProgramDetails program={program} id={params.id} />;
}
