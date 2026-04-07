"use client";
import { UniversityList } from "@/components/university/UniversityList";
import { fetchUniversities } from "@/lib/api/university";
import { useUniversityStore } from "@/store/universityStore";
import { UniversityFilter } from "@/components/university/UniversityFilter";
import { UniversityCard } from "@/components/university/UniversityCard";

export default function UniversityListPage() {
  const { universities, filters, loading } = useUniversityStore();
  return <UniversityList universities={universities} filters={filters} />;
}
