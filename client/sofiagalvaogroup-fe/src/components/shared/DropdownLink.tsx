import React, { useState, useRef, useEffect } from "react";
import { navbarItemClass } from "../utils/Functions";
import { NavbarItemProps } from "../utils/Interfaces";
import NavbarItem from "./NavbarItem";

export interface DropdownProps {
  title: string;
  items: NavbarItemProps[];
}

const DropdownLink = (props: DropdownProps) => {
  const { title, items } = props;
  const [showMenu, setShowMenu] = useState(false);
  const dropdownMenuRef = useRef<any>(null);
  const dropdownLinkRef = useRef<any>(null);

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
          items?.map(item => item.url)
        )
      : "";

  return (
    <div className="relative">
      <a
        href="#"
        ref={dropdownLinkRef}
        onClick={handleLinkClick}
        className={`${className} flex flex-nowrap`}
      >
        {title}
        {!showMenu ? (
          <i
            className="fa fa-chevron-down ml-2 text-xs"
            style={{ transform: "translateY(15%)" }}
            aria-hidden="true"
          ></i>
        ) : (
          <i
            className="fa fa-chevron-up ml-2 text-xs"
            style={{ transform: "translateY(15%)" }}
            aria-hidden="true"
          ></i>
        )}
      </a>
      <div
        className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-20 px-4 ${
          showMenu ? "block" : "hidden"
        }`}
        ref={dropdownMenuRef}
      >
        <ul className="py-2">
          {items?.map(item => (
            <li>
              <NavbarItem item={item} fullWidth />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownLink;
