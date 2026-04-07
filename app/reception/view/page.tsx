"use client";
import { ReceptionView } from "@/components/reception/ReceptionView";
import { fetchReceptionData } from "@/lib/api/reception";
import { useReceptionStore } from "@/store/receptionStore";
import { VisitorLog } from "@/components/reception/VisitorLog";

export default function ReceptionViewPage() {
  const { visitors, appointments } = useReceptionStore();
  return <ReceptionView visitors={visitors} appointments={appointments} />;
}
