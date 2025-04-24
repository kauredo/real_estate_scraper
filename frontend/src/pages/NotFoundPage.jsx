import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex-auto bg-white dark:bg-dark flex items-center p-5 lg:p-20 overflow-hidden relative">
      <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white dark:bg-dark shadow-xl p-10 lg:p-20 text-dark dark:text-light relative md:flex items-center text-center md:text-left">
        <div className="w-full md:w-1/2">
          <div className="mb-10 lg:mb-20">
            <img
              loading="lazy"
              src="/logos/main.webp"
              alt="SGG logo"
              className="w-48 dark:hidden"
            />
            <img
              loading="lazy"
              src="/logos/main_white.webp"
              alt="SGG logo"
              className="w-48 hidden dark:block"
            />
          </div>
          <div className="mb-10 md:mb-20 text-gray-600 dark:text-light font-light">
            <h1 className="font-black uppercase text-3xl lg:text-5xl text-beige-default dark:text-beige-medium mb-10">
              404 - Page Not Found
            </h1>
            <p>We're sorry, the page you're looking for cannot be found.</p>
            <p>Please check the URL or go back to the homepage.</p>
          </div>
          <div className="mb-20 md:mb-0">
            <Link
              to="/"
              className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-beige-default dark:text-beige-medium hover:brightness-50 dark:hover:text-light dark:hover:brightness-100"
            >
              <i className="mr-2">←</i> Go Back
            </Link>
          </div>
        </div>
        <div className="w-full md:w-1/2 text-center">
          {/* SVG for 404 page can go here */}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
