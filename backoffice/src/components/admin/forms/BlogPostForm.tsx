import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Editor } from "@tinymce/tinymce-react";
import { adminDeleteBlogPhoto } from "../../../services/api";
import { isDarkModeActive } from "../../../utils/functions";
import { Input, Textarea, Button, PhotoManagementSection } from "../ui";

interface BlogPhoto {
  id: number;
  main: boolean;
  image: { url: string };
  blog_post_id?: number;
}

export interface BlogPostFormData {
  title: string;
  small_description: string;
  text: string;
  hidden: boolean;
  meta_title: string;
  meta_description: string;
  video_link?: string;
  blog_photos: BlogPhoto[];
}

interface BlogPostFormProps {
  initialData?: BlogPostFormData;
  onSubmit: (data: BlogPostFormData, newPhotos: File[]) => Promise<void>;
  isSubmitting: boolean;
}

const BlogPostForm = ({
  initialData,
  onSubmit,
  isSubmitting,
}: BlogPostFormProps) => {
  const { t } = useTranslation();
  const [newPhotos, setNewPhotos] = useState<File[]>([]);
  const [formData, setFormData] = useState<BlogPostFormData>(
    initialData || {
      title: "",
      small_description: "",
      text: "",
      hidden: true,
      meta_title: "",
      meta_description: "",
      video_link: "",
      blog_photos: [],
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
      blog_photos: prev.blog_photos.map((p) => ({
        ...p,
        main: p.id === photoId,
      })),
    }));
  };

  const handleDeletePhoto = async (photoId: number) => {
    try {
      await adminDeleteBlogPhoto(photoId);
      setFormData((prev) => ({
        ...prev,
        blog_photos: prev.blog_photos.filter((p) => p.id !== photoId),
      }));
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const handleUploadPhotos = (files: File[]) => {
    setNewPhotos((prev) => [...prev, ...files]);
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
            label={t("admin.blog_posts.meta_title")}
            value={formData.meta_title}
            onChange={handleChange}
            required
          />

          <Textarea
            name="meta_description"
            label={t("admin.blog_posts.meta_description")}
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
              {t("admin.blog_posts.hidden")}
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
            label={t("admin.blog_posts.title")}
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Textarea
            name="small_description"
            label={t("admin.blog_posts.small_description")}
            value={formData.small_description}
            onChange={handleChange}
            rows={3}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("admin.blog_posts.text")}
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
            label={`${t("admin.blog_posts.video_link")} (${t("common.optional")})`}
            value={formData.video_link || ""}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
          />
        </div>
      </div>

      {/* Media Section */}
      <PhotoManagementSection
        photos={formData.blog_photos}
        newPhotos={newPhotos}
        onSetMain={handleSetMainPhoto}
        onDelete={handleDeletePhoto}
        onUpload={handleUploadPhotos}
        onRemoveNewPhoto={handleRemoveNewPhoto}
        showUpload={true}
        mode="create"
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

export default BlogPostForm;
