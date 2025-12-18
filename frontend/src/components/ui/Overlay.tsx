import { useTranslation } from "react-i18next";

interface Props {
  status: string;
  padding?: boolean;
  show?: boolean;
}

export default function Overlay(props: Props) {
  const { t } = useTranslation();
  const { status, padding, show } = props;
  const color = status === "sold" ? "black" : "beige-default";

  if (
    status === "standard" ||
    status === null ||
    (status === "recent" && !show)
  ) {
    return null;
  }

  if (status === "recent") {
    return (
      <div
        style={{ zIndex: 1 }}
        className={`absolute uppercase top-0 bottom-0 left-0 right-0 border-${color} border-[80px] border-double ${
          padding ? "pt-12" : ""
        }`}
      ></div>
    );
  }

  return (
    <div
      style={{ zIndex: 1 }}
      className={`absolute uppercase top-0 bottom-0 left-0 right-0 bg-${color} font-bold text-white dark:text-dark text-4xl opacity-50 flex items-center justify-center ${
        padding ? "pt-12" : ""
      }}`}
    >
      {t(`listing.status.${status}`)}
    </div>
  );
}
