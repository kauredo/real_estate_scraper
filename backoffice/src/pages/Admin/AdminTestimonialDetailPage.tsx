import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminGetTestimonial,
  adminDeleteTestimonial,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import { Testimonial } from "../../utils/interfaces";
import { LoadingSpinner, Button, ConfirmDialog } from "../../components/admin/ui";

const AdminTestimonialDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!id) return;

    try {
      setIsDeleting(true);
      await adminDeleteTestimonial(parseInt(id));
      setIsDeleteDialogOpen(false);
      navigate(appRoutes.backoffice.testimonials);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!testimonial) {
    return (
      <div className="container mx-auto flex flex-col px-4">
        <div className="w-full shadow-md rounded px-4 sm:px-6 lg:px-8 py-4 mt-4">
          <p className="text-center text-red-500">
            {t("admin.testimonials.notFound")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-4 sm:px-6 lg:px-8 py-4 mt-4 relative">
        <div className="mb-6 flex justify-between items-center">
          <Button
            onClick={() => navigate(appRoutes.backoffice.testimonials)}
            variant="secondary"
            className="bg-neutral-500 hover:bg-neutral-600"
          >
            {t("common.back")}
          </Button>
          <div className="flex space-x-2">
            <Button
              onClick={() =>
                navigate(appRoutes.backoffice.editTestimonial(testimonial.id))
              }
            >
              {t("common.edit")}
            </Button>
            <Button
              onClick={handleDeleteClick}
              variant="danger"
            >
              {t("common.delete")}
            </Button>
          </div>
        </div>

        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mx-auto mb-6">
          {t("admin.testimonials.form.testimonial")}
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {t("admin.testimonials.form.name")}
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 text-xl font-medium">
                {testimonial.name}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {t("admin.testimonials.form.testimonial")}
              </h3>
              <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg">
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                {t("admin.testimonials.form.metadata")}
              </h3>
              <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg text-sm">
                <p className="mb-2">
                  <span className="font-medium">ID:</span> {testimonial.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t("admin.testimonials.deleteTitle")}
        message={t("admin.confirmDelete")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminTestimonialDetailPage;
