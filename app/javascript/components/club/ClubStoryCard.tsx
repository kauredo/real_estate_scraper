import React from "react";
import { i18n } from "../../languages/languages";
import { sanitizeURLWithParams } from "../utils/Functions";
import { ClubStory } from "../utils/Interfaces";

interface Props {
  story: ClubStory;
  isBackoffice?: boolean;
}

export default function ClubStoryCard({ story, isBackoffice = false }: Props) {
  const storyUrl = sanitizeURLWithParams(
    isBackoffice
      ? window.Routes.backoffice_club_story_path
      : window.Routes.club_story_path,
    story.slug
  );

  return (
    <div className="bg-white dark:bg-dark shadow-md border border-gray-200 rounded-lg max-w-sm w-96 mb-5">
      {story.main_photo && (
        <a href={storyUrl}>
          <img
            loading="lazy"
            className="w-full rounded-t-lg aspect-video object-cover"
            src={story.main_photo}
            alt={story.title}
          />
        </a>
      )}
      <div className="p-5">
        <a href={storyUrl}>
          <h5 className="text-gray-900 dark:text-light font-bold text-2xl tracking-tight mb-2">
            {story.title}
          </h5>
        </a>
        <p className="font-normal text-gray-700 dark:text-light mb-3 whitespace-pre-line">
          {story.sample_text}
        </p>
        <a
          href={storyUrl}
          className="bg-blue-300 hover:bg-blue-500 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          data-turbo="false"
        >
          {i18n.t("general.read_more")}
        </a>
        {isBackoffice && (
          <>
            <a
              href={sanitizeURLWithParams(
                window.Routes.edit_backoffice_club_story_path,
                story.slug
              )}
              className="ml-2 bg-blue-300 hover:bg-blue-500 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              data-turbo="false"
            >
              {i18n.t("backoffice.common.edit")}
            </a>
            <a
              href={sanitizeURLWithParams(
                window.Routes.backoffice_club_story_path,
                story.slug
              )}
              className="ml-2 bg-red-500 hover:bg-red-700 p-2 rounded font-bold"
              data-turbo-method="delete"
              onClick={() =>
                confirm(i18n.t("backoffice.common.confirm_delete"))
              }
            >
              🗑️
            </a>
          </>
        )}
      </div>
    </div>
  );
}
