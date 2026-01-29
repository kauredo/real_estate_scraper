import Toggle from "@/components/ui/Toggle";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function DarkModeToggle() {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Toggle
      labels={[t("navbar.dark_mode"), t("navbar.light_mode")]}
      icons={[
        <FontAwesomeIcon key="moon" icon={faMoon as IconProp} />,
        <FontAwesomeIcon key="sun" icon={faSun as IconProp} />,
      ]}
      toggled={!isDarkMode}
      onClick={toggleDarkMode}
    />
  );
}
