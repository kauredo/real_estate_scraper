import React from "react";
import { i18n } from "../../languages/languages";
import { sanitizeURL } from "../utils/Functions";
import type { ClubStory } from "../utils/Interfaces";

interface Props {
  club_stories: ClubStory[];
}

export default function ClubStories({ club_stories }: Props) {
  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl">
          {i18n.t("club.stories.header")}
        </h1>
        <p className="mx-auto text-gray-500 dark:text-light text-lg mt-2">
          {i18n.t("club.stories.subheader")}
        </p>
        <br />
        <div className="flex flex-wrap gap-4">
          {club_stories.length > 0 ? (
            club_stories.map(story => (
              <div
                key={story.id}
                className="bg-white dark:bg-dark shadow-md border border-gray-200 rounded-lg max-w-sm w-96 mb-5"
              >
                <a
                  href={sanitizeURL(window.Routes.club_story_path(story.slug))}
                >
                  <img
                    loading="lazy"
                    className="w-full rounded-t-lg aspect-video object-cover"
                    src={story.main_photo}
                    alt={story.title}
                  />
                </a>
                <div className="p-5">
                  <a
                    href={sanitizeURL(
                      window.Routes.club_story_path(story.slug)
                    )}
                  >
                    <h5 className="text-gray-900 dark:text-light font-bold text-2xl tracking-tight mb-2">
                      {story.title}
                    </h5>
                  </a>
                  <p className="font-normal text-gray-700 dark:text-light mb-3 whitespace-pre-line">
                    {story.sample_text}
                  </p>
                  <a
                    href={sanitizeURL(
                      window.Routes.club_story_path(story.slug)
                    )}
                    className="bg-blue-300 hover:bg-blue-500 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    data-turbo="false"
                  >
                    {i18n.t("read_more")}
                  </a>
                </div>
              </div>
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
