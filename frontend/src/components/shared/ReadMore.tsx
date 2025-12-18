import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  length?: number;
  children: string;
}

export const ReadMore = (props: Props) => {
  const { t } = useTranslation();
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
          className="cursor-pointer text-beige-default dark:text-beige-medium font-bold hover:underline"
        >
          {isReadMore ? t("listing.text.more") : t("listing.text.less")}
        </span>
      </>
    );
  } else {
    return text;
  }
};
