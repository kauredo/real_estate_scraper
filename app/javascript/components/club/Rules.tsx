import React from "react";
import { i18n } from "../../languages/languages";

export default function Rules() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-dark dark:text-light">
        {i18n.t("club.rules.header")}
      </h1>

      <div className="prose dark:prose-invert max-w-3xl mx-auto">
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            {i18n.t("club.rules.introduction")}
          </h2>
          <div
            className="whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: i18n.t("club.rules.content"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
