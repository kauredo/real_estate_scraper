import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navbarItemClass } from "../../utils/functions";
import { NavbarItemProps } from "../../utils/interfaces";
import NavbarItem from "./NavbarItem";

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target as Node) &&
        dropdownLinkRef.current &&
        !dropdownLinkRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
        className={`${className} flex flex-nowrap hover:bg-beige-default dark:hover:bg-beige-medium hover:text-white dark:hover:text-dark p-2 rounded-md font-medium`}
      >
        {title}
        {img}
        {!showMenu ? (
          <FontAwesomeIcon
            icon="chevron-down"
            className="mx-2 text-xs text-black dark:text-light"
            style={{ transform: "translateY(15%)" }}
          />
        ) : (
          <FontAwesomeIcon
            icon="chevron-up"
            className="mx-2 text-xs text-black dark:text-light"
            style={{ transform: "translateY(15%)" }}
          />
        )}
      </a>
      <div
        className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-dark z-20 ${
          showMenu ? "block" : "hidden"
        }`}
        ref={dropdownMenuRef}
      >
        <ul className="py-2">
          {items?.map((item, idx) => (
            <li className="pr-2" key={`${item.title}-${idx}`}>
              <NavbarItem item={item} leftAlign />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownLink;
