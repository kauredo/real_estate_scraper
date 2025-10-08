import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

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
    page: number,
  ) => {
    if (onPageChange) {
      e.preventDefault();
      onPageChange(page);
    }
  };

  if (pagination.total_pages === 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center py-4 md:py-10 sm:px-6 px-4 container mx-auto">
      <div className="w-full flex items-center justify-between border-t border-gray-200 dark:border-primary-500">
        <div className="w-20 flex items-center pt-3 text-gray-600 dark:text-light hover:text-primary-600 dark:hover:text-beige-medium cursor-pointer">
          {pagination.current_page > 1 && (
            <>
              <a
                href={createPageUrl(pagination.current_page - 1)}
                onClick={(e) => handlePageClick(e, pagination.current_page - 1)}
              >
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
              <a
                href={createPageUrl(pagination.current_page - 1)}
                onClick={(e) => handlePageClick(e, pagination.current_page - 1)}
              >
                <p className="text-sm ml-3 font-medium leading-none">
                  {t("pagination.previous")}
                </p>
              </a>
            </>
          )}
        </div>
        <div className="sm:flex hidden">
          {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map(
            (page) => {
              const isCurrentPage = pagination.current_page === page;
              let classes =
                "text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-light hover:text-primary-600 dark:hover:text-beige-medium border-t border-transparent hover:border-primary-600 dark:hover:border-beige-medium pt-3 mr-4 px-2";

              if (isCurrentPage) {
                classes +=
                  " !text-primary-600 dark:!text-beige-medium !border-primary-600 dark:!border-beige-medium";
              }

              return (
                <a
                  key={`page-${page}`}
                  href={createPageUrl(page)}
                  onClick={(e) => handlePageClick(e, page)}
                >
                  <p className={classes}>{page}</p>
                </a>
              );
            },
          )}
        </div>
        <div className="w-20 flex items-center pt-3 text-gray-600 dark:text-light hover:text-primary-600 dark:hover:text-beige-medium cursor-pointer">
          {pagination.current_page < pagination.total_pages && (
            <>
              <a
                href={createPageUrl(pagination.current_page + 1)}
                onClick={(e) => handlePageClick(e, pagination.current_page + 1)}
              >
                <p className="text-sm font-medium leading-none mr-3">
                  {t("pagination.next")}
                </p>
              </a>
              <a
                href={createPageUrl(pagination.current_page + 1)}
                onClick={(e) => handlePageClick(e, pagination.current_page + 1)}
              >
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
