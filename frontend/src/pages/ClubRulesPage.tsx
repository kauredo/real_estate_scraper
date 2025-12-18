import { useTranslation } from "react-i18next";
import SubNavbar from "@/components/shared/SubNavbar";
import ClubHeader from "@/components/club/ClubHeader";
import IconDecorationWrapper from "@/components/shared/IconDecorationWrapper";
import { useClubSections } from "@/utils/constants/clubSections";
import MetaTags from "@/components/shared/MetaTags";

export default function ClubRulesPage() {
  const { t } = useTranslation();
  const clubSections = useClubSections();

  return (
    <>
      <MetaTags pageType="club_rules" url={window.location.href} />
      <SubNavbar items={clubSections} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center pt-12 pb-24">
          <ClubHeader />

          <section className="w-full max-w-4xl">
            <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
              <IconDecorationWrapper className="pb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-dark dark:text-light">
                  {t("club.rules.title")}
                </h1>
                <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                  {t("club.rules.transparency")}
                </p>
                <div className="mt-8">
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
                    {t("club.rules.intro")}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
                    {t("club.rules.clarity")}
                  </p>
                  <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    {t("club.rules.read_below")}
                  </p>
                </div>
              </IconDecorationWrapper>

              <div className="bg-white/25 dark:bg-dark/25 rounded-lg">
                <div className="space-y-12">
                  <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-8 mb-16 w-full max-w-4xl">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                      {/* 1. General Provisions */}
                      <h2 className="text-2xl font-bold mb-6">
                        {t("club.rules.sections.general.title")}
                      </h2>
                      <ol className="list-decimal pl-6 mb-12 space-y-4">
                        <li
                          className="text-gray-600 dark:text-gray-300"
                          dangerouslySetInnerHTML={{
                            __html: t(
                              "club.rules.sections.general.mission_html",
                            ),
                          }}
                        ></li>
                        <li className="text-gray-600 dark:text-gray-300">
                          {t("club.rules.sections.general.definition")}
                        </li>
                        <li
                          className="text-gray-600 dark:text-gray-300"
                          dangerouslySetInnerHTML={{
                            __html: t(
                              "club.rules.sections.general.values_html",
                            ),
                          }}
                        ></li>
                      </ol>

                      {/* 2. Members Section */}
                      <h2 className="text-2xl font-bold mb-6">
                        {t("club.rules.sections.members.title")}
                      </h2>

                      {/* 2.1 Who can be a member */}
                      <h3 className="text-xl font-bold mb-4">
                        {t("club.rules.sections.members.who_can.title")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("club.rules.sections.members.who_can.intro")}
                      </p>
                      <ul className="list-disc pl-6 mb-8 space-y-2">
                        {["1", "2", "3"].map((item) => (
                          <li
                            key={item}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {t(
                              `club.rules.sections.members.who_can.list.${item}`,
                            )}
                          </li>
                        ))}
                      </ul>

                      {/* 2.2 Member Rights */}
                      <h3 className="text-xl font-bold mb-4">
                        {t("club.rules.sections.members.rights.title")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("club.rules.sections.members.rights.intro")}
                      </p>
                      <ul className="list-disc pl-6 mb-8 space-y-2">
                        {["1", "2", "3", "4"].map((item) => (
                          <li
                            key={item}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {t(
                              `club.rules.sections.members.rights.list.${item}`,
                            )}
                          </li>
                        ))}
                      </ul>

                      {/* Continue with remaining sections */}
                      {/* 2.3 Member Duties */}
                      <h3 className="text-xl font-bold mb-4">
                        {t("club.rules.sections.members.duties.title")}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("club.rules.sections.members.duties.intro")}
                      </p>
                      <ul className="list-disc pl-6 mb-8 space-y-2">
                        {["1", "2", "3", "4"].map((item) => (
                          <li
                            key={item}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {t(
                              `club.rules.sections.members.duties.list.${item}`,
                            )}
                          </li>
                        ))}
                      </ul>

                      {/* 2.4 Members vs Ambassadors */}
                      <h3 className="text-xl font-bold mb-4">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.title",
                        )}
                      </h3>

                      {/* Members */}
                      <h4 className="text-lg font-semibold mb-2">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.members.title",
                        )}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.members.description",
                        )}
                      </p>

                      {/* Ambassadors */}
                      <h4 className="text-lg font-semibold mb-2">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.ambassadors.title",
                        )}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.ambassadors.description",
                        )}
                      </p>

                      <p className="font-medium mb-2">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.ambassadors.additional",
                        )}
                      </p>
                      <ul className="list-disc pl-6 mb-6 space-y-2">
                        {["1", "2", "3"].map((item) => (
                          <li
                            key={item}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {t(
                              `club.rules.sections.members.members_or_ambassadors.ambassadors.list.${item}`,
                            )}
                          </li>
                        ))}
                      </ul>
                      <h5 className="text-lg font-semibold mb-2">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.ambassadors.choice.subtitle",
                        )}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.ambassadors.choice.description",
                        )}
                      </p>
                      <h5 className="text-lg font-semibold mb-2">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.ambassadors.loss_of_status.subtitle",
                        )}
                      </h5>
                      <p className="text-gray-600 dark:text-gray-300 mb-12">
                        {t(
                          "club.rules.sections.members.members_or_ambassadors.ambassadors.loss_of_status.description",
                        )}
                      </p>

                      {/* Financial Model Section */}
                      <h2 className="text-2xl font-bold mb-6">
                        {t("club.rules.sections.financial_model.title")}
                      </h2>

                      <h3 className="text-xl font-bold mb-4">
                        {t("club.rules.sections.financial_model.sources.title")}
                      </h3>
                      <p
                        className="text-gray-600 dark:text-gray-300 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: t(
                            "club.rules.sections.financial_model.sources.description_html",
                          ),
                        }}
                      ></p>

                      {/* Application of Funds */}
                      <h3 className="text-xl font-bold mb-4">
                        {t(
                          "club.rules.sections.financial_model.application.title",
                        )}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t(
                          "club.rules.sections.financial_model.application.intro",
                        )}
                      </p>
                      <ul className="list-disc pl-6 mb-12 space-y-2">
                        {["1", "2", "3", "4"].map((item) => (
                          <li
                            key={item}
                            className="text-gray-600 dark:text-gray-300"
                            dangerouslySetInnerHTML={{
                              __html: t(
                                `club.rules.sections.financial_model.application.list_html.${item}`,
                              ),
                            }}
                          ></li>
                        ))}
                      </ul>

                      {/* Criteria Section */}
                      <h2 className="text-2xl font-bold mb-6">
                        {t("club.rules.sections.criteria.title")}
                      </h2>
                      <p
                        className="text-gray-600 dark:text-gray-300 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: t(
                            "club.rules.sections.criteria.families_html",
                          ),
                        }}
                      ></p>

                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("club.rules.sections.criteria.submited_by.title")}
                      </p>
                      <ul className="list-disc pl-6 mb-8 space-y-2">
                        {["1", "2", "3"].map((item) => (
                          <li
                            key={item}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {t(
                              `club.rules.sections.criteria.submited_by.list.${item}`,
                            )}
                          </li>
                        ))}
                      </ul>

                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("club.rules.sections.criteria.criteria.title")}
                      </p>
                      <ul className="list-disc pl-6 mb-8 space-y-2">
                        {["1", "2"].map((item) => (
                          <li
                            key={item}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {t(
                              `club.rules.sections.criteria.criteria.list.${item}`,
                            )}
                          </li>
                        ))}
                      </ul>

                      <p
                        className="text-gray-600 dark:text-gray-300 mb-12"
                        dangerouslySetInnerHTML={{
                          __html: t(
                            "club.rules.sections.criteria.decisions_html",
                          ),
                        }}
                      ></p>

                      {/* Events Section */}
                      <h2 className="text-2xl font-bold mb-6">
                        {t("club.rules.sections.events.title")}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("club.rules.sections.events.description")}
                      </p>
                      <ul className="list-disc pl-6 mb-8 space-y-2">
                        {["1", "2", "3"].map((item) => (
                          <li
                            key={item}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {t(`club.rules.sections.events.list.${item}`)}
                          </li>
                        ))}
                      </ul>
                      <p className="text-gray-600 dark:text-gray-300 mb-12">
                        {t("club.rules.sections.events.incentives")}
                      </p>

                      {/* Transparency Section */}
                      <h2 className="text-2xl font-bold mb-6">
                        {t("club.rules.sections.transparency.title")}
                      </h2>
                      <p
                        className="text-gray-600 dark:text-gray-300 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: t(
                            "club.rules.sections.transparency.description_html",
                          ),
                        }}
                      ></p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t(
                          "club.rules.sections.transparency.reports.description",
                        )}
                      </p>
                      <ul className="list-disc pl-6 mb-12 space-y-2">
                        {["1", "2", "3"].map((item) => (
                          <li
                            key={item}
                            className="text-gray-600 dark:text-gray-300"
                          >
                            {t(
                              `club.rules.sections.transparency.reports.list.${item}`,
                            )}
                          </li>
                        ))}
                      </ul>

                      {/* Final Section */}
                      <h2 className="text-2xl font-bold mb-6">
                        {t("club.rules.sections.final.title")}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {t("club.rules.sections.final.1")}
                      </p>
                      <p
                        className="text-gray-600 dark:text-gray-300"
                        dangerouslySetInnerHTML={{
                          __html: t("club.rules.sections.final.2_html"),
                        }}
                      ></p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
