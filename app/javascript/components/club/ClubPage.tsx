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
      <div className="flex flex-col items-center justify-center pt-12">
        <h1 className="text-3xl font-bold text-center mb-4 text-dark dark:text-light">
          {i18n.t("club.home.title")}
        </h1>
        <p className="text-xl font-bold mb-8 text-dark dark:text-light text-center">
          {i18n.t("club.home.subtitle")}
        </p>

        <div className="flex flex-wrap gap-6 mb-16 w-full max-w-4xl justify-center">
          {sections.map(section => (
            <a
              key={section.path}
              href={sanitizeURL(section.path)}
              className="block transform transition-all duration-200 hover:shadow-2xl w-full md:w-1/3 h-38 bg-white dark:bg-dark border dark:border-beige-medium"
              data-turbo="true"
            >
              <div className="rounded-lg p-8 h-full flex flex-col justify-between h-full">
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

        <section className="w-full max-w-4xl mb-16">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.home.dignity.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-12">
              {i18n.t("club.home.dignity.description")}
            </p>

            {/* Recent Stories Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light">
                {i18n.t("club.recent_stories.title")}
              </h2>
              <div
                id="recent-stories"
                className="flex flex-wrap gap-6 justify-center"
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

            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.home.contribute.title")}
            </h2>
            <p className="text-xl font-semibold mb-4 text-dark dark:text-light">
              {i18n.t("club.home.contribute.subtitle")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {i18n.t("club.home.contribute.description")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {i18n.t("club.home.contribute.value_description")}
            </p>
            <p className="text-xl font-bold mb-12">
              {i18n.t("club.home.contribute.cta")}
            </p>

            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.home.partners.title")}
            </h2>
            <p className="text-xl font-semibold mb-4">
              {i18n.t("club.home.partners.subtitle")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {i18n.t("club.home.partners.description")}
            </p>
            <p
              className="text-gray-600 dark:text-gray-300 mb-4"
              dangerouslySetInnerHTML={{
                __html: i18n.t("club.home.partners.example_html"),
              }}
            ></p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {i18n.t("club.home.partners.conclusion")}
            </p>
            <p className="text-xl font-bold mb-12">
              {i18n.t("club.home.partners.cta")}
            </p>

            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.home.join.title")}
            </h2>
            <p className="text-xl font-semibold mb-4">
              {i18n.t("club.home.join.subtitle")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {i18n.t("club.home.join.description")}
            </p>
            <p className="text-xl font-bold mb-4">
              {i18n.t("club.home.join.impact")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.home.join.whatsapp")}
            </p>
            <a
              href="https://wa.me/351932829084"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-beige-default dark:bg-beige-medium text-dark dark:text-dark px-6 py-3 rounded-lg font-semibold mb-8 hover:shadow-2xl transition-all duration-200"
            >
              {i18n.t("club.home.join.cta")}
            </a>
            <p className="text-xl font-bold mb-12">
              {i18n.t("club.home.join.mission")}
            </p>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <a
                href={sanitizeURL(window.Routes.club_rules_path)}
                className="text-beige-default dark:text-beige-medium hover:underline block mb-8"
              >
                {i18n.t("club.home.know_more.rules")}
              </a>

              <h3 className="text-2xl font-bold mb-4">
                {i18n.t("club.home.know_more.help_title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {i18n.t("club.home.know_more.help_question")}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {i18n.t("club.home.know_more.help_description")}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {i18n.t("club.home.know_more.whatsapp")}
              </p>
              <a
                href="https://wa.me/351932829084"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-beige-default dark:bg-beige-medium text-dark dark:text-dark px-6 py-3 rounded-lg font-semibold hover:shadow-2xl transition-all duration-200"
              >
                {i18n.t("club.home.know_more.cta")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
