import React, { useRef, useEffect } from "react";
import sofiaImage from "@/assets/images/sofia.jpg";
import {
  optimizeCloudinaryUrl,
  preloadImages,
} from "@/utils/imageOptimization";

interface Props {
  photos: string[];
}

export default function QuarterCircle(props: Props) {
  const { photos } = props;
  const doorRef = useRef<HTMLDivElement | null>(null);

  // Preload optimized images for better performance
  useEffect(() => {
    if (photos && photos.length > 0) {
      const optimizedPhotos = photos.map((url) =>
        optimizeCloudinaryUrl(url, {
          width: 800,
          height: 800,
          quality: "auto",
          format: "auto",
        }),
      );
      preloadImages(optimizedPhotos, 5);
    }
  }, [photos]);

  const changeImage = (e: React.AnimationEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!photos || photos.length === 0) return;

    let random_photo = photos[Math.floor(Math.random() * photos.length)];
    let optimized_photo = optimizeCloudinaryUrl(random_photo, {
      width: 800,
      height: 800,
      quality: "auto",
      format: "auto",
    });

    if (!doorRef.current) {
      return;
    }

    while (
      doorRef.current.style.backgroundImage === `url(${optimized_photo})`
    ) {
      random_photo = photos[Math.floor(Math.random() * photos.length)];
      optimized_photo = optimizeCloudinaryUrl(random_photo, {
        width: 800,
        height: 800,
        quality: "auto",
        format: "auto",
      });
    }

    setTimeout(() => {
      if (!doorRef.current) {
        return;
      }

      doorRef.current.style.backgroundImage = `url(${optimized_photo})`;
    }, 600);
  };

  return (
    <div
      ref={doorRef}
      className="quarter dark:opacity-80"
      style={{
        backgroundImage: `url(${sofiaImage})`,
      }}
      onMouseEnter={() => {
        doorRef.current?.classList.add("moving");
      }}
      onClick={() => {
        doorRef.current?.classList.add("moving");
      }}
      onAnimationStart={changeImage}
      onAnimationEnd={() => {
        doorRef.current?.classList.remove("moving");
      }}
    ></div>
  );
}
