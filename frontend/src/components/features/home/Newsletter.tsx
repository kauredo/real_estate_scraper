import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAsyncOperation } from "@/hooks/useAsyncOperation";
import { subscribeToNewsletter } from "@/services/api";
import emailImage from "@/assets/images/email.webp";
import { Button } from "@/components/ui/Button";
import { FloatingLabelInput } from "@/components/ui/FloatingLabelInput";

export default function Newsletter() {
  const { t } = useTranslation();
  const { isLoading, execute } = useAsyncOperation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const pattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;

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
    const valid_email = pattern.test(email);

    if (valid_email && name) {
      setError("");

      const result = await execute(
        () => subscribeToNewsletter({ email, name }),
        {
          successMessage: t("notifications.messages.newsletter_subscribed"),
          errorMessage: t("notifications.messages.newsletter_error"),
          showSuccessNotification: true,
        },
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
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex md:flex-row flex-col items-center gap-8 md:gap-12">
        <div className="flex-1 flex flex-col md:items-start md:text-left items-center text-center">
          <h2 className="text-3xl md:text-4xl mb-4 font-medium text-dark dark:text-light">
            {t("home.newsletter.title")}
          </h2>
          <p className="mb-6 leading-relaxed text-dark dark:text-light">
            {t("home.newsletter.subtitle")}
          </p>
          <p className="mb-6 font-medium text-beige-default dark:text-beige-medium text-sm">
            {t("home.newsletter.terms")}
          </p>
          <form ref={form} onSubmit={validateUser} className="w-full max-w-lg">
            <div className="space-y-4">
              <FloatingLabelInput
                label={t("home.newsletter.form.fields.name")}
                name="newsletter[name]"
                type="text"
                id="newsletter-name"
                value={name}
                onChange={(e) => handleInputChange(setName, e.target.value)}
                required
                error={!!error && !name}
                aria-describedby={error && !name ? "newsletter-form-error" : undefined}
                aria-invalid={!!error && !name}
              />
              <FloatingLabelInput
                label={t("home.newsletter.form.fields.email")}
                name="newsletter[email]"
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => handleInputChange(setEmail, e.target.value)}
                required
                error={!!error && !pattern.test(email)}
                aria-describedby={error && !pattern.test(email) ? "newsletter-form-error" : undefined}
                aria-invalid={!!error && !pattern.test(email)}
              />
              <Button
                variant="outline"
                className="w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading
                  ? t("common.saving") || "Subscribing..."
                  : t("home.newsletter.form.fields.subscribe")}
              </Button>
            </div>
            {error && (
              <span
                id="newsletter-form-error"
                role="alert"
                className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-2"
              >
                {error}
              </span>
            )}
          </form>
        </div>
        <div
          className="flex-1 h-[20rem] md:h-[25rem] w-full rounded-lg bg-center bg-no-repeat bg-cover dark:opacity-80 hidden md:block"
          style={{
            backgroundImage: `url(${emailImage})`,
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
