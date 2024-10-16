import { i18n } from "../../languages/languages";
import ContactForm from "../shared/ContactForm";

function Contact() {
  const meta_title = i18n.t("contacts.header");
  const meta_description = i18n.t("contacts.meta_description");

  return (
    <div className="container mx-auto mt-6 mb-12 px-8">
      <section className="bg-white py-5 lg:py-[120px] overflow-hidden relative">
        <div className="container">
          <div className="flex flex-col tablet:flex-row lg:justify-around">
            <div className="w-full lg:w-1/2 xl:w-6/12 px-4">
              <div className="max-w-[570px] mb-12 lg:mb-0">
                <h1 className="standard block mb-4 text-base text-primary ">
                  {i18n.t("contacts.contact_us")}
                </h1>
                <h2 className=" text-dark mb-6 uppercase font-bold text-[32px] sm:text-[40px] lg:text-[36px] xl:text-[40px] ">
                  {i18n.t("contacts.cta")}
                </h2>
                <div className="mt-4">
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i
                        className="fas fa-location-arrow"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <p className="ml-4 text-lgleading-[3rem] font-medium text-black w-3/4">
                      Av. Dom Carlos I 124, Lisboa, Portugal
                    </p>
                  </dt>
                </div>
                <div className="mt-4">
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-store-alt" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lgleading-[3rem] font-medium text-black w-3/4">
                      KW Lead - Santos
                    </p>
                  </dt>
                </div>
                <div className="mt-4">
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-mobile-alt" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lgleading-[3rem] font-medium text-black w-3/4">
                      +351 93 28 29 084 - Sofia Galvão
                    </p>
                  </dt>
                </div>
                <div className="mt-4">
                  <dt className="flex items-center">
                    <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                      <i className="fas fa-at" aria-hidden="true"></i>
                    </div>
                    <p className="ml-4 text-lgleading-[3rem] font-medium text-black w-3/4">
                      geral@sofiagalvaogroup.com
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
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="fa fa-facebook-f" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lgleading-[3rem] font-medium text-black w-3/4">
                        /sofiagalvaokw
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
                      <div className="relative flex items-center justify-center h-12 w-12 rounded-md border-2 border-beige text-beige">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </div>
                      <p className="ml-4 text-lgleading-[3rem] font-medium text-black w-3/4">
                        @sofiagalvaogroupkw
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
}

export default Contact;
