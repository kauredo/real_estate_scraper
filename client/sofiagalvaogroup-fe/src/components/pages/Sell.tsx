import { i18n } from "../../languages/languages";
// import casafari from "casafari";
// export const cf = casafari("D9557C7E502424960F866EE4286B");

export default function Sell() {
  const meta_title = i18n.t("sell.header");
  const meta_description = i18n.t("sell.meta_description");

  return (
    <>
      <div className="pt-6 bg-white text-center md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
          <h1
            id="main-title"
            className="relative block md:hidden mt-2 text-3xl text-black sm:text-4xl px-4"
          >
            {meta_title}
          </h1>
        </div>
      </div>
      <section className="container mx-auto mt-6 mb-12 px-2 sm:px-8">
        <div className="py-8 md:py-0 bg-white">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="px-2 sm:px-0 lg:text-center">
              <p className="mt-2 text-3xl text-black sm:text-4xl">
                {i18n.t("sell.subheader")}
              </p>
            </div>
            <script type="text/javascript" defer></script>
            <div className="px-2 sm:px-0">
              <div className="lg:text-center">
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  {i18n.t("sell.paragraph.top")}
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  {i18n.t("sell.paragraph.middle")}
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  {i18n.t("sell.paragraph.bottom")}
                </p>
              </div>
              <div className="my-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i
                          className="fas fa-search-dollar"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.market")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="fas fa-star" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.eval")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i
                          className="fas fa-balance-scale"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.warranty")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="fas fa-camera" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.media")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i
                          className="fas fa-project-diagram"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.kw")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i
                          className="fas fa-comment-dollar"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.agencies")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="fas fa-mail-bulk" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.portal")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="fas fa-hashtag" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.socials")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="fas fa-bullhorn" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.promo")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="fas fa-home" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.open")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="fas fa-book-open" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.flyer")}
                      </p>
                    </dt>
                  </div>
                  <div>
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="far fa-handshake" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lg font-medium text-black w-3/4">
                        {i18n.t("sell.list.feedback")}
                      </p>
                    </dt>
                  </div>
                </dl>
              </div>
              <div className="lg:text-center">
                <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                  {i18n.t("sell.exclusive")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
