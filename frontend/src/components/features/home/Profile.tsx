import { useTranslation } from "react-i18next";
import Socials from "@/components/ui/Socials";
import sofiaImage from "@/assets/images/sofia-square.jpg";

export default function Profile() {
  const { t } = useTranslation();
  return (
    <section
      id="profile"
      className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between md:min-h-[25rem] max-h-min md:py-0"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="h-min py-8 md:pb-2 text-ellipsis overflow-hidden">
          <h2 className="block mt-2 text-2xl text-dark dark:text-light sm:text-4xl">
            {t("about.profile.name")}
          </h2>
          <h3 className="font-medium leading-tight text-xl">
            {t("about.profile.slogan")}
          </h3>
          <p className="mt-4 text-xl text-gray-500 dark:text-light max-w-2/3">
            {t("about.profile.description")}
          </p>
        </div>
      </div>
      <div className="mx-2 w-full md:w-1/3 ">
        <div className="container mx-auto max-w-sm overflow-hidden drop-shadow-lg mt-2 bg-white dark:bg-dark">
          <div
            className="relative z-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 3vw))",
            }}
          >
            <img
              loading="lazy"
              className="w-full object-cover object-center max-h-96 bg-[white]"
              src={sofiaImage}
              alt="Sofia Galvão"
            />
          </div>
          <Socials />
        </div>
      </div>
    </section>
  );
}
