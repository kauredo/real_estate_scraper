import React from "react";
import { Button } from "../ui/Button";

interface CustomDotsProps {
  dots: React.ReactNode[];
  dotWidth?: number;
}

const CustomDots: React.FC<CustomDotsProps> = ({ dots, dotWidth = 30 }) => {
  return (
    <div className="custom-dots-container">
      <ul className="custom-dots flex justify-center gap-2 mt-4 overflow-x-auto px-4 py-2 no-scrollbar">
        {React.Children.map(dots, (dot, index) => {
          if (!React.isValidElement(dot)) {
            return null;
          }
          const element = dot as React.ReactElement<{
            className: string;
            children?: React.ReactElement<{
              onClick?: (e: React.MouseEvent) => void;
            }>;
            onClick?: (e: React.MouseEvent) => void;
          }>;
          const isActive = element.props.className.includes("slick-active");

          const handleClick = (e: React.MouseEvent) => {
            if (
              element.props.children &&
              element.props.children.props &&
              typeof element.props.children.props.onClick === "function"
            ) {
              element.props.children.props.onClick(e);
            } else if (
              element.props &&
              typeof element.props.onClick === "function"
            ) {
              element.props.onClick(e);
            }
          };

          return (
            <li key={index} className={`custom-dot-wrapper flex-shrink-0`}>
              <Button
                onClick={handleClick}
                className={`custom-dot transition-all duration-300 ease-in-out cursor-pointer block ${
                  isActive ? "bg-beige-default" : "bg-gray-200"
                }`}
                style={{
                  width: `${dotWidth}px`,
                  height: "4px",
                  border: "none",
                  padding: 0,
                }}
                role="tab"
                aria-selected={isActive}
                aria-label={`Go to slide ${index + 1}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CustomDots;
