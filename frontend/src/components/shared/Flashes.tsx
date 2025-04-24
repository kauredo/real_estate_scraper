import React, { useEffect, useState } from "react";

interface Props {
  type: string;
  message: string;
}

export default function Flashes(props: Props): JSX.Element {
  const [visible, setVisible] = useState(false);
  const { type, message } = props;

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);

  if (!visible) {
    return <></>;
  }

  return (
    <div
      className={`container mx-auto absolute top-0 left-0 right-0 z-50 border px-4 py-3 rounded ${
        type === "error"
          ? "bg-red-100 border-red-400 text-red-700"
          : "bg-blue-100 border-blue-400 text-blue-700"
      }`}
      role="alert"
    >
      <div className="relative container mx-auto">
        <span className="block sm:inline">{message}</span>
        <span
          onClick={() => setVisible(false)}
          className="absolute top-0 bottom-0 right-0"
        >
          <svg
            className={`fill-current h-6 w-6 ${
              type === "error" ? "text-red-500" : "text-blue-500"
            }`}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
