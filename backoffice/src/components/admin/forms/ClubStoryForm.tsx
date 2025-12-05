import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { adminDeleteClubStoryPhoto } from "../../../services/api";
import { isDarkModeActive } from "../../../utils/functions";
import { Input, Textarea, Button, PhotoManagementSection } from "../ui";
import RichTextEditor from "../../shared/RichTextEditor";

interface ClubStoryPhoto {
  id: number;
  main: boolean;
  image: { url: string };
}

export interface ClubStoryFormData {
  title: string;
  small_description: string;
  text: string;
  hidden: boolean;
  meta_title: string;
  meta_description: string;
  video_link?: string;
  club_story_photos?: ClubStoryPhoto[];
}

interface ClubStoryFormProps {
  initialData?: ClubStoryFormData;
  onSubmit: (data: ClubStoryFormData, newPhotos?: File[]) => Promise<void>;
  onUploadPhoto?: (file: File) => Promise<void>;
  isSubmitting: boolean;
  showPhotoUpload?: boolean;
}

const ClubStoryForm = ({
  initialData,
  onSubmit,
  onUploadPhoto,
  isSubmitting,
  showPhotoUpload = false,
}: ClubStoryFormProps) => {
  const { t } = useTranslation();
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [formData, setFormData] = useState<ClubStoryFormData>(
    initialData || {
      title: "",
      small_description: "",
      text: "",
      hidden: true,
      meta_title: "",
      meta_description: "",
      video_link: "",
      club_story_photos: [],
    },
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, newPhotos);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSetMainPhoto = (photoId: number) => {
    setFormData((prev) => ({
      ...prev,
      club_story_photos: prev.club_story_photos?.map((p) => ({
        ...p,
        main: p.id === photoId,
      })),
    }));
  };

  const handleDeletePhoto = async (photoId: number) => {
    try {
      await adminDeleteClubStoryPhoto(photoId);
      setFormData((prev) => ({
        ...prev,
        club_story_photos: prev.club_story_photos?.filter(
          (p) => p.id !== photoId,
        ),
      }));
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const handleUploadPhotos = async (files: File[]) => {
    if (onUploadPhoto && showPhotoUpload) {
      // For edit mode, upload immediately
      try {
        for (const file of files) {
          await onUploadPhoto(file);
        }
      } catch (error) {
        console.error("Error uploading photos:", error);
      }
    } else {
      // For create mode, store for later
      setNewPhotos((prev) => [...prev, ...files]);
    }
  };

  const handleRemoveNewPhoto = (index: number) => {
    setNewPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* SEO Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {t("admin.common.seo_section")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input
            type="text"
            name="meta_title"
            label={t("common.metaTitle")}
            value={formData.meta_title}
            onChange={handleChange}
            required
          />

          <Textarea
            name="meta_description"
            label={t("common.metaDescription")}
            value={formData.meta_description}
            onChange={handleChange}
            rows={3}
            required
          />

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="hidden"
              id="hidden"
              checked={formData.hidden}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label
              htmlFor="hidden"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("common.hidden")}
            </label>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {t("admin.common.content_section")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input
            type="text"
            name="title"
            label={t("common.title")}
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Textarea
            name="small_description"
            label={t("common.description")}
            value={formData.small_description}
            onChange={handleChange}
            rows={3}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("common.content")}
            </label>
            <RichTextEditor
              value={formData.text}
              onChange={(html) =>
                setFormData((prev) => ({ ...prev, text: html }))
              }
              placeholder={t("common.content")}
              isDarkMode={isDarkModeActive()}
            />
          </div>

          <Input
            type="text"
            name="video_link"
            label={`${t("common.videoLink")} (${t("common.optional")})`}
            value={formData.video_link || ""}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
          />
        </div>
      </div>

      {/* Media Section */}
      <PhotoManagementSection
        photos={formData.club_story_photos}
        newPhotos={newPhotos}
        onSetMain={handleSetMainPhoto}
        onDelete={handleDeletePhoto}
        onUpload={handleUploadPhotos}
        onRemoveNewPhoto={handleRemoveNewPhoto}
        showUpload={true}
        mode={showPhotoUpload ? "edit" : "create"}
      />

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting} size="lg">
          {t("common.save")}
        </Button>
      </div>
    </form>
  );
};

export default ClubStoryForm;
