import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import { subscribeToNewsletter } from "../../services/api";
import emailImage from "../../assets/images/email.webp";

export default function Newsletter() {
  const { t } = useTranslation();
  const { isLoading, execute } = useAsyncOperation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const pattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;

  const validateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid_email = pattern.test(email);

    if (valid_email && name) {
      setError("");

      const result = await execute(
        () => subscribeToNewsletter({ email, name }),
        {
          successMessage: t("notifications.messages.newsletter_subscribed"),
          errorMessage: t("notifications.messages.newsletter_error"),
          showSuccessNotification: true,
        }
      );

      if (result) {
        // Reset form on success
        setEmail("");
        setName("");
      }
    } else if (valid_email) {
      setError(t("home.newsletter.form.errors.name"));
    } else {
      setError(t("home.newsletter.form.errors.email"));
    }
  };

  return (
    <section
      id="newsletter"
      className="mx-auto container p-2 text-gray body-font flex md:flex-row flex-col items-center py-12 h-fit min-h-[25rem]"
    >
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 pr-4 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-dark dark:text-light">
          {t("home.newsletter.title")}
        </h2>
        <p className="mb-8 leading-relaxed mx-2 tablet:mr-4 text-dark dark:text-light">
          {t("home.newsletter.subtitle")}
          <span className="flex items-center font-medium tracking-wide text-beige-default dark:text-beige-medium text-xs">
            {t("home.newsletter.terms")}
          </span>
        </p>
        <form ref={form} onSubmit={validateUser}>
          <div className="w-full">
            <input
              className="border-l-4 border-beige-default dark:border-beige-medium bg-white dark:bg-light focus:outline-none py-2 px-4 w-4/5 m-0 mb-2"
              placeholder={t("home.newsletter.form.fields.name")}
              name="newsletter[name]"
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className="border-l-4 border-beige-default dark:border-beige-medium bg-white dark:bg-light focus:outline-none py-2 px-4 w-4/5 m-0 mb-2"
              placeholder={t("home.newsletter.form.fields.email")}
              name="newsletter[email]"
              type="text"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="w-4/5 inline-flex text-white dark:text-dark py-2 px-6 focus:outline-none text-lg m-0 h-12 bg-beige-default dark:bg-beige-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              required
              type="submit"
              disabled={isLoading}
              value={
                isLoading
                  ? t("common.saving") || "Subscribing..."
                  : t("home.newsletter.form.fields.subscribe")
              }
            />
          </div>
          {error && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {error}
            </span>
          )}
        </form>
      </div>
      <div
        className="h-[20rem] md:w-1/2 w-5/6 hidden md:block object-cover bg-center bg-no-repeat bg-cover object-center dark:opacity-80"
        style={{
          backgroundImage: `url(${emailImage})`,
        }}
      ></div>
    </section>
  );
}
