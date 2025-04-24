import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Routes from "../../utils/routes";

export default function ClubJoinForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState({ type: "", message: "" });
  const form = useRef<HTMLFormElement>(null);
  const pattern = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i;

  const validateUser = e => {
    e.preventDefault();
    const valid_params = pattern.test(email) && name && phone && termsAccepted;

    if (valid_params && form.current) {
      submitForm(e);
    } else {
      setError(t("club.form.error.generic"));
    }
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(form.current!);
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    const token = tokenElement ? (tokenElement as HTMLMetaElement).content : "";

    try {
      const response = await fetch(
        sanitizeURL(window.Routes.join_club_index_path),
        {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setFlash({
            type: "notice",
            message: t("club.flash.join.thanks"),
          });
          form.current?.reset();
          setName("");
          setEmail("");
          setPhone("");
          setTermsAccepted(false);
          setError("");
        } else {
          setError(data.error);
        }
      } else {
        setError(t("club.form.error.generic"));
      }
    } catch (err) {
      setError(t("club.form.error.generic"));
    }
  };

  return (
    <div className="p-8 relative rounded-lg bg-white/50 dark:bg-dark/50">
      {flash.type && flash.message && (
        <Flashes type={flash.type} message={flash.message} />
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
        onSubmit={e => validateUser(e)}
        action={Routes.join_club_index_path()}
        method="post"
        className="space-y-6"
      >
        <div>
          <input
            type="text"
            placeholder={t("club.form.fields.name")}
            name="name"
            onChange={e => setName(e.target.value)}
            className="w-full rounded-lg py-3 px-4 text-base bg-white dark:bg-light text-gray-700 border border-gray-200 outline-none focus:border-beige-default dark:focus:border-beige-medium focus:ring-2 focus:ring-beige-default/20 dark:focus:ring-beige-medium/20 transition-colors"
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder={t("club.form.fields.phone")}
            name="phone"
            onChange={e => setPhone(e.target.value)}
            className="w-full rounded-lg py-3 px-4 text-base bg-white dark:bg-light text-gray-700 border border-gray-200 outline-none focus:border-beige-default dark:focus:border-beige-medium focus:ring-2 focus:ring-beige-default/20 dark:focus:ring-beige-medium/20 transition-colors"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder={t("club.form.fields.email")}
            name="email"
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg py-3 px-4 text-base bg-white dark:bg-light text-gray-700 border border-gray-200 outline-none focus:border-beige-default dark:focus:border-beige-medium focus:ring-2 focus:ring-beige-default/20 dark:focus:ring-beige-medium/20 transition-colors"
          />
        </div>
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="terms_accepted"
              checked={termsAccepted}
              onChange={e => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-beige-default dark:text-beige-medium border-gray-300 rounded focus:ring-beige-default dark:focus:ring-beige-medium"
            />
            <span className="text-base text-gray-700 dark:text-gray-200">
              {t("club.form.fields.terms_prefix")}{" "}
              <a
                href={sanitizeURL(window.Routes.club_rules_path)}
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
          <button
            type="submit"
            className="w-full text-lg font-bold text-white dark:text-dark bg-beige-default dark:bg-beige-medium rounded-lg py-3 px-6 transition hover:bg-opacity-90 focus:ring-2 focus:ring-beige-default/20 dark:focus:ring-beige-medium/20"
          >
            {t("club.form.fields.send")}
          </button>
        </div>
      </form>
    </div>
  );
}
