import React, { useEffect, useState } from "react";
import { Button } from "../admin/ui";

interface Props {
  type: string;
  message: string;
  onClose?: () => void;
}

export default function Flashes(props: Props): React.JSX.Element {
  const [visible, setVisible] = useState(false);
  const { type, message, onClose } = props;

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          setTimeout(onClose, 300); // Delay to allow fade animation
        }
      }, 5000); // Increased to 5 seconds for better UX

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  if (!visible || !message) {
    return <></>;
  }

  const getFlashStyles = () => {
    switch (type) {
      case "error":
        return "bg-red-100 border-red-400 text-red-700 dark:bg-red-900/20 dark:border-red-600 dark:text-red-400";
      case "success":
        return "bg-green-100 border-green-400 text-green-700 dark:bg-green-900/20 dark:border-green-600 dark:text-green-400";
      case "warning":
        return "bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-600 dark:text-yellow-400";
      default: // notice/info
        return "bg-blue-100 border-blue-400 text-blue-700 dark:bg-blue-900/20 dark:border-blue-600 dark:text-blue-400";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "error":
        return "text-red-500 dark:text-red-400";
      case "success":
        return "text-green-500 dark:text-green-400";
      case "warning":
        return "text-yellow-500 dark:text-yellow-400";
      default:
        return "text-blue-500 dark:text-blue-400";
    }
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 border px-4 py-3 rounded-lg shadow-lg max-w-md transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      } ${getFlashStyles()}`}
      role="alert"
    >
      <div className="flex items-start justify-between">
        <span className="block pr-8">{message}</span>
        <Button
          onClick={handleClose}
          variant="link"
          className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <svg
            className={`h-4 w-4 ${getIconColor()}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </Button>
      </div>
    </div>
  );
}
