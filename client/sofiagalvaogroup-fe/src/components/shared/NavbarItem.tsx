import React, { useState } from "react";
import { navbarItemClass } from "../utils/Functions";
import { NavbarItemProps } from "../utils/Interfaces";

interface Props {
  item: NavbarItemProps;
  fullWidth?: boolean;
}

export default function NavbarItem(props: Props) {
  const { item, fullWidth } = props;
  const { turbo, title, url, hover, img } = item;
  const className = title.length > 0 ? navbarItemClass(url, false) : "";

  return (
    <a
      data-turbo={turbo}
      key={`${title}--desktop`}
      href={url}
      title={hover}
      className={`${className} ${fullWidth && "block !w-full text-right"}`}
    >
      {title}
      {img}
    </a>
  );
}
