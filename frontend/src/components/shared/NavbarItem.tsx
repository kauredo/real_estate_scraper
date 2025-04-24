import React, { useState } from "react";
import { navbarItemClass } from "../../utils/functions";
import { NavbarItemProps } from "../../utils/interfaces";

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

  const handleClick = async event => {
    event.preventDefault();
    const tokenElement = document.querySelector('meta[name="csrf-token"]');
    const token = tokenElement ? (tokenElement as HTMLMetaElement).content : "";

    if (url) {
      try {
        const response = await fetch(url, {
          method: actualMethod.toUpperCase(),
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": token,
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        window.location.reload();
      } catch (error) {
        console.error("Error:", error);
      }
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
