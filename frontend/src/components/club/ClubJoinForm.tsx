import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiRoutes } from "../../utils/routes";
import Flashes from "../shared/Flashes";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export default function ClubJoinForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState({ type: "", message: "" });
  const form = useRef<HTMLFormElement>(null);
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid_params = pattern.test(email) && name && phone && termsAccepted;

    if (valid_params && form.current) {
      form.current.submit();
      setFlash({
        type: "success", // Changed from "notice" to "success" for better styling
        message: t("club.flash.join.thanks"),
      });
      form.current.reset();
      setName("");
      setEmail("");
      setPhone("");
      setTermsAccepted(false);
      setError("");
    } else if (!termsAccepted) {
      setError(t("club.form.error.terms"));
    } else {
      setError(t("club.form.error.generic"));
    }
  };

  const clearFlash = () => {
    setFlash({ type: "", message: "" });
  };

  return (
    <div className="p-8 relative rounded-lg bg-white/50 dark:bg-dark/50">
      {flash.type && flash.message && (
        <Flashes
          type={flash.type}
          message={flash.message}
          onClose={clearFlash}
        />
      )}
      <h3 className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed mb-0">
        {t("club.form.titles.main")}
      </h3>
      <p className="leading-relaxed mb-8">
        <span className="flex items-center font-medium tracking-wide text-beige-default dark:text-beige-medium text-sm mt-2">
          {t("club.form.consent")}
        </span>
        {error && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-sm mt-2">
            {error}
          </span>
        )}
      </p>
      <form
        ref={form}
        onSubmit={(e) => validateUser(e)}
        action={apiRoutes.clubJoin}
        method="post"
        className="space-y-6"
      >
        <div>
          <Input
            type="text"
            placeholder={t("club.form.fields.name")}
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg py-3 px-4 text-base bg-white dark:bg-light text-gray-700 border border-gray-200 outline-none focus:border-beige-default dark:focus:border-beige-medium focus:ring-2 focus:ring-beige-default/20 dark:focus:ring-beige-medium/20 transition-colors"
          />
        </div>
        <div>
          <Input
            type="tel"
            placeholder={t("club.form.fields.phone")}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg py-3 px-4 text-base bg-white dark:bg-light text-gray-700 border border-gray-200 outline-none focus:border-beige-default dark:focus:border-beige-medium focus:ring-2 focus:ring-beige-default/20 dark:focus:ring-beige-medium/20 transition-colors"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder={t("club.form.fields.email")}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg py-3 px-4 text-base bg-white dark:bg-light text-gray-700 border border-gray-200 outline-none focus:border-beige-default dark:focus:border-beige-medium focus:ring-2 focus:ring-beige-default/20 dark:focus:ring-beige-medium/20 transition-colors"
          />
        </div>
        <div>
          <label className="flex items-center space-x-3">
            <Input
              type="checkbox"
              name="terms_accepted"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-beige-default dark:text-beige-medium border-gray-300 rounded focus:ring-beige-default dark:focus:ring-beige-medium"
            />
            <span className="text-base text-gray-700 dark:text-gray-200">
              {t("club.form.fields.terms_prefix")}{" "}
              <a
                href={apiRoutes.clubRules}
                target="_blank"
                rel="noopener noreferrer"
                className="text-beige-default dark:text-beige-medium hover:underline"
              >
                {t("club.form.fields.terms_link")}
              </a>
            </span>
          </label>
        </div>
        <div>
          <Button
            type="submit"
            className="w-full text-lg font-bold text-white dark:text-dark bg-beige-default dark:bg-beige-medium rounded-lg py-3 px-6 transition hover:bg-opacity-90 focus:ring-2 focus:ring-beige-default/20 dark:focus:ring-beige-medium/20"
          >
            {t("club.form.fields.send")}
          </Button>
        </div>
      </form>
    </div>
  );
}
