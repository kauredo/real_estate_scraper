import React, { useEffect } from "react";
import { i18n } from "../../languages/languages";
import { Partner } from "../utils/Interfaces";
import SubNavbar from "../shared/SubNavbar";
import { clubSections } from "../utils/constants/clubSections";

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
        <div className="flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-dark dark:text-light">
              {i18n.t("club.social_partners.introduction")}
            </h1>
            <p className="text-xl font-bold mb-6 text-dark dark:text-light text-center">
              {i18n.t("club.social_partners.subtitle")}
            </p>
            <p className="text-center text-gray-600 dark:text-gray-300 text-lg max-w-4xl mb-16">
              {i18n.t("club.social_partners.description")}
            </p>
          </div>

          {/* Lucas With Strangers Section */}
          <section className="w-full max-w-4xl mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-dark dark:text-light">
              {i18n.t("club.social_partners.partners_title")}
            </h2>

            <div className="bg-white/50 dark:bg-dark/50 shadow-lg rounded-lg p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-dark dark:text-light">
                {i18n.t("club.social_partners.lucas.title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                {i18n.t("club.social_partners.lucas.description")}
              </p>

              {/* Video/Image Gallery Section */}
              <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-8 overflow-hidden">
                {/* This is a gif in images/lucas.gif */}
                <img
                  src="/images/lucas.gif"
                  alt="Lucas with Strangers"
                  className="w-full h-full object-cover"
                />
              </div>

              <a
                href="#"
                className="whitespace-nowrap mx-auto mb-4 border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark"
              >
                {i18n.t("club.social_partners.lucas.cta")}
              </a>
            </div>
          </section>

          {/* Join Section */}
          <section className="w-full max-w-4xl mb-16">
            <div className="bg-white/50 dark:bg-dark/50 shadow-lg rounded-lg p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-dark dark:text-light">
                {i18n.t("club.social_partners.join.title")}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                {i18n.t("club.social_partners.join.description")}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
                {i18n.t("club.social_partners.join.extra")}
              </p>
              <a
                href="https://wa.me/351932829084"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap mx-auto mb-4 border-beige-default dark:border-beige-medium border-2 text-beige-default dark:text-beige-medium text-base px-4 py-2 rounded hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark"
              >
                {i18n.t("club.social_partners.join.cta")}
              </a>
            </div>
          </section>

          {/* Impact Section */}
          <section className="w-full max-w-4xl mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-dark dark:text-light">
              {i18n.t("club.social_partners.impact.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-8">
              {i18n.t("club.social_partners.impact.description")}
            </p>

            <div className="space-y-8" id="socials">
              {partners.map(partner => (
                <div
                  key={partner.id}
                  className="bg-white/50 dark:bg-dark/50 shadow-lg rounded-lg p-6"
                >
                  <h3 className="text-xl font-bold mb-4 text-dark dark:text-light">
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
