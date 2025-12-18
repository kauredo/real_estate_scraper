import React, { useState } from "react";
import { Button } from "../ui/Button";

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
      <span className="mr-2 icon">{firstIcon}</span>
      <Button
        role="switch"
        aria-checked={isToggled}
        aria-label={lastLabel}
        onClick={callback}
        variant="outline"
        size="icon"
        className="relative inline-flex items-center h-6 rounded-full w-11"
      >
        <span
          className={`${
            isToggled ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </Button>
      <span className="ml-2 icon">{lastIcon}</span>
    </div>
  );
}
