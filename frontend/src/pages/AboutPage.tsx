import { useTranslation } from "react-i18next";
import MetaTags from "@/components/layout/MetaTags";
import Banner from "@/components/ui/Banner";
import Profile from "@/components/features/home/Profile";
import Results from "@/components/features/home/Results";
import { getHomePage } from "@/services/api";
import { ResultNumbers, Testimonial } from "@/utils/interfaces";
import { useState, useEffect } from "react";
import { useNotifications } from "@/hooks/useNotifications";

const AboutPage = () => {
  const { t } = useTranslation();
  const { showError } = useNotifications();
  const [results, setResults] = useState<ResultNumbers | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await getHomePage();
        const data = response.data;

        if (data.stats) {
          setResults(data.stats as ResultNumbers);
        }

        if (data.testimonials) {
          setTestimonials(data.testimonials as Testimonial[]);
        }
      } catch {
        showError(t("errors.fetch_about_data"));
      }
    };

    fetchHomeData();
  }, []);

  return (
    <>
      <MetaTags
        pageType="about"
        title={t("about.header")}
        description={t("about.meta_description")}
        url={window.location.href}
      />
      <Banner height="20vh" blurred={true} text={t("about.header")} />
      <section className="container mx-auto mt-6 mb-12 px-8">
        <Profile />

        <div className="py-8 md:pb-0 md:pt-4 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <div className="mt-8">
              <h2 className="text-2xl text-black dark:text-light">
                {t("about.history_and_values.title")}
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.history_and_values.content.first_paragraph")}
              </p>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.history_and_values.content.second_paragraph")}
              </p>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.history_and_values.content.third_paragraph")}
              </p>

              <h2 className="mt-8 text-2xl text-black dark:text-light">
                {t("about.mission_and_vision.title")}
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.mission_and_vision.content")}
              </p>

              <h2 className="mt-8 text-2xl text-black dark:text-light">
                {t("about.team.title")}
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.team.content")}
              </p>
            </div>
          </div>
        </div>

        <div className="py-8 md:pb-0 mt-8 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="block mt-2 text-2xl text-dark dark:text-light sm:text-4xl text-center">
              {t("about.kw_luxury.title")}
            </h2>
            <h3 className="mt-8 text-2xl text-black dark:text-light">
              {t("about.kw_luxury.subtitle")}
            </h3>
            <p className="mt-4 text-lg text-gray-500 dark:text-light">
              {t("about.kw_luxury.content")}
            </p>
          </div>
        </div>

        <div className="py-8 md:pb-0 mt-8 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="block mt-2 text-2xl text-dark dark:text-light sm:text-4xl text-center">
              {t("about.kw_partnership.title")}
            </h2>

            <div className="mt-8">
              <h3 className="text-2xl text-black dark:text-light">
                {t("about.kw_partnership.international_network.title")}
              </h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.kw_partnership.international_network.content")}
              </p>

              <h3 className="mt-8 text-2xl text-black dark:text-light">
                {t("about.kw_partnership.national_network.title")}
              </h3>
              <p className="mt-4 text-lg text-gray-500 dark:text-light">
                {t("about.kw_partnership.national_network.content")}
              </p>

              <h3 className="mt-8 text-2xl text-black dark:text-light">
                {t("about.kw_partnership.principles.title")}
              </h3>
              <ul className="list-disc pl-8 mt-4 text-black dark:text-light">
                {(
                  t("about.kw_partnership.principles.list", {
                    returnObjects: true,
                  }) as Array<Record<string, string>>
                ).map((principle, index) => {
                  const [key, value] = Object.entries(principle)[0];
                  return (
                    <li
                      key={`${key}-${index}`}
                      className="text-lg text-gray-500 dark:text-light"
                    >
                      <strong>{key}:</strong> {value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {results && <Results results={results} testimonials={testimonials} />}
      </section>
    </>
  );
};

export default AboutPage;
