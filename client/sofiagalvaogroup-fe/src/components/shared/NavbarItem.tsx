import { navbarItemClass } from "../utils/Functions";
import { NavbarItemProps } from "../utils/Interfaces";
import { Link } from "react-router-dom";

interface Props {
  item: NavbarItemProps;
  fullWidth?: boolean;
}

export default function NavbarItem(props: Props) {
  const { item, fullWidth } = props;
  const { turbo, title, url, hover, img } = item;
  const className = title.length > 0 ? navbarItemClass(url, false) : "";

  return (
    <Link
      data-turbo={turbo}
      key={`${title}--desktop`}
      to={url}
      title={hover}
      className={`${className} ${fullWidth && "block !w-full text-right"}`}
    >
      {title}
      {img}
    </Link>
  );
}
