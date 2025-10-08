import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  objective: number;
  objectives: Array<{ objective: string; index: number }>;
  setObjective: React.Dispatch<React.SetStateAction<number>>;
}

export default function ObjectiveTabs({
  objective,
  objectives = [],
  setObjective,
}: Props) {
  const { t } = useTranslation();

  if (!Array.isArray(objectives) || objectives.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex align-center gap-6 mb-4">
      <div className="w-full flex gap-2">
        {objectives.map(({ objective: obj, index }) => (
          <button
            key={obj}
            type="button"
            onClick={() => setObjective(index)}
            className={`py-2 px-4 rounded-lg font-bold w-[calc(50%-0.25rem)] ${
              objective === index
                ? "bg-primary-600 dark:bg-primary-500 text-white dark:text-dark"
                : "bg-transparent text-primary-600 dark:text-beige-medium border border-primary-600 dark:border-primary-500"
            }`}
          >
            {t(`listing.objective.${obj}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
