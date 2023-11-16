import React, { useState } from "react";
import { i18n } from "../../languages/languages";

interface Props {
  status: string;
  padding?: boolean;
}

export default function Overlay(props: Props) {
  const { status, padding } = props;
  const color = status === "sold" ? "black" : "beige";

  if (status === "recent" || status === "standard" || status === null) {
    return null;
  }

  return (
    <div
      style={{ zIndex: 1 }}
      className={`absolute uppercase top-0 bottom-0 left-0 right-0 bg-${color} font-bold text-white text-4xl opacity-50 flex items-center justify-center ${
        padding ? "pt-12" : ""
      }}`}
    >
      {i18n.t(`listing.status.${status}`)}
    </div>
  );
}
