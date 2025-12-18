import { Trans, useTranslation } from "react-i18next";
import Banner from "@/components/ui/Banner";
import { MetaTags } from "@/components/layout/MetaTags";

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaTags pageType="privacy" url={window.location.href} />
      <Banner height="20vh" blurred text={t("privacy.header")} />
      <section className="container mx-auto pt-6 px-8">
        <div className="py-8 md:pb-0 md:pt-4 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              <Trans
                t={t}
                i18nKey="privacy.important"
                components={[
                  <a
                    className="text-beige-default dark:text-beige-medium underline"
                    href="https://sofiagalvaogroup.com/"
                  ></a>,
                ]}
              />
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.personal_information")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.retention")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.sharing")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              <Trans
                t={t}
                i18nKey="privacy.external_links"
                components={[
                  <a
                    className="text-beige-default dark:text-beige-medium underline"
                    href="https://politicaprivacidade.com/"
                    target="_BLANK"
                  ></a>,
                ]}
              />
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.refusal")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.acceptance")}
            </p>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block pt-2 text-2xl text-dark dark:text-light  sm:text-4xl mx-auto">
              {t("privacy.cookies_policy")}
            </h2>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("privacy.what_are_cookies")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.what_are_cookies_text")}
            </p>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("privacy.how_we_use_cookies")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.how_we_use_cookies_text")}
            </p>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("privacy.disabling_cookies")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.disabling_cookies_text")}
            </p>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("privacy.cookies_we_set")}
            </h3>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                <span className="font-bold">{t("privacy.newsletters")} </span>
                {t("privacy.newsletters_text")}
              </li>

              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                <span className="font-bold">{t("privacy.forms")} </span>
                {t("privacy.forms_text")}
              </li>
            </ul>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("privacy.third_party_cookies")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.third_party_cookies_text")}
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("privacy.google_analytics")}
              </li>
            </ul>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.google_analytics_more_info")}
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("privacy.third_party_analytics")}
              </li>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("privacy.new_features")}
              </li>
            </ul>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("privacy.user_commitment")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.user_commitment_text")}
            </p>
            <ul className="list-disc" style={{ listStylePosition: "inside" }}>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("privacy.commitment_a")}
              </li>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                <Trans
                  t={t}
                  i18nKey="privacy.commitment_b"
                  components={[
                    <a
                      className="text-beige-default dark:text-beige-medium underline"
                      href="https://ondeapostar.com/betano-e-confiavel"
                      rel="nofollow"
                      target="_BLANK"
                    ></a>,
                  ]}
                />
              </li>
              <li className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
                {t("privacy.commitment_c")}
              </li>
            </ul>
            <h3 className="block pt-6 text-xl text-dark dark:text-light  sm:text-2xl">
              {t("privacy.more_info")}
            </h3>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              {t("privacy.more_info_text")}
            </p>
            <p className="pt-4 text-xl text-gray-500 dark:text-light max-w-max">
              <Trans
                t={t}
                i18nKey="privacy.policy_effective"
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
