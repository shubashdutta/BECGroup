"use client";
import { TeamList } from "@/components/teams/TeamList";
import { fetchTeams } from "@/lib/api/teams";
import { useTeamStore } from "@/store/teamStore";
import { TeamCard } from "@/components/teams/TeamCard";

export default function TeamsPage() {
  const { teams, loading } = useTeamStore();
  return <TeamList teams={teams} />;
}
