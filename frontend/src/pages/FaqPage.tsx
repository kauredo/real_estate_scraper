import { useTranslation } from "react-i18next";
import MetaTags from "../components/shared/MetaTags";
import Banner from "../components/shared/Banner";
import FaqAccordion from "../components/faq/FaqAccordion";

interface FaqQuestion {
  title: string;
  answer: string;
}

interface FaqSection {
  title: string;
  questions: Record<string, FaqQuestion>;
}

const FaqPage = () => {
  const { t } = useTranslation();

  const faqSections = t("faq.sections", { returnObjects: true }) as Record<
    string,
    FaqSection
  >;
  const reasonAnswers = t("faq.reason.answers", {
    returnObjects: true,
  }) as Record<string, { title: string; description: string }>;

  return (
    <>
      <MetaTags
        pageType="faq"
        title={t("faq.header")}
        description={t("faq.meta_description")}
        url={window.location.href}
      />
      <Banner height="20vh" blurred={true} text={t("faq.header")} />
      <section className="container mx-auto pt-6 px-8">
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
          <FaqAccordion sections={faqSections} />

          <h3 className="pt-10 pb-3 text-2xl text-dark dark:text-light sm:text-3xl">
            {t("faq.reason.title")}
          </h3>
          <ul className="list-disc list-inside">
            {Object.entries(reasonAnswers).map(([key, answer]) => (
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
