import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MetaTags } from "@/components/layout/MetaTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchDollar,
  faStar,
  faBalanceScale,
  faCamera,
  faProjectDiagram,
  faCommentDollar,
  faMailBulk,
  faHashtag,
  faBullhorn,
  faHome,
  faBookOpen,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import Banner from "@/components/ui/Banner";

const ListingsSellPage = () => {
  const { t, i18n } = useTranslation();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Create iframe content with Casafari widget
    const iframeContent = `
      <!DOCTYPE html>
      <html lang="${i18n.language}">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="https://www.casafari.com/valuation-widget/widget.js"></script>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            overflow-x: hidden;
          }
          #casafari-container {
            width: 100%;
            min-height: 600px;
          }
        </style>
      </head>
      <body>
        <div id="casafari-container"></div>
        <script type="text/javascript">
          window.addEventListener('load', function() {
            if (window.initializeCasafariWidget) {
              try {
                window.initializeCasafariWidget({
                  key: "D9557C7E502424960F866EE4286B",
                  startingPage: "2",
                  showStartingPage: false,
                  operationType: "",
                  lang: "${i18n.language}"
                });
                console.log("Casafari widget initialized in iframe");
              } catch (error) {
                console.error("Error initializing Casafari widget:", error);
              }
            }
          });
        </script>
      </body>
      </html>
    `;

    // Write content to iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(iframeContent);
      iframeDoc.close();
    }

    // Auto-resize iframe based on content
    const resizeIframe = () => {
      if (iframe.contentWindow) {
        try {
          const contentHeight = iframe.contentWindow.document.body.scrollHeight;
          iframe.style.height = contentHeight + "px";
        } catch {
          // Cross-origin issue, use default height
          iframe.style.height = "620px";
        }
      }
    };

    // Try to resize after content loads
    const resizeTimer = setInterval(resizeIframe, 1000);
    setTimeout(() => clearInterval(resizeTimer), 10000); // Stop after 10 seconds

    return () => {
      clearInterval(resizeTimer);
    };
  }, [i18n.language]);

  const sellFeatures = [
    { icon: faSearchDollar, text: t("sell.list.market") },
    { icon: faStar, text: t("sell.list.eval") },
    { icon: faBalanceScale, text: t("sell.list.warranty") },
    { icon: faCamera, text: t("sell.list.media") },
    { icon: faProjectDiagram, text: t("sell.list.kw") },
    { icon: faCommentDollar, text: t("sell.list.agencies") },
    { icon: faMailBulk, text: t("sell.list.portal") },
    { icon: faHashtag, text: t("sell.list.socials") },
    { icon: faBullhorn, text: t("sell.list.promo") },
    { icon: faHome, text: t("sell.list.open") },
    { icon: faBookOpen, text: t("sell.list.flyer") },
    { icon: faHandshake, text: t("sell.list.feedback") },
  ];

  return (
    <>
      <MetaTags pageType="sell" />
      <Banner height="20vh" blurred={true} text={t("sell.header")} />

      <section className="container mx-auto mt-6 mb-12 px-2 sm:px-8">
        <div className="py-8 md:py-0 bg-white dark:bg-dark">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="px-2 sm:px-0 lg:text-center">
              <p className="mt-2 text-3xl text-dark dark:text-light sm:text-4xl">
                {t("sell.subheader")}
              </p>
            </div>

            {/* Casafari widget iframe */}
            <div className="w-full">
              <iframe
                ref={iframeRef}
                title="Casafari Property Valuation Widget"
                className="w-full border-0"
                style={{ minHeight: "620px" }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>

            <div className="px-2 sm:px-0">
              <div className="lg:text-center">
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-light lg:mx-auto">
                  {t("sell.paragraph.top")}
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-light lg:mx-auto">
                  {t("sell.paragraph.middle")}
                </p>
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-light lg:mx-auto">
                  {t("sell.paragraph.bottom")}
                </p>
              </div>

              <div className="my-10">
                <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                  {sellFeatures.map((feature, index) => (
                    <div key={index}>
                      <dt className="flex items-center">
                        <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                          <FontAwesomeIcon icon={feature.icon} />
                        </div>
                        <p className="ml-4 text-lg font-medium text-dark dark:text-light w-3/4">
                          {feature.text}
                        </p>
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="lg:text-center">
                <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-light lg:mx-auto">
                  {t("sell.exclusive")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListingsSellPage;
