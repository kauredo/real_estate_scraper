import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAsyncOperation } from "@/hooks/useAsyncOperation";
import { submitContactForm } from "@/services/api";
import { Listing, ListingComplex } from "@/utils/interfaces";
import ButtonSpinner from "@/components/ui/ButtonSpinner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";
import { FloatingLabelTextarea } from "@/components/ui/FloatingLabelTextarea";

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
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear error when user starts typing
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ) => {
    setter(value);
    if (error) setError("");
  };

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

      const data = Object.fromEntries(formData.entries());
      const result = await execute(() => submitContactForm(data), {
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
          <span
            className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 animate-in fade-in slide-in-from-top-1 duration-200"
            role="alert"
          >
            {error}
          </span>
        )}
      </p>
      <form ref={form} onSubmit={validateUser}>
        <div className="mb-5">
          <FloatingLabelInput
            id="contact-name"
            type="text"
            label={t("contacts.form.fields.name")}
            name="contact[name]"
            value={name}
            onChange={(e) => handleInputChange(setName, e.target.value)}
            required
            error={!!error && !name}
          />
        </div>
        <div className="mb-5">
          <FloatingLabelInput
            id="contact-email"
            type="email"
            label={t("contacts.form.fields.email")}
            name="contact[email]"
            value={email}
            onChange={(e) => handleInputChange(setEmail, e.target.value)}
            required
            error={!!error && !pattern.test(email)}
          />
        </div>
        <div className="mb-5">
          <FloatingLabelInput
            id="contact-phone"
            type="tel"
            label={t("contacts.form.fields.phone")}
            name="contact[phone]"
            value={phone}
            onChange={(e) => handleInputChange(setPhone, e.target.value)}
          />
        </div>
        <div className="mb-5">
          <FloatingLabelTextarea
            id="contact-message"
            rows={6}
            label={t("contacts.form.fields.message")}
            name="contact[message]"
            value={message}
            onChange={(e) => handleInputChange(setMessage, e.target.value)}
            required
            error={!!error && !message}
          />
          {listing && (
            <Input type="hidden" name="contact[listing]" value={listing.slug} />
          )}
          {complex && (
            <Input type="hidden" name="contact[complex]" value={complex.slug} />
          )}
        </div>
        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className={
              "w-full font-bold p-3 transition flex items-center justify-center gap-2 " +
              (listing || complex ? "" : "rounded")
            }
          >
            {isLoading && <ButtonSpinner />}
            {isLoading
              ? t("common.saving") || "Sending..."
              : t("contacts.form.fields.send")}
          </Button>
        </div>
      </form>
    </div>
  );
}
