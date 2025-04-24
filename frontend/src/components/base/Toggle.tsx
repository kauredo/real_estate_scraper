import React, { useState } from "react";

interface Props {
  labels: string[];
  icons: any[];
  toggled: boolean;
  onClick: (toggled: boolean) => void;
}

export default function Toggle(props: Props) {
  const { labels, toggled, onClick } = props;
  const [isToggled, toggle] = useState(toggled);
  const [firstLabel, lastLabel] = labels;
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
