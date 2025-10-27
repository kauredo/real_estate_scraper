import React, { useEffect, useState } from "react";

interface TopProgressBarProps {
  isLoading?: boolean;
}

const TopProgressBar: React.FC<TopProgressBarProps> = ({ isLoading = true }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      // Complete the progress bar
      setProgress(100);
      return;
    }

    // Reset progress when loading starts
    setProgress(0);

    // Simulate progress: quickly go to 70%, then slow down
    const timer1 = setTimeout(() => setProgress(30), 100);
    const timer2 = setTimeout(() => setProgress(50), 300);
    const timer3 = setTimeout(() => setProgress(70), 600);
    const timer4 = setTimeout(() => setProgress(85), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isLoading]);

  if (!isLoading && progress === 100) {
    // Fade out after completion
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
};

export default TopProgressBar;
