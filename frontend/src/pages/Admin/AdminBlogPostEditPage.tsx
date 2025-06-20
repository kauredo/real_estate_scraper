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
import { isDarkModeActive } from "../../utils/functions";

interface BlogPostFormData {
  title: string;
  small_description: string;
  text: string;
  hidden: boolean;
  meta_title: string;
  meta_description: string;
  video_link?: string;
  blog_photos: { id: number; main: boolean; image: { url: string } }[];
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
    blog_photos: [],
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
      console.log(post);
      setFormData({
        title: post.title,
        small_description: post.small_description,
        text: post.text,
        hidden: post.hidden,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        video_link: post.video_link,
        blog_photos: post.blog_photos || [],
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
        console.log("Blog post created:", response.data);
        navigate(appRoutes.backoffice.editBlogPost(response.data.id));
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
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-default border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isEditing
                ? t("admin.blog_posts.edit")
                : t("admin.blog_posts.new")}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {t("admin.common.seo_section")}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("admin.blog_posts.meta_title")}
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("admin.blog_posts.meta_description")}
                </label>
                <textarea
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 sm:text-sm"
                  required
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="hidden"
                  id="hidden"
                  checked={formData.hidden}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-beige-medium focus:ring-beige-medium"
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

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {t("admin.common.content_section")}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("admin.blog_posts.title")}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("admin.blog_posts.small_description")}
                </label>
                <textarea
                  name="small_description"
                  value={formData.small_description}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
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
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    skin: isDarkModeActive() ? "oxide-dark" : "oxide",
                    content_css: isDarkModeActive() ? "dark" : "default",
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("admin.blog_posts.video_link")}
                </label>
                <input
                  type="url"
                  name="video_link"
                  value={formData.video_link}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-beige-medium focus:ring-beige-medium dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {(isEditing || formData.blog_photos.length > 0) && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {t("admin.common.media_section")}
                </h2>
              </div>

              {isEditing && (
                <div
                  {...getRootProps()}
                  className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-beige-medium transition-colors duration-200"
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
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <input {...getInputProps()} />
                      <p className="pl-1">{t("admin.common.dropzone")}</p>
                    </div>
                  </div>
                </div>
              )}

              {formData.blog_photos.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {formData.blog_photos.map(photo => (
                    <div
                      key={photo.id}
                      className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-2"
                    >
                      <img
                        src={photo.image.url}
                        alt="Blog post photo"
                        className="w-full h-48 object-cover rounded-lg mb-2"
                      />

                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`main-${photo.id}`}
                              checked={photo.main}
                              onChange={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  blog_photos: prev.blog_photos.map(p => ({
                                    ...p,
                                    main: p.id === photo.id,
                                  })),
                                }));
                              }}
                              className="form-checkbox h-4 w-4 text-beige-default rounded border-gray-300 focus:ring-beige-medium"
                            />
                            <label
                              htmlFor={`main-${photo.id}`}
                              className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Main
                            </label>
                          </div>
                        </div>

                        <button
                          onClick={async () => {
                            if (
                              !confirm(t("admin.common.delete_photo_confirm"))
                            ) {
                              return;
                            }

                            try {
                              // Add your delete API call here
                              // await adminDeleteBlogPhoto(photo.id);
                              setFormData(prev => ({
                                ...prev,
                                blog_photos: prev.blog_photos.filter(
                                  p => p.id !== photo.id
                                ),
                              }));
                            } catch (error) {
                              console.error("Error deleting photo:", error);
                            }
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title={t("admin.common.delete_photo")}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>

                      {photo.main && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow">
                          Main
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-beige-default hover:bg-beige-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beige-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? t("admin.common.saving") : t("admin.common.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogPostEditPage;
