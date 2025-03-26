import React from "react";
import { i18n } from "../../languages/languages";
import { sanitizeURL, sanitizeURLWithParams } from "../utils/Functions";
import { ClubStory } from "../utils/Interfaces";
import ClubStoryCard from "./ClubStoryCard";

interface Props {
  recent_stories: ClubStory[];
}

export default function ClubPage({ recent_stories }: Props) {
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
        <h1 className="text-3xl font-bold text-center mb-12 text-dark dark:text-light">
          {i18n.t("club.header")}
        </h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
          {sections.map(section => (
            <a
              key={section.path}
              href={sanitizeURL(section.path)}
              className="block h-full transform transition-all duration-300 hover:scale-102 hover:shadow-xl"
              data-turbo="true"
            >
              <div className="bg-white dark:bg-dark shadow-lg rounded-lg p-8 h-full flex flex-col justify-between">
                <h2 className="text-xl font-semibold mb-4 text-dark dark:text-light">
                  {section.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {section.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Stories Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light">
          {i18n.t("club.recent_stories.title")}
        </h2>
        <div
          id="recent-stories"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {recent_stories && recent_stories.length > 0 ? (
            recent_stories.map(story => (
              <ClubStoryCard key={story.id} story={story} />
            ))
          ) : (
            <div className="col-span-full text-center p-8 text-lg font-light bg-white dark:bg-dark rounded-lg shadow-lg">
              <h3>{i18n.t("club.stories.empty")}</h3>
            </div>
          )}
        </div>
      </section>

      {/* External Form Section */}
      <section className="mb-16">
        <div
          id="external-form"
          className="bg-white dark:bg-dark shadow-lg rounded-lg p-8 min-h-[400px]"
        >
          {/* External form will be embedded here */}
        </div>
      </section>

      {/* Content Sections */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-8 h-full">
          <h2 className="text-xl font-bold mb-6 text-dark dark:text-light">
            {i18n.t("club.sections.benefits")}
          </h2>
          {/* Content */}
        </section>

        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-8 h-full">
          <h2 className="text-xl font-bold mb-6 text-dark dark:text-light">
            {i18n.t("club.sections.partners")}
          </h2>
          {/* Content */}
        </section>
      </div>
    </div>
  );
}
