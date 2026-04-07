import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyD3Q_F11Lo9EMxfg63yu4B6GGc6BeFzLt4",
  authDomain: "babyeducation-bb3fc.firebaseapp.com",
  projectId: "babyeducation-bb3fc",
  storageBucket: "babyeducation-bb3fc.appspot.com",
  messagingSenderId: "340913629626",
  appId: "1:340913629626:web:724b03549d0be168ab1583",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Messaging safely
export const messaging = (() => {
  if (typeof window === "undefined") {
    return null;
  }
  
  try {
    // Ensure Firebase app is properly initialized before getting messaging
    const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    return getMessaging(firebaseApp);
  } catch (error) {
    console.error("Failed to initialize Firebase Messaging:", error);
    return null;
  }
})();
