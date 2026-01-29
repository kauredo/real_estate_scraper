import { useTranslation } from "react-i18next";
import { Lightbox } from "@/components/ui/Lightbox";
import { useLightbox } from "@/components/ui/useLightbox";

interface Props {
  photos: string[];
}

export default function PhotoGallery({ photos }: Props) {
  const { t } = useTranslation();
  const lightbox = useLightbox(photos);

  const getGridLayout = () => {
    switch (photos.length) {
      case 1:
        return "flex justify-center";
      case 2:
        return "grid grid-cols-2";
      case 3:
        return "grid grid-cols-3";
      case 4:
        return "grid grid-cols-2";
      default:
        return "grid grid-cols-3";
    }
  };

  const getImageClass = (index: number) => {
    switch (photos.length) {
      case 1:
        return "max-w-3xl w-full h-[500px]";
      case 2:
        return "w-full h-[400px]";
      case 3:
        return "w-full h-[300px]";
      case 4:
        return `w-full ${index < 2 ? "h-[400px]" : "h-[300px]"}`;
      default:
        return `w-full ${index < 3 ? "h-[350px]" : "h-[250px]"}`;
    }
  };

  if (photos.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <Lightbox
        images={lightbox.images}
        initialIndex={lightbox.initialIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.closeLightbox}
        alt="Gallery"
      />

      <div className={`gap-4 ${getGridLayout()}`}>
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => lightbox.openLightbox(index)}
            className={`rounded overflow-hidden cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-beige-default focus:ring-offset-2 group ${getImageClass(index)}`}
            aria-label={`${t("lightbox.view_image") || "View image"} ${index + 1} ${t("lightbox.of") || "of"} ${photos.length}`}
          >
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:brightness-105"
              draggable={false}
            />
          </button>
        ))}
      </div>

      {photos.length > 0 && (
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
          {t("listing.click_to_enlarge") || "Click image to enlarge"}
        </p>
      )}
    </div>
  );
}
