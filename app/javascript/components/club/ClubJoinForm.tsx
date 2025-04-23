import React, { useRef, useState } from "react";
import { i18n } from "../../languages/languages";

export default function ClubJoinForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const form = useRef(null);
  const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;

  const validateUser = e => {
    e.preventDefault();
    const valid_params = pattern.test(email) && name && phone;

    if (valid_params) {
      form.current.submit();
    } else {
      setError(i18n.t("club.form.error"));
    }
  };

  return (
    <div className="p-8 relative rounded-lg shadow-lg">
      <p className="text-base text-body-color leading-relaxed mb-9">
        {i18n.t("club.form.titles.main")}
        <span className="flex items-center font-medium tracking-wide text-beige-default dark:text-beige-medium text-xs mt-1 ml-1">
          {i18n.t("club.form.consent")}
        </span>
        {error && (
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            {error}
          </span>
        )}
      </p>
      <form
        ref={form}
        onSubmit={e => validateUser(e)}
        action={window.Routes.join_club_index_path()}
        method="post"
      >
        <div className="mb-6">
          <input
            type="text"
            placeholder={i18n.t("club.form.fields.name")}
            name="club_join[name]"
            onChange={e => setName(e.target.value)}
            className="w-full rounded py-3 px-[14px] text-sm bg-white dark:bg-light border border-[#f0f0f0] outline-none focus-visible:shadow-none focus:border-beige-default dark:focus:border-beige-medium"
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            placeholder={i18n.t("club.form.fields.email")}
            name="club_join[email]"
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded py-3 px-[14px] text-sm bg-white dark:bg-light border border-[#f0f0f0] outline-none focus-visible:shadow-none focus:border-beige-default dark:focus:border-beige-medium"
          />
        </div>
        <div className="mb-6">
          <input
            type="tel"
            placeholder={i18n.t("club.form.fields.phone")}
            name="club_join[phone]"
            onChange={e => setPhone(e.target.value)}
            className="w-full rounded py-3 px-[14px] text-sm bg-white dark:bg-light border border-[#f0f0f0] outline-none focus-visible:shadow-none focus:border-beige-default dark:focus:border-beige-medium"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full font-bold text-white dark:text-dark bg-beige-default dark:bg-beige-medium rounded p-3 transition hover:bg-opacity-90"
          >
            {i18n.t("club.form.fields.send")}
          </button>
        </div>
      </form>
    </div>
  );
}
