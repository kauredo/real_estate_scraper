import React from "react";

export default function Newsletter() {
  return (
    <section className="mx-auto container p-2 text-gray-700 body-font flex md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
          Express yourself
        </h1>
        <p className="mb-8 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="flex flex-row justify-start w-full max-w-md shadow-xl border-t border-b border-gray-200">
          <input
            className="border-l-4 border-red-700 focus:outline-none px-4 w-full m-0"
            placeholder="Email"
            type="text"
          />
          <button className="inline-flex text-black py-2 px-6 focus:outline-none text-lg m-0 h-12 bg-gray-100">
            Subscribe
          </button>
        </div>
        <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
          Keep in touch with us.
        </p>
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
          src="https://images.unsplash.com/photo-1518272417499-b6ebd5fab96a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
      </div>
    </section>
  );
}
