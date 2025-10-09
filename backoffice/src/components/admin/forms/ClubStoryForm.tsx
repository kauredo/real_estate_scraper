import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Editor } from "@tinymce/tinymce-react";
import { useDropzone } from "react-dropzone";
import { adminDeleteClubStoryPhoto } from "../../../services/api";
import { isDarkModeActive } from "../../../utils/functions";
import { Input, Textarea, Button } from "../ui";

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
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    onDrop: async (acceptedFiles) => {
      if (onUploadPhoto && showPhotoUpload) {
        // For edit mode, upload immediately
        try {
          for (const file of acceptedFiles) {
            await onUploadPhoto(file);
          }
        } catch (error) {
          console.error("Error uploading photos:", error);
        }
      } else {
        // For new mode, store for later
        setNewPhotos((prev) => [...prev, ...acceptedFiles]);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, newPhotos);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const updatePhotoMain = (photoId: number) => {
    setFormData((prev) => ({
      ...prev,
      club_story_photos: prev.club_story_photos?.map((p) => ({
        ...p,
        main: p.id === photoId,
      })),
    }));
  };

  const deletePhoto = async (photoId: number) => {
    if (!confirm(t("admin.common.delete_photo_confirm"))) {
      return;
    }

    try {
      await adminDeleteClubStoryPhoto(photoId);
      setFormData((prev) => ({
        ...prev,
        club_story_photos: prev.club_story_photos?.filter((p) => p.id !== photoId),
      }));
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const removeNewPhoto = (index: number) => {
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
            <Editor
              apiKey="p6bnxm7cjj6jc6xzhzfknznbqkmx4zdvfhpiqj0bq9tny4ig"
              value={formData.text}
              onEditorChange={(content) =>
                setFormData((prev) => ({ ...prev, text: content }))
              }
              init={{
                height: 500,
                menubar: false,
                skin: isDarkModeActive() ? "oxide-dark" : "oxide",
                content_css: isDarkModeActive() ? "dark" : "default",
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; font-size:14px }",
              }}
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

      {/* Media Section - Only show in edit mode */}
      {showPhotoUpload && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {t("admin.common.media_section")}
            </h2>
          </div>

          {/* Existing Photos */}
          {formData.club_story_photos && formData.club_story_photos.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t("admin.common.existing_photos")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.club_story_photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative group border rounded-lg overflow-hidden"
                  >
                    <img
                      src={photo.image.url}
                      alt="Club story photo"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updatePhotoMain(photo.id)}
                        className={`px-3 py-1 text-xs rounded ${
                          photo.main
                            ? "bg-green-500 text-white"
                            : "bg-white text-gray-700"
                        }`}
                      >
                        {photo.main
                          ? t("admin.common.main_photo")
                          : t("admin.common.set_main")}
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePhoto(photo.id)}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        {t("common.delete")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload new photos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("admin.common.add_photos")}
            </label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
            >
              <input {...getInputProps()} />
              <p className="text-gray-600 dark:text-gray-400">
                {t("admin.common.dropzone")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* New photos preview (for create mode) */}
      {!showPhotoUpload && newPhotos.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("admin.common.new_photos")} ({newPhotos.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newPhotos.map((file, index) => (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`New photo ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeNewPhoto(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

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
