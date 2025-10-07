import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminCreateBlogPost } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import Flashes from "../../components/shared/Flashes";

interface FlashMessage {
  type: string;
  message: string;
}

const AdminBlogPostNewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    status: "published",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFlash(null); // Clear any existing flash messages
      await adminCreateBlogPost(formData);
      setFlash({
        type: "success",
        message: t("admin.blog_posts.create_success"),
      });
      // Navigate after showing success message
      setTimeout(() => navigate(appRoutes.backoffice.blogPosts), 1500);
    } catch (error) {
      console.error("Error creating blog post:", error);
      setFlash({
        type: "error",
        message: t("admin.blog_posts.create_error"),
      });
    } finally {
      setLoading(false);
    }
  };

  const clearFlash = () => {
    setFlash(null);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      {/* Flash Messages */}
      {flash && (
        <Flashes
          type={flash.type}
          message={flash.message}
          onClose={clearFlash}
        />
      )}

      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
        <div className="mb-6">
          <button
            onClick={() => navigate(appRoutes.backoffice.blogPosts)}
            className="bg-gray-500 hover:bg-gray-600 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          >
            {t("common.back")}
          </button>
        </div>

        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mb-6">
          {t("admin.blog_posts.new")}
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.blog_posts.fields.title")}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.blog_posts.fields.description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.blog_posts.fields.content")}
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={10}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.blog_posts.fields.status")}
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="published">{t("common.status.published")}</option>
              <option value="draft">{t("common.status.draft")}</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {loading ? t("common.saving") : t("common.save")}
            </button>
            <button
              type="button"
              onClick={() => navigate(appRoutes.backoffice.blogPosts)}
              className="bg-gray-500 hover:bg-gray-600 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {t("common.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogPostNewPage;
