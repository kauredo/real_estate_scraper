import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminGetTestimonial,
  adminDeleteTestimonial,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import { Testimonial } from "../../utils/interfaces";

const AdminTestimonialDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    const fetchTestimonial = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await adminGetTestimonial(parseInt(id));
        if (response.data?.testimonial) {
          setTestimonial(response.data.testimonial);
        }
      } catch (error) {
        console.error("Error fetching testimonial:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonial();
  }, [id]);

  const handleDelete = async () => {
    if (!id || !window.confirm(t("admin.confirmDelete"))) return;

    try {
      await adminDeleteTestimonial(parseInt(id));
      navigate(appRoutes.backoffice.testimonials);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
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
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => navigate(appRoutes.backoffice.testimonials)}
            className="bg-gray-500 hover:bg-gray-600 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {t("common.back")}
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() =>
                navigate(appRoutes.backoffice.editTestimonial(testimonial.id))
              }
              className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {t("common.edit")}
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {t("common.delete")}
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mb-6">
          {t("admin.testimonials.form.testimonial")}
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t("admin.testimonials.form.name")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-xl font-medium">
                {testimonial.name}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t("admin.testimonials.form.testimonial")}
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {t("admin.testimonials.form.metadata")}
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-sm">
                <p className="mb-2">
                  <span className="font-medium">ID:</span> {testimonial.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonialDetailPage;
