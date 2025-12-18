import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";

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
          <Button
            key={obj}
            onClick={() => setObjective(index)}
            className={`py-2 px-4 rounded-lg font-bold w-[calc(50%-0.25rem)] ${
              objective === index
                ? "bg-beige-default dark:bg-beige-medium text-white dark:text-dark"
                : "bg-transparent text-beige-default dark:text-beige-medium border border-beige-default dark:border-beige-medium"
            }`}
          >
            {t(`listing.objective.${obj}`)}
          </Button>
        ))}
      </div>
    </div>
  );
}
