import React from "react";
import { i18n } from "../../languages/languages";
import { ClubStory } from "../utils/Interfaces";
import ClubStoryCard from "./ClubStoryCard";
import SubNavbar from "../shared/SubNavbar";
import { clubSections } from "../utils/constants/clubSections";

interface Props {
  club_stories: ClubStory[];
  isBackoffice?: boolean;
}

export default function ClubStories({
  club_stories,
  isBackoffice = false,
}: Props) {
  return (
    <>
      {!isBackoffice && <SubNavbar items={clubSections} />}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-12">
          {!isBackoffice && (
            <div className="flex flex-col items-center mb-16">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-dark dark:text-light">
                {i18n.t("club.stories.transformed_life")}
              </h1>

              <p className="text-xl font-bold mb-6 text-dark dark:text-light text-center">
                {i18n.t("club.stories.real_people")}
              </p>
              <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-3xl mb-12">
                {i18n.t("club.stories.impact_description")}
              </p>
              <h3 className="text-2xl font-bold mb-4 text-dark dark:text-light">
                {i18n.t("club.stories.explore_stories")}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-12">
                {i18n.t("club.stories.stories_description")}
              </p>
            </div>
          )}

          <div className="w-full max-w-7xl">
            <div
              className={`grid grid-cols-1 md:grid-cols-${
                club_stories.length === 1 ? "1" : "2"
              } lg:grid-cols-${
                club_stories.length < 3 ? club_stories.length : "3"
              } gap-8 ${club_stories.length === 1 ? "max-w-md mx-auto" : ""}`}
            >
              {club_stories && club_stories.length > 0 ? (
                club_stories.map(story => (
                  <div className="w-full" key={story.id}>
                    <ClubStoryCard story={story} isBackoffice={isBackoffice} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-8 text-lg font-light bg-white/50 dark:bg-dark/50 rounded-lg shadow-lg">
                  <h3>{i18n.t("club.stories.empty")}</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
