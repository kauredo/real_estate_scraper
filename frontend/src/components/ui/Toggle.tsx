import React, { useState } from "react";

interface Props {
  labels: string[];
  icons: React.ReactNode[];
  toggled: boolean;
  onClick: (toggled: boolean) => void;
}

export default function Toggle(props: Props) {
  const { labels, toggled, onClick } = props;
  const [isToggled, toggle] = useState(toggled);
  const [, lastLabel] = labels;
  const [firstIcon, lastIcon] = props.icons;

  const callback = () => {
    const newState = !isToggled;
    toggle(newState);
    onClick(newState);
  };

  return (
    <div className="toggler flex justify-end items-center">
      <span className="mr-2 icon text-gray-700 dark:text-gray-300">
        {firstIcon}
      </span>
      <button
        role="switch"
        aria-checked={isToggled}
        aria-label={lastLabel}
        onClick={callback}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default ${
          isToggled
            ? "bg-beige-default dark:bg-beige-medium"
            : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`${
            isToggled ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white dark:bg-gray-100 rounded-full transition-transform shadow-sm`}
        />
      </button>
      <span className="ml-2 icon text-gray-700 dark:text-gray-300">
        {lastIcon}
      </span>
    </div>
  );
}
