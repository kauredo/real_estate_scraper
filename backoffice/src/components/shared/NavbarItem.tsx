import React from "react";
import { navbarItemClass } from "../../utils/functions";
import { NavbarItemProps } from "../../utils/interfaces";
import { useAuth } from "../../context/AuthContext";

interface Props {
  item: NavbarItemProps;
  fullWidth?: boolean;
  leftAlign?: boolean;
}

export default function NavbarItem(props: Props) {
  const { item, fullWidth, leftAlign } = props;
  const { turbo, title, url, hover, img, children, method, onClick } = item;
  const className = title.length > 0 ? navbarItemClass(url || null, false) : "";
  const actualMethod = method ? method : "get";
  const { logout } = useAuth();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else if (url?.includes("sign_out")) {
      try {
        await logout();
        window.location.href = "/";
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else if (actualMethod !== "get") {
      window.location.href = url || "/";
    }
  };

  if (children) {
    return (
      <span
        key={`${title}--desktop`}
        className={`py-2 ${fullWidth && "block !w-full text-right !text-lg"} ${
          leftAlign && "block !w-full text-right"
        }`}
      >
        {children}
      </span>
    );
  } else if (onClick || actualMethod !== "get") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`${className} ${
          fullWidth && "block !w-full text-right !text-lg"
        } ${leftAlign && "block !w-full text-right"}`}
      >
        {title}
        {img}
      </button>
    );
  } else {
    return (
      <a
        data-turbo={turbo}
        key={`${title}--desktop`}
        href={url}
        title={hover}
        className={`${className} ${
          fullWidth && "block !w-full text-right !text-lg"
        } ${leftAlign && "block !w-full text-right"}`}
      >
        {title}
        {img}
      </a>
    );
  }
}
