import { useTranslation } from "react-i18next";
import { ClubStory } from "@/utils/interfaces";
import Routes from "@/utils/routes";
import { ButtonLink } from "@/components/ui/ButtonLink";
import ContentCard from "@/components/ui/ContentCard";

interface Props {
  story: ClubStory;
}

export default function ClubStoryCard({ story }: Props) {
  const { t } = useTranslation();
  const storyUrl = Routes.club_story_path(story.slug);

  return (
    <ContentCard
      title={story.title}
      description={story.sample_text}
      image={story.main_photo_thumb || story.main_photo}
      imageAlt={story.title}
      linkUrl={storyUrl}
      action={<ButtonLink to={storyUrl}>{t("general.read_more")}</ButtonLink>}
    />
  );
}
