import { createContext } from "react";
import { Notification } from "@/utils/notification";

interface NotificationContextProps {
  notifications: Notification[];
  showNotification: (notification: Omit<Notification, "id">) => void;
  showSuccess: (message: string, options?: Partial<Notification>) => void;
  showError: (message: string, options?: Partial<Notification>) => void;
  showWarning: (message: string, options?: Partial<Notification>) => void;
  showInfo: (message: string, options?: Partial<Notification>) => void;
  hideNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const NotificationContext = createContext<
  NotificationContextProps | undefined
>(undefined);
