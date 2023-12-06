import { useRef } from "react";
import banner from "../../assets/images/banner.webp";

interface Props {
  photos: string[];
}

export default function QuarterCircle(props: Props) {
  const { photos } = props;
  const doorRef = useRef<any>(null);

  const removeClass = () => {
    setTimeout(() => {
      if (doorRef.current) {
        doorRef.current.classList.remove("moving");
      }
    }, 1600);
  };

  const changeImage = e => {
    e.preventDefault();

    let random_photo = photos[Math.floor(Math.random() * photos.length)];

    if (!doorRef.current) {
      return;
    }

    while (doorRef.current.style.backgroundImage == random_photo) {
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
      className={`quarter`}
      style={{
        backgroundImage: `url(${banner})`,
      }}
      onMouseEnter={() => {
        doorRef.current?.classList.add("moving");
      }}
      onClick={() => {
        doorRef.current?.classList.add("moving");
      }}
      onAnimationStart={e => changeImage(e)}
      onAnimationEnd={() => {
        doorRef.current?.classList.remove("moving");
      }}
    ></div>
  );
}
