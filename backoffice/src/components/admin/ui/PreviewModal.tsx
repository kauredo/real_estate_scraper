/* eslint-disable no-restricted-syntax, i18next/no-literal-string */
import React, { useState } from "react";
import { Modal, Button } from "./";

type DeviceType = "desktop" | "tablet" | "mobile";

interface DeviceConfig {
  name: string;
  width: string;
  height: string;
  icon: React.ReactNode;
}

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewUrl: string;
  title?: string;
}

const DEVICES: Record<DeviceType, DeviceConfig> = {
  desktop: {
    name: "Desktop",
    width: "100%",
    height: "100%",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  tablet: {
    name: "Tablet",
    width: "768px",
    height: "1024px",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  mobile: {
    name: "Mobile",
    width: "375px",
    height: "667px",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
};

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  previewUrl,
  title = "Preview",
}) => {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [isLoading, setIsLoading] = useState(true);

  const currentDevice = DEVICES[device];

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="full"
      className="h-screen"
    >
      {/* Device Switcher */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          {(Object.keys(DEVICES) as DeviceType[]).map((deviceType) => (
            <Button
              key={deviceType}
              onClick={() => {
                setDevice(deviceType);
                setIsLoading(true);
              }}
              variant={device === deviceType ? "primary" : "secondary"}
              size="sm"
              className="flex items-center gap-2"
            >
              {DEVICES[deviceType].icon}
              <span className="hidden sm:inline">
                {DEVICES[deviceType].name}
              </span>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {currentDevice.width} × {currentDevice.height}
          </span>
          <Button onClick={onClose} variant="secondary" size="sm">
            Close
          </Button>
        </div>
      </div>

      {/* Preview Frame */}
      <div
        className="relative flex items-center justify-center bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden"
        style={{ height: "calc(100vh - 200px)" }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Loading preview...
              </p>
            </div>
          </div>
        )}

        <iframe
          key={device}
          src={previewUrl}
          title="Content Preview"
          onLoad={handleIframeLoad}
          className="bg-white dark:bg-gray-900 shadow-xl"
          style={{
            width: currentDevice.width,
            height: currentDevice.height,
            maxWidth: "100%",
            maxHeight: "100%",
            border: "1px solid #e5e7eb",
            borderRadius: device !== "desktop" ? "8px" : "0",
          }}
        />
      </div>
    </Modal>
  );
};

export default PreviewModal;
