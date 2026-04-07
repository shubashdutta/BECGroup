"use client";
import { NotificationList } from "@/components/notification/NotificationList";
import { fetchAllNotifications } from "@/lib/api/notifications";
import { useNotificationStore } from "@/store/notificationStore";
import { NotificationFilter } from "@/components/notification/NotificationFilter";

export default function AllNotificationPage() {
  const { notifications, markAsRead } = useNotificationStore();
  return <NotificationList data={notifications} onRead={markAsRead} />;
}
