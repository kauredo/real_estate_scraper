import React from "react";
import { i18n } from "../../languages/languages";

export default function SocialPartners() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold text-center mb-12 text-dark dark:text-light">
          {i18n.t("club.social_partners.header")}
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-4xl">
          {i18n.t("club.social_partners.introduction")}
        </p>
      </div>

      {/* Social Media Carousel Section */}
      <section className="mb-16 bg-white dark:bg-dark shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light">
          {i18n.t("club.social_partners.social_feed")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div
            id="tiktok-embed"
            className="min-h-[600px] bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
          >
            {/* TikTok embed */}
          </div>
          <div
            id="instagram-embed"
            className="min-h-[600px] bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
          >
            {/* Instagram embed */}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-8 h-full">
          {/* Additional content sections */}
        </section>
      </div>
    </div>
  );
}
