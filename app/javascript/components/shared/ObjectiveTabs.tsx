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
    <div className="w-full flex gap-2 mb-4 border-b border-gray-200 dark:border-beige-dark">
      {Object.entries(objectives).map(([key, index]) => {
        if (typeof key !== "string" || typeof index !== "number") {
          return null;
        }

        const isActive = objective == index;
        const tabClasses = [
          "px-4 pt-2 pb-1",
          "rounded-t-md",
          "transition-colors duration-200 ease-in-out",
          isActive
            ? "bg-beige-default dark:bg-beige-dark text-white dark:text-dark"
            : "bg-gray-200 hover:bg-gray-200 dark:bg-dark dark:hover:bg-gray-700 text-gray-800 dark:text-light",
          isActive
            ? "border-b-2 border-beige-default dark:border-beige-dark"
            : "border-b-2 border-transparent dark:border-gray-700 dark:border",
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
