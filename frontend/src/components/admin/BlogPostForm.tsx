import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Editor } from "@tinymce/tinymce-react";
import { useDropzone } from "react-dropzone";
import { BlogPost } from "../../utils/interfaces";

type BlogPostFormData = Omit<
  BlogPost,
  | "id"
  | "created_at"
  | "updated_at"
  | "blog_photos"
  | "sanitized_text"
  | "sample_text"
  | "main_photo"
  | "slug"
  | "slug_en"
>;

interface Props {
  initialData?: BlogPost;
  onSubmit: (data: BlogPostFormData, photos: File[]) => Promise<void>;
  isSubmitting: boolean;
}

const BlogPostForm = ({ initialData, onSubmit, isSubmitting }: Props) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: initialData?.title || "",
    text: initialData?.text || "",
    small_description: initialData?.small_description || "",
    meta_title: initialData?.meta_title || "",
    meta_description: initialData?.meta_description || "",
    video_link: initialData?.video_link || "",
    hidden: initialData?.hidden || false,
    description: initialData?.description || "",
    content: initialData?.content || "",
  });
  const [photos, setPhotos] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setPhotos((prev) => [...prev, ...acceptedFiles]);
    },
  });

  const handleChange = (
    field: keyof BlogPostFormData,
    value: string | boolean,
  ) => {
    setFormData((prev: BlogPostFormData) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, photos);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-dark shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-light">
          {t("admin.common.content_section")}
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("admin.blog_posts.title")}
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-dark-lighter dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("admin.blog_posts.small_description")}
          </label>
          <textarea
            value={formData.small_description}
            onChange={(e) => handleChange("small_description", e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-dark-lighter dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("admin.blog_posts.content")}
          </label>
          <Editor
            value={formData.text}
            onEditorChange={(content) => handleChange("text", content)}
            init={{
              height: 500,
              menubar: false,
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
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("admin.blog_posts.video_link")}
          </label>
          <input
            type="url"
            value={formData.video_link}
            onChange={(e) => handleChange("video_link", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-dark-lighter dark:border-gray-600"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-dark shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-light">
          {t("admin.common.media_section")}
        </h2>

        <div
          {...getRootProps()}
          className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-beige-medium"
        >
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <input {...getInputProps()} />
              <p className="pl-1 dark:text-gray-300">
                {t("admin.common.dropzone")}
              </p>
            </div>
          </div>
        </div>

        {photos.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {photos.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="h-24 w-full object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() =>
                    setPhotos((prev) => prev.filter((_, i) => i !== index))
                  }
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-dark shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-light">
          {t("admin.common.seo_section")}
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("admin.blog_posts.meta_title")}
          </label>
          <input
            type="text"
            value={formData.meta_title}
            onChange={(e) => handleChange("meta_title", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-dark-lighter dark:border-gray-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("admin.blog_posts.meta_description")}
          </label>
          <textarea
            value={formData.meta_description}
            onChange={(e) => handleChange("meta_description", e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-dark-lighter dark:border-gray-600"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="hidden"
            checked={formData.hidden}
            onChange={(e) => handleChange("hidden", e.target.checked)}
            className="h-4 w-4 text-beige-medium focus:ring-beige-medium border-gray-300 rounded"
          />
          <label
            htmlFor="hidden"
            className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
          >
            {t("admin.blog_posts.hidden")}
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isSubmitting ? t("admin.common.saving") : t("admin.common.save")}
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
