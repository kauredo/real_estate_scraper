import React from "react";
import { i18n } from "../../languages/languages";

export default function SocialPartners() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-center mb-4 text-dark dark:text-light">
          {i18n.t("club.social_partners.header")}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
          {i18n.t("club.social_partners.introduction")}
        </p>
      </section>

      {/* Social Media Carousel Section */}
      <section className="mb-12 bg-white dark:bg-dark shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
          {i18n.t("club.social_partners.social_feed")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div id="tiktok-embed" className="min-h-[600px]">
            {/* TikTok embed */}
          </div>
          <div id="instagram-embed" className="min-h-[600px]">
            {/* Instagram embed */}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-white dark:bg-dark shadow-lg rounded-lg p-6">
          {/* Additional content sections */}
        </section>
      </div>
    </div>
  );
}
