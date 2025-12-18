import { Trans, useTranslation } from "react-i18next";
import Banner from "@/components/shared/Banner";
import { MetaTags } from "@/components/shared/MetaTags";

const PrivacyPage = () => {
  const { t } = useTranslation("privacy");

  return (
    <>
      <MetaTags pageType="privacy" url={window.location.href} />
      <Banner height="20vh" blurred text={t("header")} />
      <section className="container mx-auto pt-6 px-8">
        <div className="py-8 md:pb-0 md:pt-4 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              <Trans
                t={t}
                i18nKey="important"
                components={[
                  <a
                    className="text-beige-default dark:text-beige-medium underline"
                    href="https://sofiagalvaogroup.com/"
                  />,
                ]}
              />
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("personal_information")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("retention")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("sharing")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              <Trans
                t={t}
                i18nKey="external_links"
                components={[
                  <a
                    className="text-beige-default dark:text-beige-medium underline"
                    href="https://politicaprivacidade.com/"
                    target="_BLANK"
                  />,
                ]}
              />
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("refusal")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("acceptance")}
            </p>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-dark dark:text-light  sm:text-4xl mx-auto">
              {t("cookies_policy")}
            </h2>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("what_are_cookies")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("what_are_cookies_text")}
            </p>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("how_we_use_cookies")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("how_we_use_cookies_text")}
            </p>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("disabling_cookies")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("disabling_cookies_text")}
            </p>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("cookies_we_set")}
            </h3>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                <span className="font-bold">{t("newsletters")} </span>
                {t("newsletters_text")}
              </li>

              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                <span className="font-bold">{t("forms")} </span>
                {t("forms_text")}
              </li>
            </ul>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("third_party_cookies")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("third_party_cookies_text")}
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("google_analytics")}
              </li>
            </ul>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("google_analytics_more_info")}
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("third_party_analytics")}
              </li>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("new_features")}
              </li>
            </ul>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("user_commitment")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("user_commitment_text")}
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("commitment_a")}
              </li>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                <Trans
                  t={t}
                  i18nKey="commitment_b"
                  components={[
                    <a
                      className="text-beige-default dark:text-beige-medium underline"
                      href="https://ondeapostar.com/betano-e-confiavel"
                      rel="nofollow"
                      target="_BLANK"
                    />,
                  ]}
                />
              </li>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("commitment_c")}
              </li>
            </ul>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("more_info")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("more_info_text")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              <Trans
                t={t}
                i18nKey="policy_effective"
                components={[<strong />]}
              />
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPage;
