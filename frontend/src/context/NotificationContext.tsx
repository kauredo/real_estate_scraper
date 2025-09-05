import React, { createContext, useContext, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  title?: string;
  message: string;
  duration?: number;
  persistent?: boolean;
}

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

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const showNotification = (notification: Omit<Notification, "id">) => {
    const id = generateId();
    const newNotification: Notification = {
      id,
      duration: 5000, // Default 5 seconds
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-hide notification unless it's persistent
    if (!newNotification.persistent && newNotification.duration! > 0) {
      setTimeout(() => {
        hideNotification(id);
      }, newNotification.duration);
    }
  };

  const showSuccess = (
    message: string,
    options: Partial<Notification> = {}
  ) => {
    showNotification({
      type: "success",
      message,
      title: options.title || t("notifications.success.title"),
      ...options,
    });
  };

  const showError = (message: string, options: Partial<Notification> = {}) => {
    showNotification({
      type: "error",
      message,
      title: options.title || t("notifications.error.title"),
      duration: 8000, // Longer duration for errors
      ...options,
    });
  };

  const showWarning = (
    message: string,
    options: Partial<Notification> = {}
  ) => {
    showNotification({
      type: "warning",
      message,
      title: options.title || t("notifications.warning.title"),
      ...options,
    });
  };

  const showInfo = (message: string, options: Partial<Notification> = {}) => {
    showNotification({
      type: "info",
      message,
      title: options.title || t("notifications.info.title"),
      ...options,
    });
  };

  const hideNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotification,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        hideNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
