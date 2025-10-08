import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminGetTestimonial,
  adminUpdateTestimonial,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import { Testimonial } from "../../utils/interfaces";

const AdminTestimonialEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    text: "",
  });

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await adminGetTestimonial(parseInt(id));
        if (response.data?.testimonial) {
          const testimonialData = response.data.testimonial;
          setTestimonial(testimonialData);
          setFormData({
            name: testimonialData.name || "",
            text: testimonialData.text || "",
          });
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      setSaving(true);
      await adminUpdateTestimonial(parseInt(id), formData);
      navigate(appRoutes.backoffice.testimonials);
    } catch (error) {
      console.error("Error updating testimonial:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!testimonial) {
    return (
      <div className="container mx-auto flex flex-col px-4">
        <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
          <p className="text-center text-red-500">
            {t("admin.testimonials.notFound")}
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
            onClick={() => navigate(appRoutes.backoffice.testimonials)}
            className="bg-gray-500 hover:bg-gray-600 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
          >
            {t("common.back")}
          </button>
        </div>

        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mx-auto mb-6">
          {t("admin.testimonials.edit")} - {testimonial.name}
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
              disabled={saving}
              className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {saving ? t("common.saving") : t("common.save")}
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

export default AdminTestimonialEditPage;
