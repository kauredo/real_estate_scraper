import React from "react";

interface CustomDotsProps {
  dots: React.ReactNode[];
  dotWidth?: number;
}

const CustomDots: React.FC<CustomDotsProps> = ({ dots, dotWidth = 30 }) => {
  const totalDots = dots.length;
  const currentSlide = dots.findIndex((dot: any) =>
    dot.props.className.includes("slick-active"),
  );

  return (
    <div className="custom-dots-container">
      <ul className="custom-dots flex justify-center gap-2 mt-4 overflow-x-auto px-4 py-2 no-scrollbar">
        {dots.map((dot: any, index) => {
          const isActive = dot.props.className.includes("slick-active");

          const handleClick = (e: React.MouseEvent) => {
            if (
              dot.props &&
              typeof dot.props.children?.props?.onClick === "function"
            ) {
              dot.props.children.props.onClick(e);
            } else if (dot.props && typeof dot.props.onClick === "function") {
              dot.props.onClick(e);
            }
          };

          return (
            <li key={index} className={`custom-dot-wrapper flex-shrink-0`}>
              <button
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
                type="button"
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
