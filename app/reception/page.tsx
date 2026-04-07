"use client";
import { ReceptionDashboard } from "@/components/reception/ReceptionDashboard";
import { fetchReceptionStats } from "@/lib/api/reception";
import { useReceptionStore } from "@/store/receptionStore";

export default function ReceptionPage() {
  const { stats, loading } = useReceptionStore();
  return <ReceptionDashboard stats={stats} />;
}
