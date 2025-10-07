import React, { useRef } from "react";
import sofiaImage from "../../assets/images/sofia.jpg";

interface Props {
  photos: string[];
}

export default function QuarterCircle(props: Props) {
  const { photos } = props;
  const doorRef = useRef<HTMLDivElement | null>(null);

  const changeImage = (e: React.AnimationEvent<HTMLDivElement>) => {
    e.preventDefault();

    let random_photo = photos[Math.floor(Math.random() * photos.length)];

    if (!doorRef.current) {
      return;
    }

    while (doorRef.current.style.backgroundImage === `url(${random_photo})`) {
      random_photo = photos[Math.floor(Math.random() * photos.length)];
    }

    setTimeout(() => {
      if (!doorRef.current) {
        return;
      }

      doorRef.current.style.backgroundImage = `url(${random_photo})`;
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
