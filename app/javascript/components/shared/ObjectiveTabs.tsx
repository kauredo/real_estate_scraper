import React from "react";
import { i18n } from "../../languages/languages";

interface Props {
  objective: number;
  objectives: { objective: string; index: number }[];
  setObjective: (value: number) => void;
}

export default function ObjectiveTabs(props: Props) {
  const { objective, objectives, setObjective } = props;

  const setTab = (index: number) => e => {
    e.preventDefault();
    setObjective(index);
  };

  return (
    <div className="w-full flex gap-2 mb-4 border-b border-gray-300">
      {Object.entries(objectives).map(([key, index]) => {
        if (typeof key !== "string" || typeof index !== "number") {
          return null;
        }

        const isActive = objective == index;
        const tabClasses = [
          "px-4 pt-2 pb-1",
          "rounded-t-md",
          "transition-colors duration-200 ease-in-out",
          isActive ? "bg-beige text-white" : "bg-gray-200 hover:bg-gray-300",
          isActive
            ? "border-b-2 border-beige"
            : "border-b-2 border-transparent",
        ].join(" ");

        return (
          <button key={index} onClick={setTab(index)} className={tabClasses}>
            {i18n.t(`listing.objective.${key}`)}
          </button>
        );
      })}
    </div>
  );
}
