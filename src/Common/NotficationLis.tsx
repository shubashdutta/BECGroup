import { useEffect } from "react";
import {
  listenForMessages,
  requestPermissionAndSendToken,
} from "../lib/Notification";

const NotificationListener: React.FC = () => {
  useEffect(() => {
    requestPermissionAndSendToken();
    listenForMessages();
  }, []);

  return null; // Invisible component, just handles notifications
};

export default NotificationListener;
