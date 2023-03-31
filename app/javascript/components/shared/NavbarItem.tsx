import React, { useState } from "react";
import { NavbarItemProps } from "../utils/Interfaces";

export default function NavbarItem(props: { item: NavbarItemProps }) {
  const { item } = props;
  const { turbo, title, url, hover, img } = item;

  const itemClass = (path, isMobile) => {
    const base =
      "whitespace-nowrap hover:bg-beige hover:text-white px-3 py-2 rounded-md font-medium mx-1 lowercase ";
    const mobile = "block text-base relative z-3 ";
    const desktop = "text-sm ";
    const inactive = "text-gray-800 ";
    const active = "bg-beige text-white ";

    if (path === window.location.pathname && isMobile) {
      return base + active + mobile;
    }
    if (path === window.location.pathname) {
      return base + active + desktop;
    }
    if (isMobile) {
      return base + inactive + mobile;
    }
    return base + inactive + desktop;
  };

  return (
    <a
      data-turbo={turbo}
      key={`${title}--desktop`}
      href={url}
      title={hover}
      className={title.length > 0 ? itemClass(url, false) : ""}
    >
      {title}
      {img}
    </a>
  );
}
