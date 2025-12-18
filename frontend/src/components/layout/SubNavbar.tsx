import { Link, useLocation } from "react-router-dom";
import { SubNavItem } from "@/utils/interfaces";
import Routes from "@/utils/routes";

interface Props {
  items: SubNavItem[];
}

export default function SubNavbar({ items }: Props) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-white dark:bg-dark border-y border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 relative">
        {/* Scrollable container */}
        <div className="flex items-center justify-start md:justify-center space-x-8 overflow-x-auto scrollbar-hide py-2">
          {items.map((item) => {
            const routeValue = Routes[item.routeName as keyof typeof Routes];
            const itemPath = typeof routeValue === "string" ? routeValue : "";
            const isActive = currentPath === itemPath;

            return (
              <Link
                key={item.routeName}
                to={itemPath}
                className={`py-2 px-2 transition-colors duration-200 text-sm md:text-base flex-shrink-0
                  ${
                    isActive
                      ? "text-beige-default dark:text-beige-medium border-b-2 border-beige-default dark:border-beige-medium"
                      : "text-dark dark:text-light hover:text-beige-default dark:hover:text-beige-medium"
                  }`}
              >
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
