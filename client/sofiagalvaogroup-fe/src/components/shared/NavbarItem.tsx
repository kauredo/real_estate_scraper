import { navbarItemClass } from "../utils/Functions";
import { NavbarItemProps } from "../utils/Interfaces";
import { HashLink } from "react-router-hash-link";

interface Props {
  item: NavbarItemProps;
  fullWidth?: boolean;
}

export default function NavbarItem(props: Props) {
  const { item, fullWidth } = props;
  const { turbo, title, url, hover, img, onClick } = item;
  const className = title.length > 0 ? navbarItemClass(url, false) : "";

  return (
    <HashLink
      data-turbo={turbo}
      key={`${title}--desktop`}
      to={url}
      title={hover}
      className={`${className} ${fullWidth && "block !w-full text-right"}`}
      onClick={onClick}
    >
      {title}
      {img}
    </HashLink>
  );
}
