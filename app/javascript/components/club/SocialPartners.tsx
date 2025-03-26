import React from "react";
import { i18n } from "../../languages/languages";

export default function SocialPartners() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-dark dark:text-light">
        {i18n.t("club.social_partners.header")}
      </h1>

      <div className="prose dark:prose-invert max-w-none">
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">
            {i18n.t("club.social_partners.introduction")}
          </h2>
          <p>{i18n.t("club.social_partners.description")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Partner cards will be mapped here when data is available */}
        </div>
      </div>
    </div>
  );
}
