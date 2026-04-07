// /* eslint-disable no-undef */

/* eslint-disable no-undef */

importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyD3Q_F11Lo9EMxfg63yu4B6GGc6BeFzLt4",
  authDomain: "babyeducation-bb3fc.firebaseapp.com",
  projectId: "babyeducation-bb3fc",
  storageBucket: "babyeducation-bb3fc.appspot.com",
  messagingSenderId: "340913629626",
  appId: "1:340913629626:web:724b03549d0be168ab1583",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.data?.title || "New Notification";
  const body = payload.data?.body || "";

  self.registration.showNotification(title, {
    body,
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: payload.data,
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const urlToOpen =
    event.notification.data?.url || "https://babyeducation.com.np/login";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      }),
  );
});
