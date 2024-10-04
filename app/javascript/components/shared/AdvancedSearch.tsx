import React, { useState } from "react";
import { sanitizeURL } from "../utils/Functions";
import { i18n } from "../../languages/languages";
import { StatsFilter } from "../utils/Interfaces";

interface Props {
  listingMaxPrice: number;
  statsKeys: string[];
  statsFilters: Partial<StatsFilter>;
  setStatsFilters: (value: React.SetStateAction<Partial<StatsFilter>>) => void;
}

export default function AdvancedSearch(props: Props) {
  const { statsKeys, statsFilters, setStatsFilters } = props;
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(
    Object.values(statsFilters).some(value => value !== "")
  );

  const handleStatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const modifiedName = name.replace("q[", "").replace("]", "");
    setStatsFilters(prev => ({ ...prev, [modifiedName]: value }));
  };

  // Show advanced search if user clicks on a link, otherwise hide it
  const toggleAdvancedSearch = e => {
    e.preventDefault();
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={toggleAdvancedSearch}
        className="text-beige text-lg font-bold underline text-left mb-2"
      >
        {i18n.t("listing.advanced_search")} {showAdvancedSearch ? "▲" : "▼"}
      </button>
      <div
        className={`w-full flex flex-wrap align-center gap-6 mb-4 ${
          showAdvancedSearch ? "block" : "hidden"
        }`}
      >
        {/* New stats fields */}
        {statsKeys.map(key => {
          return (
            <div key={key} className="w-full md:w-[23%]">
              <label htmlFor={`q_${key}`} className="block mb-1">
                {i18n.t(`listing.stats.${key.toLowerCase()}`)}
              </label>
              <input
                type="text"
                id={`q_${key}`}
                name={`q[${key}_eq]`}
                value={statsFilters?.[`${key}_eq`] || ""}
                onChange={handleStatChange}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.form?.submit();
                  }
                }}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
