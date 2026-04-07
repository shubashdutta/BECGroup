"use client";
import { UserDashboard } from "@/components/user/UserDashboard";
import { fetchUserData } from "@/lib/api/user";
import { useUserStore } from "@/store/userStore";
import { UserProfileCard } from "@/components/user/UserProfileCard";
import { UserActivityLog } from "@/components/user/UserActivityLog";

export default function UserPage() {
  const { user, activity, loading } = useUserStore();
  return <UserDashboard user={user} activity={activity} />;
}
