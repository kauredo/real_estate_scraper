import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClubStory } from "../../utils/interfaces";
import Routes from "../../utils/routes";

interface Props {
  story: ClubStory;
}

export default function ClubStoryCard({ story }: Props) {
  const { t } = useTranslation();
  const storyUrl = Routes.club_story_path(story.slug);
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
        </div>
      </div>
    </div>
  );
}
