import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { i18n } from "../../languages/languages";

interface Props {
  length?: number;
  children: any;
}

export const ReadMore = (props: Props) => {
  const { length, children } = props;
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  if (!text) return null;

  if (text.length > 1000) {
    return (
      <>
        {isReadMore ? text.slice(0, length) : text}
        <span
          onClick={toggleReadMore}
          className="cursor-pointer text-beige font-bold hover:underline"
        >
          {isReadMore
            ? i18n.t("listing.text.more")
            : i18n.t("listing.text.less")}
        </span>
      </>
    );
  } else {
    return text;
  }
};
