import React from "react";
import { i18n } from "../../languages/languages";
import Socials from "../shared/Socials";

export default function Profile() {
  return (
    <section
      id="profile"
      className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between md:min-h-[25rem] max-h-min md:py-0"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="h-min py-8 md:pb-2 text-ellipsis overflow-hidden">
          <h2 className="block mt-2 text-2xl text-dark dark:text-light sm:text-4xl">
            Sofia Galvão
          </h2>
          <h3 className="font-medium leading-tight text-xl">
            {i18n.t("about.profile.slogan")}
          </h3>
          <p className="mt-4 text-xl text-gray-500 dark:text-light max-w-2/3">
            {i18n.t("about.profile.description")}
          </p>
        </div>
      </div>
      <div className="mx-2 w-full md:w-1/3 ">
        <div className="container mx-auto max-w-sm overflow-hidden drop-shadow-lg mt-2 bg-white dark:bg-dark">
          <div
            className="relative z-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 3vw))",
            }}
          >
            <img
              loading="lazy"
              className="w-full object-cover object-center max-h-96 bg-[white]"
              src="/images/sofia.jpg"
              // src="https://repstaticneu.azureedge.net/images/2001/A/NWM/Medium/34672-45e231dc-f9d9-496b-81d6-2bec93045b4a.jpg"
              // src="https://scontent.flis8-1.fna.fbcdn.net/v/t1.6435-9/78767140_10217256708782271_7687124950188032000_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_ohc=atnum074oEoAX-oZt0C&_nc_ht=scontent.flis8-1.fna&oh=00_AT-GURf34LVDqlCX_oFOaISIJystsNYCk4ktkbw5BCqVkQ&oe=62443225"
              alt="Sofia Galvão"
            />
          </div>
          <Socials />
        </div>
      </div>
    </section>
  );
}
