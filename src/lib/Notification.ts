// firebaseNotification.ts
import { baseUrl } from "@/config";
import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";
import { getJwtToken } from "../utils/auth";

interface FcmTokenRequest {
  fcmToken: string;
}

/**
 * Request notification permission,
 * generate FCM token,
 * send token to backend,
 * and LOG backend response
 */
export const requestPermissionAndSendToken = async (): Promise<
  string | null
> => {
  if (!messaging) return null;

  try {
    // 1️⃣ Ask permission
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.warn("❌ Notification permission denied");
      return null;
    }

    // 2️⃣ Get FCM token
    const fcmToken = await getToken(messaging, {
      vapidKey:
        "BHdkRm4hrZSKb_1PnIvPKZw5YkeRHvTyUII6yjm-7zMWECkM-OEO9hMUXfmuvHLZHqyMeIurlb78DmViv-o9nEA",
    });

    if (!fcmToken) {
      console.warn("❌ FCM token not generated");
      return null;
    }

    // 3️⃣ Send token to backend
    const jwt = getJwtToken();
    const payload: FcmTokenRequest = { fcmToken };

    const response = await fetch(`${baseUrl}api/webpush/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(jwt && { Authorization: `Bearer ${jwt}` }),
      },
      body: JSON.stringify(payload),
    });

    // 4️⃣ Log backend response
    const contentType = response.headers.get("content-type");
    const responseData =
      contentType && contentType.includes("application/json")
        ? await response.json()
        : await response.text();

    return fcmToken;
  } catch (error) {
    console.error("❌ Error in FCM setup:", error);
    return null;
  }
};

/**
 * Listen for FOREGROUND messages (ACTIVE TAB)
 * Shows native browser notification (same as background)
 */
export const listenForMessages = () => {
  if (!messaging) return;

  onMessage(messaging, (payload) => {
    const title = payload.data?.title || "New Notification";
    const body = payload.data?.body || "";

    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/favicon.ico", // ✅ ROOT favicon
        badge: "/favicon.ico",
        data: payload.data,
      });
    }
  });
};
