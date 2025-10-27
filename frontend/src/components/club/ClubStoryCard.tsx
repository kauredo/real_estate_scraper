import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClubStory } from "../../utils/interfaces";
import Routes from "../../utils/routes";

interface Props {
  story: ClubStory;
  isBackoffice?: boolean;
}

export default function ClubStoryCard({ story, isBackoffice = false }: Props) {
  const { t, i18n } = useTranslation();
  const storyUrl = isBackoffice
    ? Routes.backoffice_club_story_path(story.slug)
    : Routes.club_story_path(story.slug);
  return (
    <div className="bg-white dark:bg-dark shadow-md border border-gray-200 dark:border-gray-700 rounded-lg w-full h-full flex flex-col">
      {story.main_photo && (
        <Link to={storyUrl} className="block">
          <img
            loading="lazy"
            className="w-full rounded-t-lg aspect-video object-cover"
            src={story.main_photo_thumb || story.main_photo}
            alt={story.title}
          />
        </Link>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <Link to={storyUrl}>
          <h5 className="text-gray-900 dark:text-light font-bold text-xl tracking-tight mb-2">
            {story.title}
          </h5>
        </Link>
        <p className="font-normal text-gray-700 dark:text-gray-300 mb-4 flex-grow">
          {story.sample_text}
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            to={storyUrl}
            className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {t("general.read_more")}
          </Link>
          {isBackoffice && (
            <>
              <a
                href={Routes.edit_backoffice_club_story_path(story.slug)}
                className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {t("backoffice.common.edit")}
              </a>
              <a
                href={Routes.backoffice_club_story_path(story.slug)}
                className="bg-red-500 hover:bg-red-700 text-white dark:text-dark p-2 rounded font-bold"
                onClick={() => confirm(t("backoffice.common.confirm_delete"))}
              >
                <FontAwesomeIcon icon="trash-alt" />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
