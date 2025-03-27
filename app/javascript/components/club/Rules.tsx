import React from "react";
import { i18n } from "../../languages/languages";

export default function Rules() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center pt-12">
        <h1 className="text-3xl font-bold text-center mb-4 text-dark dark:text-light">
          {i18n.t("club.rules.title")}
        </h1>
        <p className="text-lg font-bold mb-6 text-dark dark:text-light text-center">
          {i18n.t("club.rules.transparency")}
        </p>

        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-8 mb-16 w-full max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Introduction */}
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {i18n.t("club.rules.intro")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {i18n.t("club.rules.clarity")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {i18n.t("club.rules.read_below")}
            </p>

            {/* 1. General Provisions */}
            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.rules.sections.general.title")}
            </h2>
            <ol className="list-decimal pl-6 mb-12 space-y-4">
              <li
                className="text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: i18n.t("club.rules.sections.general.mission_html"),
                }}
              ></li>
              <li className="text-gray-600 dark:text-gray-300">
                {i18n.t("club.rules.sections.general.definition")}
              </li>
              <li
                className="text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: i18n.t("club.rules.sections.general.values_html"),
                }}
              ></li>
            </ol>

            {/* 2. Members Section */}
            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.rules.sections.members.title")}
            </h2>

            {/* 2.1 Who can be a member */}
            <h3 className="text-xl font-bold mb-4">
              {i18n.t("club.rules.sections.members.who_can.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.members.who_can.intro")}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {["first", "second", "third"].map(item => (
                <li key={item} className="text-gray-600 dark:text-gray-300">
                  {i18n.t(`club.rules.sections.members.who_can.list.${item}`)}
                </li>
              ))}
            </ul>

            {/* 2.2 Member Rights */}
            <h3 className="text-xl font-bold mb-4">
              {i18n.t("club.rules.sections.members.rights.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.members.rights.intro")}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {["first", "second", "third", "fourth"].map(item => (
                <li key={item} className="text-gray-600 dark:text-gray-300">
                  {i18n.t(`club.rules.sections.members.rights.list.${item}`)}
                </li>
              ))}
            </ul>

            {/* Continue with remaining sections */}
            {/* 2.3 Member Duties */}
            <h3 className="text-xl font-bold mb-4">
              {i18n.t("club.rules.sections.members.duties.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.members.duties.intro")}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {["first", "second", "third"].map(item => (
                <li key={item} className="text-gray-600 dark:text-gray-300">
                  {i18n.t(`club.rules.sections.members.duties.list.${item}`)}
                </li>
              ))}
            </ul>

            {/* 2.4 Members vs Ambassadors */}
            <h3 className="text-xl font-bold mb-4">
              {i18n.t(
                "club.rules.sections.members.members_or_ambassadors.title"
              )}
            </h3>

            {/* Members */}
            <h4 className="text-lg font-semibold mb-2">
              {i18n.t(
                "club.rules.sections.members.members_or_ambassadors.members.title"
              )}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {i18n.t(
                "club.rules.sections.members.members_or_ambassadors.members.description"
              )}
            </p>

            {/* Ambassadors */}
            <h4 className="text-lg font-semibold mb-2">
              {i18n.t(
                "club.rules.sections.members.members_or_ambassadors.ambassadors.title"
              )}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t(
                "club.rules.sections.members.members_or_ambassadors.ambassadors.description"
              )}
            </p>

            <p className="font-medium mb-2">
              {i18n.t(
                "club.rules.sections.members.members_or_ambassadors.ambassadors.additional"
              )}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              {["first", "second", "third"].map(item => (
                <li key={item} className="text-gray-600 dark:text-gray-300">
                  {i18n.t(
                    `club.rules.sections.members.members_or_ambassadors.ambassadors.list.${item}`
                  )}
                </li>
              ))}
            </ul>

            {/* Financial Model Section */}
            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.rules.sections.financial_model.title")}
            </h2>

            <h3 className="text-xl font-bold mb-4">
              {i18n.t("club.rules.sections.financial_model.sources.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.financial_model.sources.intro")}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {["first", "second"].map(item => (
                <li
                  key={item}
                  className="text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: i18n.t(
                      `club.rules.sections.financial_model.sources.list_html.${item}`
                    ),
                  }}
                ></li>
              ))}
            </ul>

            {/* Application of Funds */}
            <h3 className="text-xl font-bold mb-4">
              {i18n.t("club.rules.sections.financial_model.application.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.financial_model.application.intro")}
            </p>
            <ul className="list-disc pl-6 mb-12 space-y-2">
              {["first", "second", "third", "fourth"].map(item => (
                <li
                  key={item}
                  className="text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: i18n.t(
                      `club.rules.sections.financial_model.application.list_html.${item}`
                    ),
                  }}
                ></li>
              ))}
            </ul>

            {/* Criteria Section */}
            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.rules.sections.criteria.title")}
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300 mb-4"
              dangerouslySetInnerHTML={{
                __html: i18n.t("club.rules.sections.criteria.families_html"),
              }}
            ></p>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.criteria.submited_by.title")}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {["first", "second"].map(item => (
                <li key={item} className="text-gray-600 dark:text-gray-300">
                  {i18n.t(
                    `club.rules.sections.criteria.submited_by.list.${item}`
                  )}
                </li>
              ))}
            </ul>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.criteria.criteria.title")}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {["first", "second", "third"].map(item => (
                <li key={item} className="text-gray-600 dark:text-gray-300">
                  {i18n.t(`club.rules.sections.criteria.criteria.list.${item}`)}
                </li>
              ))}
            </ul>

            <p
              className="text-gray-600 dark:text-gray-300 mb-12"
              dangerouslySetInnerHTML={{
                __html: i18n.t("club.rules.sections.criteria.decisions_html"),
              }}
            ></p>

            {/* Events Section */}
            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.rules.sections.events.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.events.description")}
            </p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              {["first", "second", "third"].map(item => (
                <li key={item} className="text-gray-600 dark:text-gray-300">
                  {i18n.t(`club.rules.sections.events.list.${item}`)}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mb-12">
              {i18n.t("club.rules.sections.events.incentives")}
            </p>

            {/* Transparency Section */}
            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.rules.sections.transparency.title")}
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300 mb-4"
              dangerouslySetInnerHTML={{
                __html: i18n.t(
                  "club.rules.sections.transparency.description_html"
                ),
              }}
            ></p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.transparency.reports.description")}
            </p>
            <ul className="list-disc pl-6 mb-12 space-y-2">
              {["first", "second", "third"].map(item => (
                <li key={item} className="text-gray-600 dark:text-gray-300">
                  {i18n.t(
                    `club.rules.sections.transparency.reports.list.${item}`
                  )}
                </li>
              ))}
            </ul>

            {/* Final Section */}
            <h2 className="text-2xl font-bold mb-6">
              {i18n.t("club.rules.sections.final.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.rules.sections.final.first")}
            </p>
            <p
              className="text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: i18n.t("club.rules.sections.final.second_html"),
              }}
            ></p>
          </div>
        </section>
      </div>
    </div>
  );
}
