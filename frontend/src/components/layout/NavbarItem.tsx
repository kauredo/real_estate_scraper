import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navbarItemClass } from "@/utils/functions";
import { NavbarItemProps } from "@/utils/interfaces";
import { Button } from "@/components/ui/Button";

interface Props {
  item: NavbarItemProps;
  fullWidth?: boolean;
  leftAlign?: boolean;
}

export default function NavbarItem(props: Props) {
  const { item, fullWidth, leftAlign } = props;
  const { title, url, hover, img, children, method, onClick } = item;
  const location = useLocation();
  const className =
    title.length > 0
      ? navbarItemClass(url || null, false, [], location.pathname)
      : "";
  const actualMethod = method ? method : "get";

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
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
      <Button
        onClick={handleClick}
        className={`${className} ${
          fullWidth && "block !w-full text-right !text-lg"
        } ${leftAlign && "block !w-full text-right"}`}
      >
        {title}
        {img && (
          <img
            src={img}
            alt=""
            className="w-5 h-5 rounded-full inline-block ml-2"
            loading="lazy"
          />
        )}
      </Button>
    );
  } else {
    return (
      <Link
        key={`${title}--desktop`}
        to={url || "/"}
        title={hover}
        className={`${className} ${
          fullWidth && "block !w-full text-right !text-lg"
        } ${leftAlign && "block !w-full text-right"}`}
      >
        {title}
        {img && (
          <img
            src={img}
            alt=""
            className="w-5 h-5 rounded-full inline-block ml-2"
            loading="lazy"
          />
        )}
      </Link>
    );
  }
}
