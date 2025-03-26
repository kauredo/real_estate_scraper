import React from "react";
import { i18n } from "../../languages/languages";

export default function Rules() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold text-center mb-12 text-dark dark:text-light">
          {i18n.t("club.rules.title")}
        </h1>

        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-8 mb-16 w-full max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: i18n.t("club.rules.content") }}
              className="text-gray-600 dark:text-gray-300"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
