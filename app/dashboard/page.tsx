"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { fetchDashboardData } from "@/lib/api/dashboard";
import { useDashboardStore } from "@/store/dashboardStore";
import { DashboardChart } from "@/components/dashboard/DashboardChart";

export default function DashboardPage() {
  const { stats, charts, recentActivity } = useDashboardStore();
  return (
    <DashboardLayout>
      <DashboardStats stats={stats} />
      <DashboardChart data={charts} />
    </DashboardLayout>
  );
}
