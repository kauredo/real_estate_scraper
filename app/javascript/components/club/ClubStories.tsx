import React from "react";
import { i18n } from "../../languages/languages";
import { ClubStory } from "../utils/Interfaces";
import ClubStoryCard from "./ClubStoryCard";

interface Props {
  club_stories: ClubStory[];
  isBackoffice?: boolean;
}

export default function ClubStories({
  club_stories,
  isBackoffice = false,
}: Props) {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center py-12">
        {!isBackoffice && (
          <>
            <h1 className="text-3xl font-bold text-center mb-4 text-dark dark:text-light">
              {i18n.t("club.stories.transformed_life")}
            </h1>

            <div className="max-w-3xl text-center mb-16">
              <p className="text-lg font-bold mb-6 text-dark dark:text-light">
                {i18n.t("club.stories.real_people")}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-12">
                {i18n.t("club.stories.impact_description")}
              </p>
              <h3 className="text-xl font-bold mb-4 text-dark dark:text-light">
                {i18n.t("club.stories.explore_stories")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {i18n.t("club.stories.stories_description")}
              </p>
            </div>
          </>
        )}

        <div className="w-full max-w-7xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {club_stories && club_stories.length > 0 ? (
              club_stories.map(story => (
                <ClubStoryCard key={story.id} story={story} isBackoffice />
              ))
            ) : (
              <div className="col-span-full text-center p-8 text-lg font-light bg-white dark:bg-dark rounded-lg shadow-lg">
                <h3>{i18n.t("club.stories.empty")}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
