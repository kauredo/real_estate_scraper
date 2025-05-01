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
  const { turbo, title, url, hover, img, children, method } = item;
  const className = title.length > 0 ? navbarItemClass(url, false) : "";
  const actualMethod = method ? method : "get";
  const { logout } = useAuth();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (url?.includes("sign_out")) {
      try {
        await logout();
        window.location.href = "/";
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      window.location.href = url || "/";
    }
  };

  if (actualMethod === "get") {
    if (children) {
      return (
        <span
          key={`${title}--desktop`}
          className={`py-2 ${
            fullWidth && "block !w-full text-right !text-lg"
          } ${leftAlign && "block !w-full text-right"}`}
        >
          {children}
        </span>
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
  } else {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`${className} ${
          fullWidth && "block !w-full text-right !text-lg"
        } ${leftAlign && "block !w-full text-right"}`}
      >
        {title}
      </button>
    );
  }
}
