"use client";
import { CouncilList } from "@/components/council/CouncilList";
import { fetchCouncilMembers } from "@/lib/api/council";
import { useCouncilStore } from "@/store/councilStore";
import { CouncilCard } from "@/components/council/CouncilCard";

export default function CouncilPage() {
  const { members, loading } = useCouncilStore();
  return <CouncilList members={members} />;
}
