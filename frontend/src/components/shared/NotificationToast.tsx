import React, { useEffect, useState } from "react";
import {
  Notification,
  useNotifications,
} from "../../context/NotificationContext";
import { Button } from "../ui/Button";
import { CloseIcon } from "../svgs/CloseIcon";

interface ToastProps {
  notification: Notification;
}

const Toast: React.FC<ToastProps> = ({ notification }) => {
  const { hideNotification } = useNotifications();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      hideNotification(notification.id);
    }, 300); // Match exit animation duration
  };

  const getIconAndColors = () => {
    switch (notification.type) {
      case "success":
        return {
          icon: "✓",
          bgColor: "bg-green-100 border-green-400",
          textColor: "text-green-700",
          iconBg: "bg-green-500",
        };
      case "error":
        return {
          icon: "✕",
          bgColor: "bg-red-100 border-red-400",
          textColor: "text-red-700",
          iconBg: "bg-red-500",
        };
      case "warning":
        return {
          icon: "⚠",
          bgColor: "bg-yellow-100 border-yellow-400",
          textColor: "text-yellow-700",
          iconBg: "bg-yellow-500",
        };
      case "info":
      default:
        return {
          icon: "ℹ",
          bgColor: "bg-blue-100 border-blue-400",
          textColor: "text-blue-700",
          iconBg: "bg-blue-500",
        };
    }
  };

  const { icon, bgColor, textColor, iconBg } = getIconAndColors();

  return (
    <div
      className={`
        ${bgColor} ${textColor} px-4 py-3 rounded-lg border shadow-lg max-w-md w-full
        transform transition-all duration-300 ease-in-out
        ${
          isVisible && !isLeaving
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }
      `}
      role="alert"
    >
      <div className="flex items-start">
        <div
          className={`${iconBg} text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mr-3 mt-0.5`}
        >
          {icon}
        </div>
        <div className="flex-1">
          {notification.title && (
            <div className="font-semibold text-sm mb-1">
              {notification.title}
            </div>
          )}
          <div className="text-sm">{notification.message}</div>
        </div>
        <Button
          onClick={handleClose}
          className={`${textColor} hover:${textColor.replace(
            "700",
            "900",
          )} ml-2 flex-shrink-0`}
          aria-label="Close notification"
        >
          <CloseIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const NotificationToastContainer: React.FC = () => {
  const { notifications } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationToastContainer;
