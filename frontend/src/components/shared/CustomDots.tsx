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
        {dots.map((dot: React.ReactNode, index) => {
          const isActive = (dot as React.ReactElement).props.className.includes(
            "slick-active",
          );

          const handleClick = (e: React.MouseEvent) => {
            const dotElement = dot as React.ReactElement;
            if (
              dotElement.props &&
              typeof dotElement.props.children?.props?.onClick === "function"
            ) {
              dotElement.props.children.props.onClick(e);
            } else if (
              dotElement.props &&
              typeof dotElement.props.onClick === "function"
            ) {
              dotElement.props.onClick(e);
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
