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
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ContactItemProps {
  icon: IconDefinition;
  text: string;
  href?: string;
}

function ContactItem({ icon, text, href }: ContactItemProps) {
  const content = (
    <div className="flex items-center group">
      <div
        className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige-default dark:border-beige-medium text-beige-default dark:text-beige-medium transition-colors group-hover:bg-beige-default/10"
        aria-hidden="true"
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className="ml-4 text-lg leading-relaxed font-medium text-dark dark:text-light">
        {text}
      </p>
    </div>
  );

  if (href) {
    return (
      <li className="mt-4">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity"
        >
          {content}
        </a>
      </li>
    );
  }

  return <li className="mt-4">{content}</li>;
}

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
                <ul
                  className="space-y-2"
                  aria-label={
                    t("contacts.contact_info") || "Contact information"
                  }
                >
                  <ContactItem
                    icon={faLocationArrow}
                    text={t("contacts.address")}
                  />
                  <ContactItem icon={faStore} text={t("contacts.office")} />
                  <ContactItem icon={faMobile} text={t("contacts.phone")} />
                  <ContactItem icon={faAt} text={t("contacts.email")} />
                  <ContactItem
                    icon={faFacebook}
                    text={t("contacts.facebook")}
                    href="https://www.facebook.com/sofiagalvaokw"
                  />
                  <ContactItem
                    icon={faInstagram}
                    text={t("contacts.instagram")}
                    href="https://www.instagram.com/sofiagalvaogroupkw"
                  />
                </ul>
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
