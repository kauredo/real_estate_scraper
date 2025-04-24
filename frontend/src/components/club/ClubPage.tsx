import React from "react";
import { useTranslation } from "react-i18next";
import { sanitizeURL, scrollToSection } from "../../utils/functions";
import { ClubStory } from "../../utils/interfaces";
import ClubStoryCard from "./ClubStoryCard";
import SubNavbar from "../shared/SubNavbar";
import { clubSections } from "../../utils/constants/clubSections";
import ClubHeader from "./ClubHeader";
import IconDecorationWrapper from "../shared/IconDecorationWrapper";
import ClubJoinForm from "./ClubJoinForm";
import Routes from "../../utils/routes";

interface Props {
  recent_stories: ClubStory[];
}

export default function ClubPage({ recent_stories }: Props) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <SubNavbar items={clubSections} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center pt-12 pb-24">
          <ClubHeader />

          <section className="w-full max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
              <IconDecorationWrapper id="dignity" className="pb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-dark dark:text-light">
                  {t("club.home.dignity.title")}
                </h2>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-200">
                  {t("club.home.dignity.description")}
                </p>
              </IconDecorationWrapper>

              {/* Recent Stories Section */}
              {recent_stories && recent_stories.length > 0 && (
                <section className="w-full py-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-dark dark:text-light">
                    {t("club.home.impact.subtitle")}
                  </h2>
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    {t("club.home.contribute.title")}
                  </h2>
                  <p className="text-xl font-semibold mb-4 text-dark dark:text-light">
                    {t("club.home.contribute.subtitle")}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {t("club.home.contribute.description")}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    {t("club.home.contribute.value_description")}
                  </p>
                  <p className="text-xl font-bold text-beige-default dark:text-beige-medium underline">
                    <a href="#join" onClick={e => scrollToSection(e, "join")}>
                      {t("club.home.contribute.cta")}
                    </a>
                  </p>
                </div>
                <div className="order-first lg:order-last">
                  <img
                    src="/images/together.webp"
                    // src="/images/contribute.webp"
                    alt="Contribute"
                    className="w-full h-[400px] object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>

              <div
                id="partners"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="order-first lg:order-first">
                  <h2 className="text-2xl font-bold mb-6">
                    {t("club.home.partners.title")}
                  </h2>
                  <p className="text-xl font-semibold mb-4">
                    {t("club.home.partners.subtitle")}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {t("club.home.partners.description")}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    {t("club.home.partners.dynamic")}
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    {t("club.home.partners.second_title")}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    {t("club.home.partners.situations")}
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    {t("club.home.partners.someone")}
                  </p>
                  <p
                    className="text-lg text-gray-600 dark:text-gray-300 mb-8"
                    dangerouslySetInnerHTML={{
                      __html: t("club.home.partners.conclusion_html"),
                    }}
                  ></p>
                  <p>
                    <a
                      href="https://wa.me/351932829084"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whitespace-nowrap border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark"
                    >
                      {t("club.home.know_more.cta")}
                    </a>
                  </p>
                </div>
              </div>

              {/* Join Section */}
              <IconDecorationWrapper
                id="join"
                size="sm"
                opacity="low"
                className="py-12 bg-white/50 dark:bg-dark/50 rounded-lg"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark dark:text-light">
                  {t("club.home.join.title")}
                </h2>
                <p className="text-xl font-semibold mb-4 text-dark dark:text-light">
                  {t("club.home.join.subtitle")}
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                  {t("club.home.join.description")}
                </p>
                <p className="text-xl font-bold mb-4 text-beige-default dark:text-beige-medium">
                  {t("club.home.join.impact")}
                </p>
                <div className="flex justify-center mt-2">
                  <ClubJoinForm />
                </div>
              </IconDecorationWrapper>

              {/* Know More Section */}
              <div id="grow" className="bg-white/25 dark:bg-dark/25 rounded-lg">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-dark dark:text-light">
                  {t("club.home.know_more.help_title")}
                </h3>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-4">
                  {t("club.home.know_more.help_question")}
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-4">
                  {t("club.home.know_more.help_description")}
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                  {t("club.home.know_more.whatsapp")}
                </p>
                <p>
                  <a
                    href="https://wa.me/351932829084"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whitespace-nowrap border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark"
                  >
                    {t("club.home.know_more.cta")}
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
