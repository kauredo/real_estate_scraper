import React from "react";
import { useTranslation } from "react-i18next";
import { ClubStory } from "../../utils/interfaces";
import ClubStoryCard from "./ClubStoryCard";
import SubNavbar from "../shared/SubNavbar";
import { clubSections } from "../../utils/constants/clubSections";
import ClubHeader from "./ClubHeader";
import IconDecorationWrapper from "../shared/IconDecorationWrapper";

interface Props {
  club_stories: ClubStory[];
  isBackoffice?: boolean;
}

export default function ClubStories({
  club_stories,
  isBackoffice = false,
}: Props) {
  const { t, i18n } = useTranslation();
  return (
    <>
      {!isBackoffice && <SubNavbar items={clubSections} />}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center pt-12 pb-24">
          {!isBackoffice && (
            <>
              <ClubHeader />
              <section className="w-full max-w-4xl">
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
                  <IconDecorationWrapper id="dignity">
                    <div className="flex flex-col mb-16">
                      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-dark dark:text-light">
                        {t("club.stories.transformed_life")}
                      </h1>
                      <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                        {t("club.stories.real_people")}
                      </p>
                      <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
                        {t("club.stories.impact_description")}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-dark dark:text-light">
                        {t("club.stories.explore_stories")}
                      </h3>
                      <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
                        {t("club.stories.stories_description")}
                      </p>
                    </div>
                  </IconDecorationWrapper>
                </div>
              </section>
            </>
          )}

          <div className="w-full max-w-7xl mt-16">
            {club_stories && club_stories.length > 0 ? (
              <>
                {club_stories.length === 1 && (
                  <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
                    {club_stories.map(story => (
                      <div className="w-full" key={story.id}>
                        <ClubStoryCard
                          story={story}
                          isBackoffice={isBackoffice}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {club_stories.length === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {club_stories.map(story => (
                      <div className="w-full" key={story.id}>
                        <ClubStoryCard
                          story={story}
                          isBackoffice={isBackoffice}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {club_stories.length >= 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {club_stories.map(story => (
                      <div className="w-full" key={story.id}>
                        <ClubStoryCard
                          story={story}
                          isBackoffice={isBackoffice}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="col-span-full text-center p-8 text-lg font-light bg-white/50 dark:bg-dark/50 rounded-lg shadow-lg">
                <h3>{t("club.stories.empty")}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
