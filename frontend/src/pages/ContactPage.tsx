import { useTranslation } from "react-i18next";
import MetaTags from "@/components/layout/MetaTags";
import ContactForm from "@/components/features/contact/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faStore,
  faMobile,
  faAt,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto mt-6 mb-12 px-8 text-black dark:text-light">
      <MetaTags
        pageType="contact"
        title={t("contacts.header")}
        description={t("contacts.meta_description")}
        url={window.location.href}
      />
      <section className="bg-white dark:bg-dark py-5 lg:py-[120px] overflow-hidden relative">
        <div className="container">
          <div className="flex flex-col tablet:flex-row lg:justify-around">
            <div className="w-full lg:w-1/2 xl:w-6/12 px-4">
              <div className="max-w-[570px] mb-12 lg:mb-0">
                <h1 className="standard block mb-4 text-base text-primary">
                  {t("contacts.contact_us")}
                </h1>
                <h2 className="text-dark dark:text-light mb-6 uppercase font-bold text-[32px] sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  {t("contacts.cta")}
                </h2>
                <div className="mt-4">
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                      <FontAwesomeIcon icon={faLocationArrow} />
                    </div>
                    <p className="ml-4 text-lg leading-[3rem] font-medium text-dark dark:text-light w-3/4">
                      {t("contacts.address")}
                    </p>
                  </dt>
                </div>
                <div className="mt-4">
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                      <FontAwesomeIcon icon={faStore} />
                    </div>
                    <p className="ml-4 text-lg leading-[3rem] font-medium text-dark dark:text-light w-3/4">
                      {t("contacts.office")}
                    </p>
                  </dt>
                </div>
                <div className="mt-4">
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                      <FontAwesomeIcon icon={faMobile} />
                    </div>
                    <p className="ml-4 text-lg leading-[3rem] font-medium text-dark dark:text-light w-3/4">
                      {t("contacts.phone")}
                    </p>
                  </dt>
                </div>
                <div className="mt-4">
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                      <FontAwesomeIcon icon={faAt} />
                    </div>
                    <p className="ml-4 text-lg leading-[3rem] font-medium text-dark dark:text-light w-3/4">
                      {t("contacts.email")}
                    </p>
                  </dt>
                </div>
                <div className="mt-4">
                  <a
                    href="https://www.facebook.com/sofiagalvaokw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                        <FontAwesomeIcon icon={faFacebook} />
                      </div>
                      <p className="ml-4 text-lg leading-[3rem] font-medium text-dark dark:text-light w-3/4">
                        {t("contacts.facebook")}
                      </p>
                    </dt>
                  </a>
                </div>
                <div className="mt-4">
                  <a
                    href="https://www.instagram.com/sofiagalvaogroupkw"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <dt className="flex items-center">
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium">
                        <FontAwesomeIcon icon={faInstagram} />
                      </div>
                      <p className="ml-4 text-lg leading-[3rem] font-medium text-dark dark:text-light w-3/4">
                        {t("contacts.instagram")}
                      </p>
                    </dt>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
