import React, { useState } from "react";
import { navbarItemClass } from "../utils/Functions";
import { NavbarItemProps } from "../utils/Interfaces";

interface Props {
  item: NavbarItemProps;
  fullWidth?: boolean;
  leftAlign?: boolean;
}

export default function NavbarItem(props: Props) {
  const { item, fullWidth, leftAlign } = props;
  const { turbo, title, url, hover, img, children } = item;
  const className = title.length > 0 ? navbarItemClass(url, false) : "";

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
