import React, { useRef, useState } from "react";

interface Props {
  photos: string[];
}

export default function QuarterCircle(props: Props) {
  const { photos } = props;
  const doorRef = useRef(null);

  const changeImage = e => {
    e.preventDefault;

    let random_photo = photos[Math.floor(Math.random() * photos.length)];

    while (doorRef.current.style.backgroundImage == random_photo) {
      random_photo = photos[Math.floor(Math.random() * photos.length)];
    }

    setTimeout(() => {
      doorRef.current.style.backgroundImage = `url(${random_photo})`;
    }, 600);
  };

  return (
    <div
      ref={doorRef}
      className="quarter h-60 w-60"
      style={{
        backgroundImage: "url(/images/banner.jpg)",
      }}
      onMouseOver={e => changeImage(e)}
    ></div>
  );
}
