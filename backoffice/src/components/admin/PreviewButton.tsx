import { useState } from "react";
import { generatePreviewToken } from "../../services/api";
import { Button, PreviewModal } from "./ui";

interface PreviewButtonProps {
  contentType: "blog_post" | "club_story" | "listing" | "listing_complex";
  contentId: number;
  label?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const PreviewButton = ({
  contentType,
  contentId,
  label = "👁️ Preview",
  variant = "outline",
  size = "md",
  className = "",
}: PreviewButtonProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handlePreview = async () => {
    try {
      setLoading(true);
      const response = await generatePreviewToken(contentType, contentId);
      setPreviewUrl(response.data.preview_url);
      setPreviewTitle(`Preview`);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error generating preview token:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handlePreview}
        variant={variant}
        size={size}
        isLoading={loading}
        className={className}
      >
        {label}
      </Button>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={previewUrl}
        title={previewTitle}
      />
    </>
  );
};

export default PreviewButton;
