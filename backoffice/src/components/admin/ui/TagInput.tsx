/* eslint-disable no-restricted-syntax */
import React, { useState, KeyboardEvent } from "react";

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  description?: string;
  className?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  tags,
  onChange,
  placeholder = "Type and press Enter",
  description,
  className = "",
}) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (trimmedInput && !tags.includes(trimmedInput)) {
        onChange([...tags, trimmedInput]);
        setInput("");
      }
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
        {label}
      </label>
      {description && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2">
          {description}
        </p>
      )}
      <div className="flex flex-wrap gap-2 p-2 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 min-h-[42px]">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-primary-600 dark:text-primary-300 hover:text-primary-800 dark:hover:text-primary-100 focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] outline-none bg-transparent text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
        />
      </div>
    </div>
  );
};

export default TagInput;
