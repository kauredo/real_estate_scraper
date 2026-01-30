import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StatsFilter } from "@/utils/interfaces";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface Props {
  listingMaxPrice: number;
  statsKeys: string[];
  statsFilters: Partial<StatsFilter>;
  setStatsFilters: React.Dispatch<React.SetStateAction<Partial<StatsFilter>>>;
  handleStatChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function AdvancedSearch({
  statsKeys,
  statsFilters,
  handleStatChange,
  title,
  setTitle,
}: Props) {
  const { t } = useTranslation();
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(
    Object.values(statsFilters).some((value) => value !== "") || title !== "",
  );

  const toggleAdvancedSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const acceptedStatsFilters =
    Object.values(t("listing.stats", { returnObjects: true })) || [];
  const acceptedKeys = statsKeys.filter((key) =>
    acceptedStatsFilters.includes(key),
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <div className="mb-6">
      <Button
        onClick={toggleAdvancedSearch}
        variant="ghost"
        className="mb-4"
        aria-expanded={showAdvancedSearch}
        aria-controls="advanced-search-panel"
      >
        {t("listing.advanced_search")} {showAdvancedSearch ? "▲" : "▼"}
      </Button>
      {showAdvancedSearch && (
        <div
          id="advanced-search-panel"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="q_title_cont"
              className="block mb-2 font-medium text-sm"
            >
              {t("listing.search.name")}
            </label>
            <Input
              type="text"
              id="q_title_cont"
              name="q[title_cont]"
              value={title}
              placeholder={t("listing.search.name_placeholder")}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {acceptedKeys.map((key) => (
            <div key={key}>
              <label
                htmlFor={`q_${key}_eq`}
                className="block mb-2 font-medium text-sm"
              >
                {t(`listing.stats.${key.toLowerCase()}`)}
              </label>
              <Select
                id={`q_${key}_eq`}
                name={`q[${key}_eq]`}
                value={statsFilters?.[`${key}_eq`] || ""}
                onChange={handleStatChange}
              >
                <option value="">{t("listing.search.any")}</option>
                {[...Array(11).keys()].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
