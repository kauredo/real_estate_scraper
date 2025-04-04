import React from "react";
import { i18n } from "../../languages/languages";
import { isDarkModeActive } from "../utils/Functions";

export default function ClubHeader() {
  return (
    <div className="flex flex-col items-center mb-16">
      <img
        src={isDarkModeActive() ? "/logos/club-dark.webp" : "/logos/club.webp"}
        alt="Club SGG Logo"
        className="w-64 mb-4"
        loading="lazy"
      />
      <p className="text-lg font-medium text-dark dark:text-light italic">
        {i18n.t("club.home.subtitle")}
      </p>
    </div>
  );
}
