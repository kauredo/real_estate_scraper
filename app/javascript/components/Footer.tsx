import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { i18n } from "../languages/languages";
import { sanitizeURL } from "./utils/Functions";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Footer() {
  const items = [
    {
      title: "Instagram",
      url: "https://www.instagram.com/sofiagalvaogroupkw/",
      icon: faInstagram,
    },
    {
      title: "Facebook",
      url: "https://www.facebook.com/sofiagalvaokw",
      icon: faFacebook,
    },
    { title: "Whatsapp", url: "https://wa.me/351932829084", icon: faWhatsapp },
    {
      title: "Linkedin",
      url: "https://www.linkedin.com/in/sofia-galv%C3%A3o-a141621/",
      icon: faLinkedin,
    },
  ];

  return (
    <footer className="bg-beige-default dark:bg-beige-medium p-4 sm:p-12 mt-12">
      <div className="container mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://sofiagalvaogroup.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <img
              loading="lazy"
              src="/logos/main_white.webp"
              className="h-12"
              alt="Sofia Galvão Group Alternative Logo"
            />
          </a>
          <ul className="flex flex-wrap items-center text-sm text-gray-500 dark:text-light">
            <li>
              <a
                href={sanitizeURL(window.Routes.about_path)}
                className="mr-4 hover:underline text-white dark:text-light hover:text-gray-100 dark:hover:text-gray-100 md:mr-6 "
              >
                {i18n.t("footer.about")}
              </a>
            </li>
            <li>
              <a
                href={sanitizeURL(window.Routes.privacy_path)}
                className="mr-4 hover:underline text-white dark:text-light hover:text-gray-100 dark:hover:text-gray-100 md:mr-6"
              >
                {i18n.t("footer.privacy")}
              </a>
            </li>
            <li>
              <a
                href={sanitizeURL(window.Routes.terms_and_conditions_path)}
                className="mr-4 hover:underline text-white dark:text-light hover:text-gray-100 dark:hover:text-gray-100 md:mr-6 "
              >
                {i18n.t("footer.terms")}
              </a>
            </li>
            <li>
              <a
                href={sanitizeURL(window.Routes.contact_path)}
                className="hover:underline text-white dark:text-light hover:text-gray-100 dark:hover:text-gray-100"
              >
                {i18n.t("footer.contacts")}
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-white dark:border-light sm:mx-auto lg:my-8" />
        <div className="sm:flex justify-between tablet:justify-start items-center ">
          <div className="tablet:pr-4">
            <p className="text-sm text-white dark:text-light">
              © {new Date().getFullYear()} Sofia Galvão Group. All Rights
              Reserved.
            </p>
            <p className="text-sm text-white dark:text-light">
              KW Lead Santos - Av Dom Carlos I, 124J - Santos, Lisboa
            </p>
            <p className="text-sm text-white dark:text-light">
              Agent Centric Mediação Imobiliária, Lda - AMI 12518
            </p>
          </div>
          <div className="flex mt-4 space-x-4 sm:justify-center sm:mt-0">
            {items?.map(item => {
              return (
                <a
                  key={`${item.title}--desktop`}
                  href={item.url}
                  className="text-white dark:text-light hover:text-gray-100 dark:hover:text-gray-100"
                >
                  <FontAwesomeIcon icon={item.icon as IconProp} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
