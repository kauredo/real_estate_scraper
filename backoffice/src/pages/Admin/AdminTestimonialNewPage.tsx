import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminCreateTestimonial } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import Flashes from "../../components/shared/Flashes";

interface FlashMessage {
  type: string;
  message: string;
}

const AdminTestimonialNewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFlash(null); // Clear any existing flash messages
      await adminCreateTestimonial(formData);
      setFlash({
        type: "success",
        message: t("admin.testimonials.create_success"),
      });
      // Navigate after showing success message
      setTimeout(() => navigate(appRoutes.backoffice.testimonials), 1500);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      setFlash({
        type: "error",
        message: t("admin.testimonials.create_error"),
      });
    } finally {
      setLoading(false);
    }
  };

  const clearFlash = () => {
    setFlash(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
            onClick={() => navigate(appRoutes.backoffice.testimonials)}
            className="bg-gray-500 hover:bg-gray-600 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          >
            {t("common.back")}
          </button>
        </div>

        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mx-auto mb-6">
          {t("admin.testimonials.new")}
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.testimonials.fields.name")}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.testimonials.fields.text")}
            </label>
            <textarea
              name="text"
              value={formData.text}
              onChange={handleChange}
              rows={5}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {loading ? t("common.saving") : t("common.save")}
            </button>
            <button
              type="button"
              onClick={() => navigate(appRoutes.backoffice.testimonials)}
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

export default AdminTestimonialNewPage;
