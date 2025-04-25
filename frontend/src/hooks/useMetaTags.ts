import { useEffect } from "react";

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
}

export const useMetaTags = ({
  title,
  description,
  image,
  type = "website",
  url,
}: MetaTagsProps) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      updateMetaTag("og:title", title);
      updateMetaTag("twitter:title", title);
    }

    if (description) {
      updateMetaTag("description", description);
      updateMetaTag("og:description", description);
      updateMetaTag("twitter:description", description);
    }

    if (image) {
      updateMetaTag("og:image", image);
      updateMetaTag("twitter:image", image);
    }

    if (url) {
      updateMetaTag("og:url", url);
      updateMetaTag("twitter:url", url);
    }

    updateMetaTag("og:type", type);
    updateMetaTag("twitter:card", "summary_large_image");
  }, [title, description, image, type, url]);
};

const updateMetaTag = (name: string, content: string) => {
  let element =
    document.querySelector(`meta[name="${name}"]`) ||
    document.querySelector(`meta[property="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    if (name.startsWith("og:")) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};
