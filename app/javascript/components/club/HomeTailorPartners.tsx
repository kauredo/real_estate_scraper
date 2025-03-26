import React from "react";
import { i18n } from "../../languages/languages";

export default function HomeTailorPartners() {
  return (
    <div className="container mx-auto px-4">
      <section className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-center mb-4 text-dark dark:text-light">
          {i18n.t("club.home_tailor.header")}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
          {i18n.t("club.home_tailor.introduction")}
        </p>
      </section>

      <h1 className="text-3xl font-bold text-center mb-8 text-dark dark:text-light">
        {i18n.t("club.home_tailor.title")}
      </h1>

      {/* Main Content Sections */}
      <div className="space-y-8">
        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-6">
          {/* Content section 1 */}
        </section>

        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-6">
          {/* Content section 2 */}
        </section>
      </div>
    </div>
  );
}
