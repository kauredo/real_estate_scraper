import React from "react";
import { sanitizeURL } from "../utils/Functions";

interface NavItem {
  routeName: string;
  title: string;
  description?: string;
}

interface Props {
  items: NavItem[];
}

export default function SubNavbar({ items }: Props) {
  const currentPath = window.location.pathname;

  return (
    <div className="bg-white dark:bg-dark border-y border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center space-x-8">
          {items.map(item => {
            const itemPath = sanitizeURL(window.Routes[item.routeName]);
            const isActive = currentPath === itemPath;

            return (
              <a
                key={item.routeName}
                href={itemPath}
                className={`py-4 px-2 transition-colors duration-200 ${
                  isActive
                    ? "text-beige-default dark:text-beige-medium"
                    : "text-dark dark:text-light hover:text-beige-default dark:hover:text-beige-medium"
                }`}
                data-turbo="true"
              >
                {item.title}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
