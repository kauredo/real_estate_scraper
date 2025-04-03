import React from "react";
import { i18n } from "../../languages/languages";
import {
  isDarkModeActive,
  sanitizeURL,
  scrollToSection,
} from "../utils/Functions";
import { ClubStory } from "../utils/Interfaces";
import ClubStoryCard from "./ClubStoryCard";
import SubNavbar from "../shared/SubNavbar";
import { clubSections } from "../utils/constants/clubSections";

interface Props {
  recent_stories: ClubStory[];
}

export default function ClubPage({ recent_stories }: Props) {
  return (
    <>
      <SubNavbar items={clubSections} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center pt-12">
          <div className="flex flex-col items-center mb-16">
            <img
              src={
                isDarkModeActive()
                  ? "/logos/club-dark.webp"
                  : "/logos/club.webp"
              }
              alt="Club SGG Logo"
              className="w-64 mb-4"
              loading="lazy"
            />
            <p className="text-lg font-medium text-dark dark:text-light italic">
              {i18n.t("club.home.subtitle")}
            </p>
          </div>

          <section className="w-full max-w-4xl mb-16">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div id="dignity" className="relative pb-16 overflow-hidden mb-8">
                <div className="absolute inset-0" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 text-dark dark:text-light">
                    {i18n.t("club.home.dignity.title")}
                  </h2>
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-200">
                    {i18n.t("club.home.dignity.description")}
                  </p>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-10">
                  <img
                    src="/logos/club-icon.webp"
                    alt=""
                    className="w-64 h-64 object-contain"
                  />
                </div>
              </div>

              {/* Recent Stories Section */}
              {recent_stories && recent_stories.length > 0 && (
                <section className="w-full mb-16">
                  {recent_stories.length === 1 && (
                    <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
                      {recent_stories.map(story => (
                        <div className="w-full" key={story.id}>
                          <ClubStoryCard story={story} />
                        </div>
                      ))}
                    </div>
                  )}
                  {recent_stories.length === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {recent_stories.map(story => (
                        <div className="w-full" key={story.id}>
                          <ClubStoryCard story={story} />
                        </div>
                      ))}
                    </div>
                  )}
                  {recent_stories.length >= 3 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {recent_stories.map(story => (
                        <div className="w-full" key={story.id}>
                          <ClubStoryCard story={story} />
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              <div
                id="contribute"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16"
              >
                <div>
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
                  <p className="text-xl font-bold text-beige-default dark:text-beige-medium underline">
                    <a href="#join" onClick={e => scrollToSection(e, "join")}>
                      {i18n.t("club.home.contribute.cta")}
                    </a>
                  </p>
                </div>
                <div className="order-first lg:order-last">
                  <img
                    src="/images/banner.webp"
                    // src="/images/contribute.webp"
                    alt="Contribute"
                    className="w-full h-[400px] object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              <div
                id="partners"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16"
              >
                <div className="order-first lg:order-first">
                  <img
                    src="/images/banner.webp"
                    // src="/images/partners.webp"
                    alt="Partners"
                    className="w-full h-[400px] object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div>
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
                  <p className="text-xl font-bold text-beige-default dark:text-beige-medium underline">
                    <a
                      href={sanitizeURL(
                        window.Routes.club_social_partners_path
                      )}
                    >
                      {i18n.t("club.home.partners.cta")}
                    </a>
                  </p>
                </div>
              </div>

              {/* Join Section */}
              <div
                id="join"
                className="relative py-12 overflow-hidden mb-8 bg-white/50 dark:bg-dark/50 rounded-lg"
              >
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark dark:text-light">
                    {i18n.t("club.home.join.title")}
                  </h2>
                  <p className="text-xl font-semibold mb-4 text-dark dark:text-light">
                    {i18n.t("club.home.join.subtitle")}
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                    {i18n.t("club.home.join.description")}
                  </p>
                  <p className="text-xl font-bold mb-4 text-beige-default dark:text-beige-medium">
                    {i18n.t("club.home.join.impact")}
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                    {i18n.t("club.home.join.whatsapp")}
                  </p>
                  <div className="flex flex-col items-start gap-4">
                    <a
                      href="https://wa.me/351932829084"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap mx-auto mb-4 border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark"
                    >
                      {i18n.t("club.home.join.cta")}
                    </a>
                    <p className="text-xl font-bold">
                      {i18n.t("club.home.join.mission")}
                    </p>
                    <a
                      href={sanitizeURL(window.Routes.club_rules_path)}
                      className="mx-auto text-xl font-bold mb-12 text-beige-default dark:text-beige-medium underline"
                    >
                      {i18n.t("club.home.know_more.rules")}
                    </a>
                  </div>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-5">
                  <img
                    src="/logos/club-icon.webp"
                    alt=""
                    className="w-48 h-48 object-contain"
                  />
                </div>
              </div>

              <div id="grow" className="bg-white/25 dark:bg-dark/25 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-dark dark:text-light">
                  {i18n.t("club.home.know_more.help_title")}
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-4">
                  {i18n.t("club.home.know_more.help_question")}
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-4">
                  {i18n.t("club.home.know_more.help_description")}
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                  {i18n.t("club.home.know_more.whatsapp")}
                </p>
                <div className="flex justify-center mt-2">
                  <a
                    href="https://wa.me/351932829084"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark"
                  >
                    {i18n.t("club.home.know_more.cta")}
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
