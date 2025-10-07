import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminCreateListingComplex } from "../../services/api";
import { appRoutes } from "../../utils/routes";

const AdminListingComplexNewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subtext: "",
    final_text: "",
    location: "",
    price_from: "",
    video_link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const submitData = {
        ...formData,
        price_from: formData.price_from ? parseFloat(formData.price_from) : 0,
      };
      await adminCreateListingComplex(submitData);
      navigate(appRoutes.backoffice.listingComplexes);
    } catch (error) {
      console.error("Error creating listing complex:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
        <div className="mb-6">
          <button
            onClick={() => navigate(appRoutes.backoffice.listingComplexes)}
            className="bg-gray-500 hover:bg-gray-600 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          >
            {t("common.back")}
          </button>
        </div>

        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mb-6">
          {t("admin.listingComplexes.new")}
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.listingComplexes.fields.name")}
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

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.listingComplexes.fields.description")}
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.listingComplexes.fields.subtext")}
            </label>
            <textarea
              name="subtext"
              value={formData.subtext}
              onChange={handleChange}
              rows={2}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.listingComplexes.fields.finalText")}
            </label>
            <textarea
              name="final_text"
              value={formData.final_text}
              onChange={handleChange}
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.listingComplexes.fields.location")}
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.listingComplexes.fields.priceFrom")}
            </label>
            <input
              type="number"
              name="price_from"
              value={formData.price_from}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("admin.listingComplexes.fields.videoLink")}
            </label>
            <input
              type="url"
              name="video_link"
              value={formData.video_link}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            />
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
              onClick={() => navigate(appRoutes.backoffice.listingComplexes)}
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

export default AdminListingComplexNewPage;
