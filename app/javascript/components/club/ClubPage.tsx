import React from "react";
import { i18n } from "../../languages/languages";
import { sanitizeURL, sanitizeURLWithParams } from "../utils/Functions";
import { ClubStory } from "../utils/Interfaces";

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
        <div id="recent-stories" className="flex flex-wrap gap-4">
          {recent_stories && recent_stories.length > 0 ? (
            recent_stories.map(story => (
              <div
                key={story.id}
                className="bg-white dark:bg-dark shadow-md border border-gray-200 rounded-lg min-w-[300px] max-w-sm w-full mb-5"
              >
                <div className="p-5">
                  <a
                    href={sanitizeURLWithParams(
                      window.Routes.club_story_path,
                      story.slug
                    )}
                  >
                    <h5 className="text-gray-900 dark:text-light font-bold text-xl tracking-tight mb-2">
                      {story.title}
                    </h5>
                  </a>
                  <p className="font-normal text-gray-700 dark:text-light mb-3 whitespace-pre-line">
                    {story.sample_text}
                  </p>
                  <a
                    href={sanitizeURLWithParams(
                      window.Routes.club_story_path,
                      story.slug
                    )}
                    className="bg-blue-300 hover:bg-blue-500 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    data-turbo="false"
                  >
                    {i18n.t("general.read_more")}
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center p-8 text-lg font-light">
              <h3>{i18n.t("club.stories.empty")}</h3>
            </div>
          )}
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
