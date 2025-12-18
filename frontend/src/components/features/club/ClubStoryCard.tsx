import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClubStory } from "@/utils/interfaces";
import Routes from "@/utils/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";

interface Props {
  story: ClubStory;
}

export default function ClubStoryCard({ story }: Props) {
  const { t } = useTranslation();
  const storyUrl = Routes.club_story_path(story.slug);
  return (
    <Card className="w-full h-full flex flex-col">
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
      <CardContent className="p-5 flex flex-col flex-grow">
        <Link to={storyUrl}>
          <CardTitle className="text-xl mb-2">{story.title}</CardTitle>
        </Link>
        <CardDescription className="mb-4 flex-grow">
          {story.sample_text}
        </CardDescription>
        <CardFooter className="p-0 pt-0">
          <ButtonLink to={storyUrl}>{t("general.read_more")}</ButtonLink>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
