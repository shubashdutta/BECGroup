"use client";
import { NotificationCenter } from "@/components/notification/NotificationCenter";
import { fetchNotifications } from "@/lib/api/notifications";
import { useNotificationStore } from "@/store/notificationStore";

export default function NotificationPage() {
  const { notifications, unreadCount } = useNotificationStore();
  return <NotificationCenter data={notifications} unread={unreadCount} />;
}
