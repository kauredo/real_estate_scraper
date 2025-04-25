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
        return React.cloneElement(dot, {
          key: index,
          className: `${dot.props.className} custom-dot`,
          children: <span className="hidden">{dot.props.children}</span>,
          style: {
            width: `${dotWidth}px`,
            height: "4px",
            backgroundColor: dot.props.className.includes("slick-active")
              ? "var(--beige-default)"
              : "var(--grey)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "block",
          },
        });
      })}
    </ul>
  );
};

export default CustomDots;
