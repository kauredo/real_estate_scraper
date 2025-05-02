import { useTranslation } from "react-i18next";
import { useMetaTags } from "../hooks/useMetaTags";
import Banner from "../components/shared/Banner";

const TermsAndConditionsPage = () => {
  const { t } = useTranslation();

  useMetaTags({
    title: t("terms.header"),
    url: window.location.href,
  });

  const licenseRestrictions = t("terms.sections.license.restrictions", {
    returnObjects: true,
  }) as string[];
  const disclaimerPoints = t("terms.sections.disclaimer.points", {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <Banner height="20vh" blurred={true} text={t("terms.header")} />
      <section className="container mx-auto pt-6 px-8">
        <div className="pt-6 bg-white dark:bg-dark text-center md:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
            <h1
              id="main-title"
              className="relative block md:hidden pt-2 text-3xl text-dark dark:text-light sm:text-4xl px-4"
            >
              {t("terms.header")}
            </h1>
          </div>
        </div>

        <div className="py-8 md:pb-0 md:pt-4 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-dark dark:text-light sm:text-4xl mx-auto">
              {t("terms.sections.terms.title")}
            </h2>
            <p
              className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.terms.content"),
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-dark dark:text-light sm:text-4xl mx-auto">
              {t("terms.sections.license.title")}
            </h2>
            <p
              className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.license.content"),
              }}
            />
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              {licenseRestrictions.map((item: string, index: number) => (
                <li
                  key={index}
                  className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
            <p
              className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.license.termination"),
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-dark dark:text-light sm:text-4xl mx-auto">
              {t("terms.sections.disclaimer.title")}
            </h2>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              {disclaimerPoints.map((item: string, index: number) => (
                <li
                  key={index}
                  className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          </div>

          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-dark dark:text-light sm:text-4xl mx-auto">
              {t("terms.sections.limitations.title")}
            </h2>
            <p
              className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.limitations.content"),
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-dark dark:text-light sm:text-4xl mx-auto">
              {t("terms.sections.accuracy.title")}
            </h2>
            <p
              className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.accuracy.content"),
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-dark dark:text-light sm:text-4xl mx-auto">
              {t("terms.sections.links.title")}
            </h2>
            <p
              className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.links.content"),
              }}
            />

            <h3 className="block pt-6 text-xl text-dark dark:text-light sm:text-2xl">
              {t("terms.sections.modifications.title")}
            </h3>
            <p
              className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.modifications.content"),
              }}
            />

            <h3 className="block pt-6 text-xl text-dark dark:text-light sm:text-2xl">
              {t("terms.sections.law.title")}
            </h3>
            <p
              className="pt-4 text-xl text-gray-500 dark:text-light max-w-max"
              dangerouslySetInnerHTML={{
                __html: t("terms.sections.law.content"),
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsAndConditionsPage;
