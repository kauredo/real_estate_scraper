import { useTranslation } from "react-i18next";
import { useMetaTags } from "../hooks/useMetaTags";
import Banner from "../components/shared/Banner";
import FaqAccordion from "../components/faq/FaqAccordion";

const FaqPage = () => {
  const { t } = useTranslation();

  useMetaTags({
    title: t("faq.header"),
    description: t("faq.meta_description"),
    url: window.location.href,
  });

  return (
    <>
      <Banner height="20vh" blurred={true} text={t("faq.header")} />
      <section className="container mx-auto pt-6 px-8">
        <div className="pt-6 bg-white dark:bg-dark text-center md:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
            <h1
              id="main-title"
              className="relative block md:hidden pt-2 text-3xl text-dark dark:text-light sm:text-4xl px-4"
            >
              {t("faq.header")}
            </h1>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-dark dark:text-light sm:text-4xl mx-auto">
              {t("faq.subheader")}
            </h2>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("faq.description")}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
          <FaqAccordion sections={t("faq.sections", { returnObjects: true })} />

          <h3 className="pt-10 pb-3 text-2xl text-dark dark:text-light sm:text-3xl">
            {t("faq.reason.title")}
          </h3>
          <ul className="list-disc list-inside">
            {Object.entries(
              t("faq.reason.answers", { returnObjects: true })
            ).map(([key, answer]: [string, any]) => (
              <li key={key} className="text-lg text-dark dark:text-light">
                <strong>{answer.title}:</strong> {answer.description}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
