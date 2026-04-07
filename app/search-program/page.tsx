"use client";
import { ProgramSearch } from "@/components/search/ProgramSearch";
import { fetchPrograms } from "@/lib/api/programs";
import { useProgramStore } from "@/store/programStore";
import { ProgramFilter } from "@/components/search/ProgramFilter";
import { ProgramCard } from "@/components/search/ProgramCard";

export default function SearchProgramPage() {
  const { programs, filters, search } = useProgramStore();
  return <ProgramSearch programs={programs} filters={filters} onSearch={search} />;
}
