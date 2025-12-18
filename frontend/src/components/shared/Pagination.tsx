import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import PaginationLeftArrow from "../svgs/PaginationLeftArrow";
import PaginationRightArrow from "../svgs/PaginationRightArrow";

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
      <div className="w-full flex items-center justify-between border-t border-gray-200 dark:border-beige-medium">
        <div className="w-20 flex items-center pt-3 text-gray-600 dark:text-light hover:text-beige-default dark:hover:text-beige-medium cursor-pointer">
          {pagination.current_page > 1 && (
            <>
              <a
                href={createPageUrl(pagination.current_page - 1)}
                onClick={(e) => handlePageClick(e, pagination.current_page - 1)}
              >
                <PaginationLeftArrow />
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
                "text-sm font-medium leading-none cursor-pointer text-gray-600 dark:text-light hover:text-beige-default dark:hover:text-beige-medium border-t border-transparent hover:border-beige-default dark:hover:border-beige-medium pt-3 mr-4 px-2";

              if (isCurrentPage) {
                classes +=
                  " !text-beige-default dark:!text-beige-medium !border-beige-default dark:!border-beige-medium";
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
        <div className="w-20 flex items-center pt-3 text-gray-600 dark:text-light hover:text-beige-default dark:hover:text-beige-medium cursor-pointer">
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
                <PaginationRightArrow />
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
