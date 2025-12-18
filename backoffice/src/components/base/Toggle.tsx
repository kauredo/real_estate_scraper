/* eslint-disable no-restricted-syntax */
import { useState } from "react";

interface Props {
  labels: string[];
  icons: React.ReactNode[];
  toggled: boolean;
  onClick: (toggled: boolean) => void;
}

export default function Toggle(props: Props) {
  const { toggled, onClick } = props;
  const [isToggled, toggle] = useState(toggled);
  const [firstIcon, lastIcon] = props.icons;

  const callback = () => {
    toggle(!isToggled);
    onClick(!isToggled);
  };

  return (
    <div className="toggler flex justify-end items-center">
      <span className="mr-2 icon">{firstIcon}</span>
      <label>
        <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
        <span className="toggle" />
      </label>
      <span className="ml-2 icon">{lastIcon}</span>
    </div>
  );
}
