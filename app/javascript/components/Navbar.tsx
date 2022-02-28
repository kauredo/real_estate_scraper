import React, { useState } from "react";
import { Transition } from "@headlessui/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const itemClass = (path, isMobile) => {
    const mobile =
      "text-gray-500 hover:bg-red-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium";
    const main =
      "text-gray-800 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
    const active =
      "text-red-500 hover:bg-red-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium";
    if (path === window.location.pathname) {
      if (isMobile) {
        return active + " block text-base";
      }
      return active;
    }
    if (isMobile) {
      return mobile;
    }
    return main;
  };
  return (
    <div>
      <nav className="bg-white-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href={window.Routes.root_path()}>
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#" className={itemClass("/", false)}>
                    Team
                  </a>

                  <a href="#" className={itemClass("#", false)}>
                    Projects
                  </a>

                  <a href="#" className={itemClass("#", false)}>
                    Calendar
                  </a>

                  <a href="#" className={itemClass("#", false)}>
                    Reports
                  </a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-white-900 inline-flex items-center justify-center p-2 rounded-md text-white-400 hover:text-white hover:bg-white-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {ref => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#" className={itemClass("/", true)}>
                  Team
                </a>

                <a href="#" className={itemClass("#", true)}>
                  Projects
                </a>

                <a href="#" className={itemClass("#", true)}>
                  Calendar
                </a>

                <a href="#" className={itemClass("#", true)}>
                  Reports
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}
