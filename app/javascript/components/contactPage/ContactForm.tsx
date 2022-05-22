import React, { useRef, useState } from "react";
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
      setError("Por favor insira valores válidos");
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
      <p className="text-base text-body-color leading-relaxed mb-9">
        {listing || complex
          ? "Precisa de mais informação? Quer marcar uma visita? Entre em contacto conosco!"
          : "Preencha o formulário e entraremos em contacto consigo:"}

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
            placeholder="Nome"
            name="contact[name]"
            onChange={e => setName(e.target.value)}
            className={
              "w-full py-3 px-[14px] text-body-color text-base border outline-none focus-visible:shadow-none focus:border-bordeaux " +
              (listing || complex ? "text-sm" : "rounded border-[f0f0f0]")
            }
          />
        </div>
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            name="contact[email]"
            onChange={e => setEmail(e.target.value)}
            className={
              "w-full py-3 px-[14px] text-body-color text-base border outline-none focus-visible:shadow-none focus:border-bordeaux " +
              (listing || complex ? "text-sm" : "rounded border-[f0f0f0]")
            }
          />
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Telefone"
            name="contact[phone]"
            onChange={e => setPhone(e.target.value)}
            className={
              "w-full py-3 px-[14px] text-body-color text-base border outline-none focus-visible:shadow-none focus:border-bordeaux " +
              (listing || complex ? "text-sm" : "rounded border-[f0f0f0]")
            }
          />
        </div>
        <div className="mb-6">
          <textarea
            rows={6}
            placeholder="Mensagem"
            name="contact[message]"
            onChange={e => setMessage(e.target.value)}
            className={
              "w-full py-3 px-[14px] text-body-color text-base border resize-none outline-none focus-visible:shadow-none focus:border-bordeaux " +
              (listing || complex ? "text-sm" : "rounded border-[f0f0f0]")
            }
          ></textarea>
          {listing && (
            <input type="hidden" name="contact[listing]" value={listing.id} />
          )}
          {complex && (
            <input type="hidden" name="contact[complex]" value={complex.id} />
          )}
        </div>
        <div>
          <button
            type="submit"
            className={
              "w-full font-bold text-white bg-bordeaux border p-3 transition hover:bg-opacity-90 " +
              (listing || complex ? "" : "rounded")
            }
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
