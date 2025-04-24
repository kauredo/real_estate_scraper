import React from "react";
import { useTranslation } from "react-i18next";
import { sanitizeURLWithParams } from "../utils/Functions";
import { ClubStory } from "../utils/Interfaces";

interface Props {
  story: ClubStory;
  isBackoffice?: boolean;
}

export default function ClubStoryCard({ story, isBackoffice = false }: Props) {
  const { t, i18n } = useTranslation();
  const storyUrl = sanitizeURLWithParams(
    isBackoffice
      ? window.Routes.backoffice_club_story_path
      : window.Routes.club_story_path,
    story.slug
  );

  return (
    <div className="bg-white dark:bg-dark shadow-md border border-gray-200 dark:border-gray-700 rounded-lg w-full h-full flex flex-col">
      {story.main_photo && (
        <a href={storyUrl} className="block">
          <img
            loading="lazy"
            className="w-full rounded-t-lg aspect-video object-cover"
            src={story.main_photo}
            alt={story.title}
          />
        </a>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <a href={storyUrl}>
          <h5 className="text-gray-900 dark:text-light font-bold text-xl tracking-tight mb-2">
            {story.title}
          </h5>
        </a>
        <p className="font-normal text-gray-700 dark:text-gray-300 mb-4 flex-grow">
          {story.sample_text}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={storyUrl}
            className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            data-turbo="false"
          >
            {t("general.read_more")}
          </a>
          {isBackoffice && (
            <>
              <a
                href={sanitizeURLWithParams(
                  window.Routes.edit_backoffice_club_story_path,
                  story.slug
                )}
                className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                data-turbo="false"
              >
                {t("backoffice.common.edit")}
              </a>
              <a
                href={sanitizeURLWithParams(
                  window.Routes.backoffice_club_story_path,
                  story.slug
                )}
                className="bg-red-500 hover:bg-red-700 text-white dark:text-dark p-2 rounded font-bold"
                data-turbo-method="delete"
                onClick={() => confirm(t("backoffice.common.confirm_delete"))}
              >
                <i className="fas fa-trash-alt"></i>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
