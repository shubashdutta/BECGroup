"use client";
import { VisaGrantedList } from "@/components/visa/VisaGrantedList";
import { fetchVisaGranted } from "@/lib/api/visa";
import { useVisaStore } from "@/store/visaStore";
import { VisaCard } from "@/components/visa/VisaCard";
import { VisaStats } from "@/components/visa/VisaStats";

export default function VisaGrantedPage() {
  const { visaList, stats, loading } = useVisaStore();
  return <VisaGrantedList list={visaList} stats={stats} />;
}
