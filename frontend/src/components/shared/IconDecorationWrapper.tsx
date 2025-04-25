import React from "react";
import clubIconLogo from "../../assets/logos/club-icon.webp";

interface Props {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  opacity?: "low" | "medium" | "high";
  position?: "left" | "right";
  className?: string;
  id?: string;
}

export default function IconDecorationWrapper({
  children,
  size = "lg",
  opacity = "medium",
  position = "right",
  className = "",
  id,
}: Props) {
  const sizeClasses = {
    sm: "w-48 h-48",
    md: "w-56 h-56",
    lg: "w-64 h-64",
  };

  const opacityClasses = {
    low: "opacity-5",
    medium: "opacity-10",
    high: "opacity-20",
  };

  const positionClasses = {
    left: "-left-4",
    right: "-right-4",
  };

  return (
    <div id={id} className={`relative ${className}`}>
      <div className="relative z-10">{children}</div>
      <div
        className={`absolute ${positionClasses[position]} top-1/2 transform -translate-y-1/2 ${opacityClasses[opacity]}`}
      >
        <img
          src={clubIconLogo}
          alt=""
          className={`${sizeClasses[size]} object-contain`}
        />
      </div>
    </div>
  );
}
