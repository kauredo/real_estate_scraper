import { i18n } from "../../languages/languages";
import { getUrlParameter } from "../utils/Functions";
import { Pagy } from "../utils/Interfaces";
import { HashLink } from "react-router-hash-link";

interface Props {
  pagy: Pagy;
  page: number;
  setPage: Function;
}

export default function Pagination(props: Props) {
  const { pagy, page, setPage } = props;

  if (pagy.pages > 1) {
    return (
      <div className="flex items-center justify-center py-4 md:py-10 lg:px-0 sm:px-6 px-4">
        <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
          <div className="w-20 flex items-center pt-3 text-gray-600 hover:text-beige cursor-pointer">
            {pagy.prev && (
              <>
                <HashLink to={pagy.prevUrl}>
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
                </HashLink>
                <p
                  className="text-sm ml-3 font-medium leading-none "
                  onClick={() => page && setPage && setPage(page - 1)}
                >
                  {i18n.t("pagination.previous")}
                </p>
              </>
            )}
          </div>
          <div className="sm:flex hidden">
            {pagy.series.map(thisPage => {
              console.log(thisPage);
              let classes =
                "text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-beige border-t border-transparent hover:border-beige pt-3 mr-4 px-2";
              classes =
                page === Number(thisPage)
                  ? classes + " !text-beige !border-beige"
                  : classes;
              return (
                <p
                  key={`page-${thisPage}`}
                  className={classes}
                  onClick={() => page && setPage && setPage(thisPage)}
                >
                  {thisPage}
                </p>
              );
            })}
          </div>
          <div className="w-20 flex items-center pt-3 text-gray-600 hover:text-beige cursor-pointer">
            {pagy.next && (
              <>
                <p
                  className="text-sm font-medium leading-none mr-3"
                  onClick={() => page && setPage && setPage(page + 1)}
                >
                  {i18n.t("pagination.next")}
                </p>
                <HashLink to={pagy.nextUrl}>
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
                </HashLink>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <></>;
}
