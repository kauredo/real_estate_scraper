import React, { useState, useRef, useEffect, Suspense, lazy } from "react";
import { navbarItemClass } from "../utils/Functions";
import { NavbarItemProps } from "../utils/Interfaces";
const NavbarItem = lazy(() => import("./NavbarItem"));

export interface DropdownProps {
  title: string;
  items: NavbarItemProps[];
  img?: any;
}

const DropdownLink = (props: DropdownProps) => {
  const { title, items, img } = props;
  const [showMenu, setShowMenu] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        dropdownLinkRef.current &&
        !dropdownLinkRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLinkClick = event => {
    event.preventDefault();
    setShowMenu(!showMenu);
  };

  const className =
    title.length > 0
      ? navbarItemClass(
          null,
          false,
          items
            ?.map(item => item.url)
            .filter((url): url is string => url !== undefined)
        )
      : "";

  return (
    <div className="relative">
      <a
        href="#"
        ref={dropdownLinkRef}
        onClick={handleLinkClick}
        className={`${className} flex flex-nowrap hover:bg-beige hover:text-white p-2 rounded-md font-medium`}
      >
        {title}
        {img}
        {!showMenu ? (
          <i
            className="fa fa-chevron-down mx-2 text-xs"
            style={{ transform: "translateY(15%)" }}
            aria-hidden="true"
          ></i>
        ) : (
          <i
            className="fa fa-chevron-up mx-2 text-xs"
            style={{ transform: "translateY(15%)" }}
            aria-hidden="true"
          ></i>
        )}
      </a>
      <div
        className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-20 ${
          showMenu ? "block" : "hidden"
        }`}
        ref={dropdownMenuRef}
      >
        <ul className="py-2">
          {items?.map(item => (
            <Suspense
              fallback={<div>Loading...</div>}
              key={`${item.title}_middle`}
            >
              <li className="pr-2">
                <NavbarItem item={item} leftAlign />
              </li>
            </Suspense>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownLink;
