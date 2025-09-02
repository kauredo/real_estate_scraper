import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminGetListingComplex,
  adminUpdateListingComplex,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import { ListingComplex } from "../../utils/interfaces";

const AdminListingComplexEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [listingComplex, setListingComplex] = useState<ListingComplex | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subtext: "",
    final_text: "",
    location: "",
    price_from: "",
    video_link: "",
  });

  useEffect(() => {
    const fetchListingComplex = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await adminGetListingComplex(parseInt(id));
        if (response.data?.listing_complex) {
          const complexData = response.data.listing_complex;
          setListingComplex(complexData);
          setFormData({
            name: complexData.name || "",
            description: complexData.description || "",
            subtext: complexData.subtext || "",
            final_text: complexData.final_text || "",
            location: complexData.location || "",
            price_from: complexData.price_from?.toString() || "",
            video_link: complexData.video_link || "",
          });
        }
      } catch (error) {
        console.error("Error fetching listing complex:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingComplex();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSaving(true);
      const submitData = {
        ...formData,
        price_from: formData.price_from ? parseFloat(formData.price_from) : 0,
      };
      await adminUpdateListingComplex(parseInt(id), submitData);
      navigate(appRoutes.backoffice.listingComplexes);
    } catch (error) {
      console.error("Error updating listing complex:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-default border-t-transparent"></div>
      </div>
    );
  }

  if (!listingComplex) {
    return (
      <div className="container mx-auto flex flex-col px-4">
        <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
          <p className="text-center text-red-500">
            {t("admin.listingComplexes.notFound")}
          </p>
        </div>
      </div>
    );
  }

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
          {t("admin.listingComplexes.edit")} - {listingComplex.name}
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
              disabled={saving}
              className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {saving ? t("common.saving") : t("common.save")}
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

export default AdminListingComplexEditPage;
