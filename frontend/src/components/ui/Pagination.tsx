import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import PaginationLeftArrow from "@/components/svgs/PaginationLeftArrow";
import PaginationRightArrow from "@/components/svgs/PaginationRightArrow";

interface PaginationProps {
  pagination: {
    current_page: number;
    per_page: number;
    total_count: number;
    total_pages: number;
  };
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const createPageUrl = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    return `?${newParams.toString()}`;
  };

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
    }
  };

  if (pagination.total_pages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label={t("pagination.aria_label") || "Pagination"}
      className="flex items-center justify-center py-4 md:py-10 sm:px-6 px-4 container mx-auto"
    >
      <div className="w-full flex items-center justify-between border-t border-gray-200 dark:border-beige-medium">
        {/* Previous page link */}
        <div className="flex items-center pt-3">
          {pagination.current_page > 1 ? (
            <a
              href={createPageUrl(pagination.current_page - 1)}
              onClick={(e) => handlePageClick(e, pagination.current_page - 1)}
              className="flex items-center text-gray-600 dark:text-light hover:text-beige-default dark:hover:text-beige-medium transition-all duration-200 ease-out min-h-[44px] px-2 rounded-md hover:bg-beige-default/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2"
              aria-label={`${t("pagination.go_to_page") || "Go to page"} ${pagination.current_page - 1}`}
            >
              <PaginationLeftArrow aria-hidden="true" />
              <span className="text-sm ml-3 font-medium leading-none">
                {t("pagination.previous")}
              </span>
            </a>
          ) : (
            <span className="flex items-center text-gray-300 dark:text-gray-600 cursor-not-allowed min-h-[44px] px-2" aria-disabled="true">
              <PaginationLeftArrow aria-hidden="true" />
              <span className="text-sm ml-3 font-medium leading-none">
                {t("pagination.previous")}
              </span>
            </span>
          )}
        </div>

        {/* Page numbers */}
        <div className="sm:flex hidden" role="list">
          {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(
            (page) => {
              const isCurrentPage = pagination.current_page === page;

              return (
                <a
                  key={`page-${page}`}
                  href={createPageUrl(page)}
                  onClick={(e) => handlePageClick(e, page)}
                  className={`text-sm font-medium leading-none border-t-2 pt-3 mr-2 px-3 py-1 min-w-[44px] min-h-[44px] inline-flex items-center justify-center transition-all duration-200 ease-out rounded-b-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2 ${
                    isCurrentPage
                      ? "text-beige-default dark:text-beige-medium border-beige-default dark:border-beige-medium cursor-default"
                      : "text-gray-600 dark:text-light border-transparent hover:text-beige-default dark:hover:text-beige-medium hover:border-beige-default dark:hover:border-beige-medium hover:bg-beige-default/5"
                  }`}
                  aria-label={
                    isCurrentPage
                      ? `${t("pagination.current_page") || "Current page"}, ${t("pagination.page") || "page"} ${page}`
                      : `${t("pagination.go_to_page") || "Go to page"} ${page}`
                  }
                  aria-current={isCurrentPage ? "page" : undefined}
                >
                  {page}
                </a>
              );
            }
          )}
        </div>

        {/* Mobile page indicator */}
        <div className="sm:hidden flex items-center pt-3">
          <span className="text-sm text-gray-600 dark:text-light">
            {t("pagination.page") || "Page"} {pagination.current_page}{" "}
            {t("pagination.of") || "of"} {pagination.total_pages}
          </span>
        </div>

        {/* Next page link */}
        <div className="flex items-center justify-end pt-3">
          {pagination.current_page < pagination.total_pages ? (
            <a
              href={createPageUrl(pagination.current_page + 1)}
              onClick={(e) => handlePageClick(e, pagination.current_page + 1)}
              className="flex items-center text-gray-600 dark:text-light hover:text-beige-default dark:hover:text-beige-medium transition-all duration-200 ease-out min-h-[44px] px-2 rounded-md hover:bg-beige-default/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-default focus-visible:ring-offset-2"
              aria-label={`${t("pagination.go_to_page") || "Go to page"} ${pagination.current_page + 1}`}
            >
              <span className="text-sm font-medium leading-none mr-3">
                {t("pagination.next")}
              </span>
              <PaginationRightArrow aria-hidden="true" />
            </a>
          ) : (
            <span className="flex items-center text-gray-300 dark:text-gray-600 cursor-not-allowed min-h-[44px] px-2" aria-disabled="true">
              <span className="text-sm font-medium leading-none mr-3">
                {t("pagination.next")}
              </span>
              <PaginationRightArrow aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
