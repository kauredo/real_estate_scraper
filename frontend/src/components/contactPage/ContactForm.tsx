import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAsyncOperation } from "../../hooks/useAsyncOperation";
import { submitContactForm } from "../../services/api";
import { Listing, ListingComplex } from "../../utils/interfaces";

interface Props {
  listing?: Listing;
  complex?: ListingComplex;
}

export default function ContactForm(props: Props) {
  const { t } = useTranslation();
  const { complex, listing } = props;
  const { isLoading, execute } = useAsyncOperation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const form = useRef(null);
  const pattern =
    /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;

  const validateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid_params = pattern.test(email) && name && message;

    if (valid_params) {
      setError("");

      // Prepare form data
      const formData = new FormData();
      formData.append("contact[name]", name);
      formData.append("contact[email]", email);
      formData.append("contact[phone]", phone);
      formData.append("contact[message]", message);

      if (listing) {
        formData.append("contact[listing]", listing.slug);
      }
      if (complex) {
        formData.append("contact[complex]", complex.slug);
      }

      const result = await execute(() => submitContactForm(formData), {
        successMessage: t("notifications.messages.contact_sent"),
        errorMessage: t("notifications.messages.contact_error"),
        showSuccessNotification: true,
      });

      if (result) {
        // Reset form on success
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } else {
      setError(t("contacts.form.error"));
    }
  };

  return (
    <div
      className={
        " p-8 sm:p-12 " +
        (listing || complex
          ? " tablet:shadow-md"
          : "relative rounded-lg shadow-lg")
      }
    >
      <p className="text-base text-body-color leading-relaxed mb-9 ">
        {listing || complex
          ? t("contacts.form.titles.visit")
          : t("contacts.form.titles.main")}

        <span className="flex items-center font-medium tracking-wide text-beige-default dark:text-beige-medium text-xs mt-1 ml-1">
          {t("contacts.form.consent")}
        </span>
        {error && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {error}
          </span>
        )}
      </p>
      <form ref={form} onSubmit={validateUser}>
        <div className="mb-6">
          <input
            type="text"
            placeholder={t("contacts.form.fields.name")}
            name="contact[name]"
            onChange={e => setName(e.target.value)}
            className={
              "w-full py-3 px-[14px] bg-white dark:bg-light border outline-none focus-visible:shadow-none focus:border-beige-default dark:focus:border-beige-medium " +
              (listing || complex ? "text-sm" : "rounded border-[#f0f0f0]")
            }
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            placeholder={t("contacts.form.fields.email")}
            name="contact[email]"
            onChange={e => setEmail(e.target.value)}
            className={
              "w-full py-3 px-[14px] bg-white dark:bg-light border outline-none focus-visible:shadow-none focus:border-beige-default dark:focus:border-beige-medium " +
              (listing || complex ? "text-sm" : "rounded border-[#f0f0f0]")
            }
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder={t("contacts.form.fields.phone")}
            name="contact[phone]"
            onChange={e => setPhone(e.target.value)}
            className={
              "w-full py-3 px-[14px] bg-white dark:bg-light border outline-none focus-visible:shadow-none focus:border-beige-default dark:focus:border-beige-medium " +
              (listing || complex ? "text-sm" : "rounded border-[#f0f0f0]")
            }
          />
        </div>
        <div className="mb-6">
          <textarea
            rows={6}
            placeholder={t("contacts.form.fields.message")}
            name="contact[message]"
            onChange={e => setMessage(e.target.value)}
            className={
              "w-full py-3 px-[14px] bg-white dark:bg-light border resize-none outline-none focus-visible:shadow-none focus:border-beige-default dark:focus:border-beige-medium " +
              (listing || complex ? "text-sm" : "rounded border-[#f0f0f0]")
            }
          ></textarea>
          {listing && (
            <input type="hidden" name="contact[listing]" value={listing.slug} />
          )}
          {complex && (
            <input type="hidden" name="contact[complex]" value={complex.slug} />
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={
              "w-full font-bold text-white dark:text-dark bg-beige-default dark:bg-beige-medium border dark:border-0 p-3 transition hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed " +
              (listing || complex ? "" : "rounded")
            }
          >
            {isLoading
              ? t("common.saving") || "Sending..."
              : t("contacts.form.fields.send")}
          </button>
        </div>
      </form>
    </div>
  );
}
