import React, { useRef, useState } from "react";
import { i18n } from "../../languages/languages";
import { Listing, ListingComplex } from "../utils/Interfaces";

interface Props {
  listing?: Listing;
  complex?: ListingComplex;
}

export default function ContactForm(props: Props) {
  const { complex, listing } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const form = useRef(null);
  const pattern =
    /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;

  const validateUser = e => {
    e.preventDefault();
    const valid_params = pattern.test(email) && name && message;

    if (valid_params) {
      form.current.submit().then(res => {
        console.log(res);
      });
    } else {
      setError(i18n.t("contacts.form.error"));
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
          ? i18n.t("contacts.form.titles.visit")
          : i18n.t("contacts.form.titles.main")}

        <span className="flex items-center font-medium tracking-wide text-beige text-xs mt-1 ml-1">
          {i18n.t("contacts.form.consent")}
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
        action={window.Routes.new_contact_path()}
        method="post"
      >
        <div className="mb-6">
          <input
            type="text"
            placeholder={i18n.t("contacts.form.fields.name")}
            name="contact[name]"
            onChange={e => setName(e.target.value)}
            className={
              "w-full py-3 px-[14px] text-body-color text-base border outline-none focus-visible:shadow-none focus:border-beige " +
              (listing || complex ? "text-sm" : "rounded border-[f0f0f0]")
            }
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            placeholder={i18n.t("contacts.form.fields.email")}
            name="contact[email]"
            onChange={e => setEmail(e.target.value)}
            className={
              "w-full py-3 px-[14px] text-body-color text-base border outline-none focus-visible:shadow-none focus:border-beige " +
              (listing || complex ? "text-sm" : "rounded border-[f0f0f0]")
            }
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder={i18n.t("contacts.form.fields.phone")}
            name="contact[phone]"
            onChange={e => setPhone(e.target.value)}
            className={
              "w-full py-3 px-[14px] text-body-color text-base border outline-none focus-visible:shadow-none focus:border-beige " +
              (listing || complex ? "text-sm" : "rounded border-[f0f0f0]")
            }
          />
        </div>
        <div className="mb-6">
          <textarea
            rows={6}
            placeholder={i18n.t("contacts.form.fields.message")}
            name="contact[message]"
            onChange={e => setMessage(e.target.value)}
            className={
              "w-full py-3 px-[14px] text-body-color text-base border resize-none outline-none focus-visible:shadow-none focus:border-beige " +
              (listing || complex ? "text-sm" : "rounded border-[f0f0f0]")
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
            className={
              "w-full font-bold text-white bg-beige border p-3 transition hover:bg-opacity-90 " +
              (listing || complex ? "" : "rounded")
            }
          >
            {i18n.t("contacts.form.fields.send")}
          </button>
        </div>
      </form>
    </div>
  );
}
