import React from "react";
import { i18n } from "../../languages/languages";
import { getUrlParameter } from "../utils/Functions";
import { Pagy } from "../utils/Interfaces";

interface Props {
  pagy: Pagy;
}

export default function Pagination(props: Props) {
  const { pagy } = props;
  const currentPage = getUrlParameter("page") || "1";

  if (pagy.pages > 1) {
    return (
      <div className="flex items-center justify-center py-4 md:py-10 sm:px-6 px-4 container mx-auto">
        <div className="w-full flex items-center justify-between border-t border-gray-200 dark:border-beige-medium">
          <div className="w-20 flex items-center pt-3 text-gray-600 dark:text-light hover:text-beige-default dark:hover:text-beige-medium cursor-pointer">
            {pagy.prev && (
              <>
                <a href={pagy.prev_url}>
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.1665 4H12.8332"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.1665 4L4.49984 7.33333"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.1665 4.00002L4.49984 0.666687"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a href={pagy.prev_url}>
                  <p className="text-sm ml-3 font-medium leading-none ">
                    {i18n.t("pagination.previous")}
                  </p>
                </a>
              </>
            )}
          </div>
          <div className="sm:flex hidden">
            {pagy.series?.map(page => {
              let classes =
                "text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-light hover:text-beige-default dark:hover:text-beige-medium border-t border-transparent hover:border-beige-default dark:hover:border-beige-medium pt-3 mr-4 px-2";
              classes =
                currentPage === page
                  ? classes +
                    " !text-beige-default dark:!text-beige-medium !border-beige-default dark:!border-beige-medium"
                  : classes;
              let href =
                currentPage === page
                  ? "#"
                  : `${pagy.scaffold_url.replace(
                      "__pagy_page__",
                      page.toString()
                    )}`;
              if (page === "gap") {
                return (
                  <p key={`gap-${page}`} className="pt-3 mr-4">
                    ...
                  </p>
                );
              }
              return (
                <a key={`page-${page}`} href={href}>
                  <p className={classes}>{page}</p>
                </a>
              );
            })}
          </div>
          <div className="w-20 flex items-center pt-3 text-gray-600 dark:text-light hover:text-beige-default dark:hover:text-beige-medium cursor-pointer">
            {pagy.next && pagy.next_url && (
              <>
                <a href={pagy.next_url}>
                  <p className="text-sm font-medium leading-none mr-3">
                    {i18n.t("pagination.next")}
                  </p>
                </a>
                <a href={pagy.next_url}>
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.1665 4H12.8332"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 7.33333L12.8333 4"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.5 0.666687L12.8333 4.00002"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto border-t border-gray-200 dark:border-beige-medium mb-4 mt-8 w-[90%] md:w-3/5"></div>
  );
}
