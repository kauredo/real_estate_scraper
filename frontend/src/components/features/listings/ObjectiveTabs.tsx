import React from "react";
import { useTranslation } from "react-i18next";
import Tabs from "@/components/ui/Tabs";

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

  const tabs = objectives.map(({ objective: obj, index }) => ({
    id: index.toString(),
    label: t(`listing.objective.${obj}`),
    content: null,
  }));

  return (
    <div className="mb-6">
      <Tabs
        tabs={tabs}
        activeTab={objective.toString()}
        onTabChange={(tabId: string) => setObjective(Number(tabId))}
        variant="pills"
        centered
      />
    </div>
  );
}
