import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useDropzone } from "react-dropzone";
import {
  adminGetBlogPost,
  adminCreateBlogPost,
  adminUpdateBlogPost,
  adminUploadBlogPhoto,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";

interface BlogPostFormData {
  title: string;
  small_description: string;
  text: string;
  hidden: boolean;
  meta_title: string;
  meta_description: string;
  video_link?: string;
}

const AdminBlogPostEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: "",
    small_description: "",
    text: "",
    hidden: true,
    meta_title: "",
    meta_description: "",
    video_link: "",
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    onDrop: async acceptedFiles => {
      if (!id) return;

      try {
        for (const file of acceptedFiles) {
          const formData = new FormData();
          formData.append("image", file);
          await adminUploadBlogPhoto(parseInt(id), formData);
        }
        fetchBlogPost();
      } catch (error) {
        console.error("Error uploading photos:", error);
      }
    },
  });

  const fetchBlogPost = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const response = await adminGetBlogPost(parseInt(id));
      const post = response.data.blog_post;
      setFormData({
        title: post.title,
        small_description: post.small_description,
        text: post.text,
        hidden: post.hidden,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        video_link: post.video_link,
      });
    } catch (error) {
      console.error("Error fetching blog post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (isEditing) {
        await adminUpdateBlogPost(parseInt(id!), formData);
        await fetchBlogPost();
      } else {
        const response = await adminCreateBlogPost(formData);
        navigate(appRoutes.backoffice.editBlogPost(response.data.blog_post.id));
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-beige-default"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-light">
          {isEditing ? t("admin.blog_posts.edit") : t("admin.blog_posts.new")}
        </h1>
      </div>

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
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-dark-lighter dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("admin.blog_posts.small_description")}
            </label>
            <textarea
              name="small_description"
              value={formData.small_description}
              onChange={handleChange}
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
              onEditorChange={content =>
                setFormData(prev => ({ ...prev, text: content }))
              }
              init={{
                height: 500,
                menubar: true,
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
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("admin.blog_posts.video_link")}
            </label>
            <input
              type="url"
              name="video_link"
              value={formData.video_link}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-dark-lighter dark:border-gray-600"
            />
          </div>
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
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-dark-lighter dark:border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("admin.blog_posts.meta_description")}
            </label>
            <textarea
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-dark-lighter dark:border-gray-600"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="hidden"
              checked={formData.hidden}
              onChange={handleChange}
              className="h-4 w-4 text-beige-medium focus:ring-beige-medium border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-900 dark:text-gray-300">
              {t("admin.blog_posts.hidden")}
            </label>
          </div>
        </div>

        {isEditing && (
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
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {saving ? t("admin.common.saving") : t("admin.common.save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogPostEditPage;
