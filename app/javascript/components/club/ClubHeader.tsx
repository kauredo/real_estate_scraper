import React from "react";
import { i18n } from "../../languages/languages";
import { isDarkModeActive } from "../utils/Functions";

export default function ClubHeader() {
  return (
    <div className="relative w-full max-w-4xl flex flex-col items-center mb-12">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent dark:via-dark/5 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center">
        <img
          src={
            isDarkModeActive() ? "/logos/club-dark.webp" : "/logos/club.webp"
          }
          alt="Club SGG Logo"
          className="w-36 md:w-40 mb-6" // Reduced width by 50%
          loading="lazy"
        />
        <p className="text-sm md:text-base font-medium text-dark/80 dark:text-light/80 text-center max-w-2xl">
          {i18n.t("club.home.subtitle")}
        </p>
      </div>
    </div>
  );
}
