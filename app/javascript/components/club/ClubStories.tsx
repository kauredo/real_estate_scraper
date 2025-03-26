import React from "react";
import { i18n } from "../../languages/languages";
import { sanitizeURLWithParams } from "../utils/Functions";
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
      {/* Intro Section */}
      <section className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-center mb-4 text-dark dark:text-light">
          {i18n.t("club.stories.title")}
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {i18n.t("club.stories.intro")}
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 relative">
        <h2 className="text-2xl font-bold text-center mb-4 text-dark dark:text-light">
          {i18n.t("club.stories.header")}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-8">
          {i18n.t("club.stories.subheader")}
        </p>
        <div className="flex flex-wrap gap-4">
          {club_stories.length > 0 ? (
            club_stories.map(story => (
              <ClubStoryCard key={story.id} story={story} isBackoffice />
            ))
          ) : (
            <div className="w-full text-center p-8 text-xl">
              <h2>{i18n.t("club.stories.empty")}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
