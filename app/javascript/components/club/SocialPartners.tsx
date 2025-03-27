import React from "react";
import { i18n } from "../../languages/languages";

export default function SocialPartners() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-3xl font-bold text-center mb-4 text-dark dark:text-light">
          {i18n.t("club.social_partners.introduction")}
        </h1>

        <p className="text-xl font-bold mb-6 text-dark dark:text-light text-center">
          {i18n.t("club.social_partners.subtitle")}
        </p>

        <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-4xl mb-16">
          {i18n.t("club.social_partners.description")}
        </p>

        {/* Lucas With Strangers Section */}
        <section className="w-full max-w-4xl mb-16">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
            {i18n.t("club.social_partners.partners_title")}
          </h2>

          <div className="bg-white dark:bg-dark shadow-lg rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4 text-dark dark:text-light">
              {i18n.t("club.social_partners.lucas.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {i18n.t("club.social_partners.lucas.description")}
            </p>

            {/* Placeholder for gif/video carousel */}
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-8">
              {/* Add gif/video content here */}
            </div>

            <a
              href="#"
              className="inline-block bg-beige-default dark:bg-beige-medium text-dark dark:text-dark px-6 py-3 rounded-lg font-semibold hover:shadow-2xl transition-all duration-200"
            >
              {i18n.t("club.social_partners.lucas.cta")}
            </a>
          </div>
        </section>

        {/* Join Section */}
        <section className="w-full max-w-4xl mb-16">
          <div className="bg-white dark:bg-dark shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
              {i18n.t("club.social_partners.join.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {i18n.t("club.social_partners.join.description")}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {i18n.t("club.social_partners.join.extra")}
            </p>
            <a
              href="https://wa.me/351932829084"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-beige-default dark:bg-beige-medium text-dark dark:text-dark px-6 py-3 rounded-lg font-semibold hover:shadow-2xl transition-all duration-200"
            >
              {i18n.t("club.social_partners.join.cta")}
            </a>
          </div>
        </section>

        {/* Impact Section */}
        <section className="w-full max-w-4xl mb-16">
          <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light">
            {i18n.t("club.social_partners.impact.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {i18n.t("club.social_partners.impact.description")}
          </p>

          {/* Placeholder for video carousel */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg">
              {/* Add Instagram embed */}
            </div>
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg">
              {/* Add TikTok embed */}
            </div>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-300 italic">
            {i18n.t("club.social_partners.impact.conclusion")}
          </p>
        </section>
      </div>
    </div>
  );
}
