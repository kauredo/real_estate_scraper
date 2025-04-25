import React from "react";

interface CustomDotsProps {
  dots: any[];
  numDotsToShow?: number;
  dotWidth?: number;
}

const CustomDots: React.FC<CustomDotsProps> = ({
  dots,
  numDotsToShow = 10,
  dotWidth = 30,
}) => {
  const totalDots = dots.length;
  const currentSlide = dots.findIndex(dot =>
    dot.props.className.includes("slick-active")
  );

  const getVisibleDots = () => {
    const halfVisible = Math.floor(numDotsToShow / 2);
    let start = Math.max(0, currentSlide - halfVisible);
    let end = Math.min(totalDots, start + numDotsToShow);

    if (end - start < numDotsToShow) {
      start = Math.max(0, end - numDotsToShow);
    }

    return dots.slice(start, end);
  };

  return (
    <ul className="custom-dots flex justify-center gap-2 mt-4">
      {getVisibleDots().map((dot, index) => {
        const isActive = dot.props.className.includes("slick-active");
        const { className, onClick, children, ...restProps } = dot.props;

        return (
          <li key={index} {...restProps}>
            <div
              onClick={onClick}
              className={`custom-dot transition-all duration-300 ease-in-out cursor-pointer block ${
                isActive ? "bg-beige-default" : "bg-gray-200"
              }`}
              style={{
                width: `${dotWidth}px`,
                height: "4px",
                border: "none",
                padding: 0,
              }}
              role="button"
              tabIndex={0}
            >
              <span className="sr-only">{children}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default CustomDots;
