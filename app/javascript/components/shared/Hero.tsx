import React, { useState } from "react";
import { i18n } from "../../languages/languages";
import { sanitizeURL } from "../utils/Functions";
import QuarterCircle from "./QuarterCircle";

interface Props {
  photos: string[];
}

function Hero(props: Props) {
  const { photos } = props;

  const title = i18n.t("home.slogan.middle").includes("home.slogan.middle") ? (
    <>
      {i18n.t("home.slogan.top")}
      <br />
      {i18n.t("home.slogan.bottom")}
    </>
  ) : (
    <>
      {i18n.t("home.slogan.top")}
      <br />
      {i18n.t("home.slogan.middle")}
      <br />
      {i18n.t("home.slogan.bottom")}
    </>
  );

  return (
    <section className="max-height">
      <div className="center-hero p-12 md:p-0 gap-4">
        <QuarterCircle photos={photos} />
        <div className="w-full md:w-min h-fit md:px-12 flex flex-col justify-center md:justify-end gap-4 md:gap-10">
          <h1
            className={
              "text-dark dark:text-light text-4xl md:text-7xl whitespace-nowrap"
            }
          >
            {title}
          </h1>
        </div>
      </div>
      <div className="relative bottom-5 left-0 right-0 center">
        <div className="flex justify-center">
          <a href={sanitizeURL(window.Routes.buy_path)}>
            <div className="px-5 lowercase">
              <p className="text-dark dark:text-light hover:text-beige-default dark:hover:text-beige-medium">
                {i18n.t("navbar.buy")}
              </p>
            </div>
          </a>
          <a
            href={sanitizeURL(window.Routes.sell_path)}
            data-turbolinks={false}
          >
            <div className="px-5 lowercase">
              <p className="text-dark dark:text-light hover:text-beige-default dark:hover:text-beige-medium">
                {i18n.t("navbar.sell")}
              </p>
            </div>
          </a>
          <a href="#cards">
            <div className="px-5 text-dark dark:text-light hover:text-beige-default dark:hover:text-beige-medium">
              <i className="fas fa-arrow-down"></i>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
