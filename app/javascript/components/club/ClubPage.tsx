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
        <h1 className="text-3xl font-bold text-center mb-8 text-dark dark:text-light">
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

      {/* Recent Stories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
          {i18n.t("club.recent_stories.title")}
        </h2>
        <div
          id="recent-stories"
          className="bg-white dark:bg-dark shadow-lg rounded-lg p-6"
        >
          {/* Recent stories content will be dynamically loaded */}
        </div>
      </section>

      {/* External Form Section */}
      <section className="mb-12">
        <div
          id="external-form"
          className="bg-white dark:bg-dark shadow-lg rounded-lg p-6 min-h-[400px]"
        >
          {/* External form will be embedded here */}
        </div>
      </section>

      {/* Content Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* These sections will be populated with content from the CMS */}
        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-dark dark:text-light">
            {i18n.t("club.sections.benefits")}
          </h2>
          {/* Content */}
        </section>

        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-dark dark:text-light">
            {i18n.t("club.sections.partners")}
          </h2>
          {/* Content */}
        </section>
      </div>
    </div>
  );
}
