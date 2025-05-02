import { useTranslation } from "react-i18next";

export const useClubSections = () => {
  const { t } = useTranslation();

  return [
    {
      routeName: "club_path",
      title: t("navbar.club"),
      description: t("club.description"),
    },
    {
      routeName: "club_rules_path",
      title: t("navbar.club_rules"),
      description: t("club.rules_description"),
    },
    {
      routeName: "club_stories_path",
      title: t("navbar.club_stories"),
      description: t("club.stories_description"),
    },
  ];
};
