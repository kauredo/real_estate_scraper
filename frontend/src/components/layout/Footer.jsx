import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-dark text-dark dark:text-light py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <img
              src="/logos/main.webp"
              alt="Sofia Galvão Group"
              className="h-12 dark:hidden"
            />
            <img
              src="/logos/main_white.webp"
              alt="Sofia Galvão Group"
              className="h-12 hidden dark:block"
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Contactos</h3>
              <p>+351 93 28 29 084</p>
              <p>geral@sofiagalvaogroup.com</p>
              <p>Av. Dom Carlos I 124, Lisboa</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Links</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/comprar" className="hover:text-beige-default">
                    Comprar
                  </Link>
                </li>
                <li>
                  <Link to="/vender" className="hover:text-beige-default">
                    Vender
                  </Link>
                </li>
                <li>
                  <Link to="/contactos" className="hover:text-beige-default">
                    Contactos
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Social</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/sofiagalvaokw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-beige-default"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/sofiagalvaogroupkw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-beige-default"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>
            © {currentYear} Sofia Galvão Group.{" "}
            {t("footer.all_rights_reserved")}
          </p>
          <div className="mt-2 space-x-4">
            <Link to="/privacidade" className="hover:text-beige-default">
              {t("footer.privacy_policy")}
            </Link>
            <Link to="/termos_e_condicoes" className="hover:text-beige-default">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
