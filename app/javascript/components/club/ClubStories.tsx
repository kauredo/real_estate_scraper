import React from "react";
import { i18n } from "../../languages/languages";
import { sanitizeURLWithParams } from "../utils/Functions";
import { ClubStory } from "../utils/Interfaces";

interface Props {
  club_stories: ClubStory[];
}

export default function ClubStories({ club_stories }: Props) {
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
            club_stories.map(story => {
              console.log(story);
              console.log(window.Routes.club_story_path(story.id));
              return (
                <div
                  key={story.id}
                  className="bg-white dark:bg-dark shadow-md border border-gray-200 rounded-lg max-w-sm w-96 mb-5"
                >
                  {/* <a
                    href={sanitizeURLWithParams(
                      window.Routes.club_story_path, story.slug
                    )}
                  >
                    <img
                      loading="lazy"
                      className="w-full rounded-t-lg aspect-video object-cover"
                      src={story.main_photo}
                      alt={story.title}
                    />
                  </a> */}
                  <div className="p-5">
                    <a
                      href={sanitizeURLWithParams(
                        window.Routes.club_story_path,
                        story.slug
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
              );
            })
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
