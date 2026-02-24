import { useId } from "react";
import { cn } from "@/utils/functions";

interface ImagePlaceholderProps {
  className?: string;
}

/**
 * Elegant placeholder for content without images.
 * Uses a subtle herringbone pattern evoking luxury parquet flooring,
 * rendered in the brand's beige/gold tones.
 */
export default function ImagePlaceholder({ className }: ImagePlaceholderProps) {
  const patternId = useId();

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-beige-light dark:bg-dark",
        className,
      )}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.35] dark:opacity-[0.15]"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={patternId}
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 20 L10 10 L20 20 M20 20 L30 10 L40 20"
              fill="none"
              stroke="#b08e5e"
              strokeWidth="0.75"
            />
            <path
              d="M0 40 L10 30 L20 40 M20 40 L30 30 L40 40"
              fill="none"
              stroke="#b08e5e"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-beige-light/80 dark:to-dark/80" />
    </div>
  );
}
