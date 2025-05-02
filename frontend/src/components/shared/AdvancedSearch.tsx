import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StatsFilter } from "../../utils/interfaces";

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
    Object.values(statsFilters).some(value => value !== "") || title !== ""
  );

  const toggleAdvancedSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const acceptedStatsFilters =
    Object.values(t("listing.stats", { returnObjects: true })) || [];
  const acceptedKeys = statsKeys.filter(key =>
    acceptedStatsFilters.includes(key)
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
    <div className="flex flex-col">
      <button
        onClick={toggleAdvancedSearch}
        className="text-beige-default dark:text-beige-medium text-lg font-bold underline text-left mb-2"
      >
        {t("listing.advanced_search")} {showAdvancedSearch ? "▲" : "▼"}
      </button>
      <div
        className={`w-full flex flex-wrap align-center gap-6 mb-4 ${
          showAdvancedSearch ? "block" : "hidden"
        }`}
      >
        <div className="w-full md:w-[calc(46%+1.5rem)]">
          <label htmlFor="q_title_cont" className="block mb-1">
            {t("listing.search.name")}
          </label>
          <input
            type="text"
            id="q_title_cont"
            name="q[title_cont]"
            value={title}
            placeholder={t("listing.search.name_placeholder")}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            className="w-full p-2 rounded-md border border-gray-200 bg-white dark:bg-light dark:text-black"
          />
        </div>
        {acceptedKeys.map(key => (
          <div key={key} className="w-full md:w-[calc((23%/2)-0.75rem)]">
            <label htmlFor={`q_${key}_eq`} className="block mb-1">
              {t(`listing.stats.${key.toLowerCase()}`)}
            </label>
            <select
              id={`q_${key}_eq`}
              name={`q[${key}_eq]`}
              value={statsFilters?.[`${key}_eq`] || ""}
              onChange={handleStatChange}
              className="w-full p-2 rounded-md border border-gray-200 bg-white dark:bg-light dark:text-black h-[42px]"
            >
              <option value="">{t("listing.search.any")}</option>
              {[...Array(11).keys()].map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
