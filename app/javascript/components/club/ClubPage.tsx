import React from "react";
import { i18n } from "../../languages/languages";
import { sanitizeURL } from "../utils/Functions";

export default function ClubPage() {
  const sections = [
    {
      path: window.Routes.club_social_partners_path,
      title: i18n.t("navbar.club_social_partners"),
      description: i18n.t("club.social_partners_description"),
    },
    {
      path: window.Routes.club_home_tailor_partners_path,
      title: i18n.t("navbar.club_home_tailor"),
      description: i18n.t("club.home_tailor_description"),
    },
    {
      path: window.Routes.club_rules_path,
      title: i18n.t("navbar.club_rules"),
      description: i18n.t("club.rules_description"),
    },
    {
      path: window.Routes.club_stories_path,
      title: i18n.t("navbar.club_stories"),
      description: i18n.t("club.stories_description"),
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-dark dark:text-light">
          {i18n.t("club.header")}
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
          {sections.map(section => (
            <a
              key={section.path}
              href={sanitizeURL(section.path)}
              className="transform hover:scale-105 transition-transform duration-200"
              data-turbo="true"
            >
              <div className="bg-white dark:bg-dark shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-dark dark:text-light">
                  {section.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {section.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
