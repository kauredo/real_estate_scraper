import React, { useRef, useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const form = useRef(null);
  const pattern =
    /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;

  const validateEmail = e => {
    e.preventDefault();
    const result = pattern.test(email);

    if (result) {
      form.current.submit().then(res => {
        console.log(res);
      });
    } else {
      setError(true);
    }
  };

  return (
    <section className="mx-auto container p-2 text-gray body-font flex md:flex-row flex-col items-center py-12">
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Subscreva à nossa newsletter:
        </h1>
        <p className="mb-8 leading-relaxed">
          Receba as últimas novidades sobre o mercado, dicas e notícias
          relevantes à sua compra e venda de imóveis.
        </p>
        <form
          ref={form}
          onSubmit={e => validateEmail(e)}
          action={window.Routes.newsletter_subscriptions_path()}
          method="post"
        >
          <div className="flex flex-row justify-start w-full max-w-md shadow-xl border-t border-b border-gray-200">
            <input
              className="border-l-4 border-bordeaux focus:outline-none px-4 w-full m-0"
              placeholder="Email"
              name="newsletter[email]"
              type="text"
              id="email"
              onChange={e => setEmail(e.target.value)}
            />
            <input
              className="inline-flex text-black py-2 px-6 focus:outline-none text-lg m-0 h-12 bg-gray-100"
              required
              type="submit"
              value="Subscrever"
            />
          </div>
          {error && (
            <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              Por favor insira um email válido
            </span>
          )}
        </form>
        <div className="flex lg:flex-row md:flex-col">
          <a className="mx-2 text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a className="mx-2 text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a className="mx-2 text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a className="mx-2 text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
      <div className="md:w-1/2 w-5/6">
        <img
          className="object-cover object-center"
          alt="hero"
          src="https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60"
        />
      </div>
    </section>
  );
}
