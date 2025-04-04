import React, { useEffect } from "react";
import { i18n } from "../../languages/languages";
import { Partner } from "../utils/Interfaces";
import SubNavbar from "../shared/SubNavbar";
import { clubSections } from "../utils/constants/clubSections";
import ClubHeader from "./ClubHeader";

interface Props {
  partners: Partner[];
}

export default function SocialPartners({ partners }: Props) {
  useEffect(() => {
    // Load Instagram embed
    const instagramScript = document.createElement("script");
    instagramScript.src = "https://www.instagram.com/embed.js";
    instagramScript.async = true;
    document.body.appendChild(instagramScript);

    // Load TikTok embed
    const tiktokScript = document.createElement("script");
    tiktokScript.src = "https://www.tiktok.com/embed.js";
    tiktokScript.async = true;
    document.body.appendChild(tiktokScript);

    // Look for span with text "Watch on TikTok" and remove it
    const removeTikTokText = () => {
      const tiktokText = document.querySelectorAll("span");
      tiktokText.forEach(text => {
        if (text.textContent === "Watch on TikTok") {
          // remove the parent element
          const parentElement = text.parentElement;
          if (parentElement) {
            parentElement.remove();
          }
          // remove the text node
          text.remove();
        }
      });
    };
    // Call the function to remove TikTok text
    removeTikTokText();
    // Observe DOM changes to remove TikTok text dynamically
    const observer = new MutationObserver(removeTikTokText);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      // Cleanup scripts on unmount
      document.body.removeChild(instagramScript);
      document.body.removeChild(tiktokScript);
      // Cleanup observer on unmount
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <SubNavbar items={clubSections} />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center pt-12">
          <ClubHeader />

          {/* Header Section */}
          <section className="w-full max-w-4xl">
            <div className="flex flex-col items-center mb-16 relative">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-dark dark:text-light">
                {i18n.t("club.social_partners.introduction")}
              </h1>
              <p className="text-xl font-semibold mb-6 text-dark dark:text-light text-center">
                {i18n.t("club.social_partners.subtitle")}
              </p>
              <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-4xl mb-16">
                {i18n.t("club.social_partners.description")}
              </p>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-10">
                <img
                  src="/logos/club-icon.webp"
                  alt=""
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </section>

          {/* Lucas With Strangers Section */}
          <section className="w-full max-w-4xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-dark dark:text-light">
              {i18n.t("club.social_partners.lucas.title")}
            </h2>
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-200 mb-8">
              {i18n.t("club.social_partners.lucas.description")}
            </p>

            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-8 overflow-hidden">
              <img
                src="/images/lucas.gif"
                alt="Lucas with Strangers"
                className="w-full h-full object-cover"
              />
            </div>

            <a
              href="#"
              className="inline-block whitespace-nowrap border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark"
            >
              {i18n.t("club.social_partners.lucas.cta")}
            </a>
          </section>

          {/* Join Section */}
          <section className="w-full max-w-4xl mb-16">
            <div className="relative py-12 overflow-hidden bg-white/25 dark:bg-dark/25 rounded-lg">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark dark:text-light">
                  {i18n.t("club.social_partners.join.title")}
                </h2>
                <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-200 mb-4">
                  {i18n.t("club.social_partners.join.description")}
                </p>
                <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-200 mb-8">
                  {i18n.t("club.social_partners.join.extra")}
                </p>
                <a
                  href="https://wa.me/351932829084"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block whitespace-nowrap border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark"
                >
                  {i18n.t("club.social_partners.join.cta")}
                </a>
              </div>
              <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 opacity-5">
                <img
                  src="/logos/club-icon.webp"
                  alt=""
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>
          </section>

          {/* Impact Section */}
          <section className="w-full max-w-4xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark dark:text-light">
              {i18n.t("club.social_partners.impact.title")}
            </h2>
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-200 mb-8">
              {i18n.t("club.social_partners.impact.description")}
            </p>

            <div className="space-y-12" id="socials">
              {partners.map(partner => (
                <div key={partner.id} className="relative py-8">
                  <h3 className="text-2xl font-bold mb-6 text-dark dark:text-light">
                    {partner.name}
                  </h3>
                  <div className="h-full overflow-x-auto overflow-y-hidden pb-4">
                    <div className="flex flex-nowrap gap-4 h-full">
                      {partner.social_media_posts.map(post => {
                        const isInstagram =
                          post.embed_html.includes("instagram");
                        const isTikTok = post.embed_html.includes("tiktok");

                        return (
                          <div
                            key={post.id}
                            className={`flex-none min-w-[325px] w-[325px] h-full ${
                              isInstagram ? "py-4" : ""
                            } `}
                          >
                            <div
                              className="w-full h-full"
                              dangerouslySetInnerHTML={{
                                __html: post.embed_html,
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 dark:text-gray-300 italic mt-8 mx-auto">
              {i18n.t("club.social_partners.impact.conclusion")}
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
