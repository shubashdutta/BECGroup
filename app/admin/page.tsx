"use client";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { fetchAdminStats } from "@/lib/api/admin";
import { useAdminStore } from "@/store/adminStore";
import { withAdminAuth } from "@/middleware/adminAuth";

export default function AdminPage() {
  const { stats, permissions } = useAdminStore();
  return <AdminDashboard stats={stats} permissions={permissions} />;
}
