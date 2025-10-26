import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition rounded-md hover:bg-gray-100"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{i18n.language === "en" ? "EN" : "PT"}</span>
    </button>
  );
}
