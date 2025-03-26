import React from "react";
import { i18n } from "../../languages/languages";

export default function Rules() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-dark dark:text-light">
          {i18n.t("club.rules.title")}
        </h1>

        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-8 mb-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: i18n.t("club.rules.content") }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
