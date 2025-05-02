import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StatsFilter } from "../../utils/interfaces";

interface Props {
  listingMaxPrice: number;
  statsKeys: string[];
  statsFilters: Partial<StatsFilter>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setStatsFilters: (value: React.SetStateAction<Partial<StatsFilter>>) => void;
  handleStatChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function AdvancedSearch(props: Props) {
  const { t, i18n } = useTranslation();
  const { statsKeys, statsFilters, handleStatChange, title, setTitle } = props;
  const relevantStatsFilters = Object.fromEntries(
    Object.entries(statsFilters).filter(([key]) =>
      statsKeys.includes(key.replace("_eq", ""))
    )
  );

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(
    Object.values(relevantStatsFilters).some(value => value !== "") ||
      title !== ""
  );

  // Show advanced search if user clicks on a link, otherwise hide it
  const toggleAdvancedSearch = e => {
    e.preventDefault();
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const acceptedStatsFilters = Object.values(t("listing.stats"));
  const acceptedKeys = statsKeys.filter(key =>
    acceptedStatsFilters.includes(key)
  );

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
          <label htmlFor="q_title_or_address_cont" className="block mb-1">
            {t("listing.search.name")}
          </label>
          <input
            type="text"
            id="q_title_cont"
            name="q[title_cont]"
            value={title}
            placeholder={t("listing.search.name_placeholder")}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.form?.submit();
              }
            }}
            className="w-full p-2 rounded-md border border-gray-200 bg-white dark:bg-light dark:text-black"
          />
        </div>
        {/* New stats fields */}
        {acceptedKeys.map(key => {
          return (
            <div key={key} className="w-full md:w-[calc((23%/2)-0.75rem)]">
              <label htmlFor={`q_${key}`} className="block mb-1">
                {t(`listing.stats.${key.toLowerCase()}`)}
              </label>
              <select
                id={`q_${key}`}
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
          );
        })}
      </div>
    </div>
  );
}
