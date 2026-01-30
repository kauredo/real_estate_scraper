import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  adminGetTestimonial,
  adminUpdateTestimonial,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import { Testimonial } from "../../utils/interfaces";
import {
  Input,
  Textarea,
  Button,
  LoadingSpinner,
} from "../../components/admin/ui";

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
        <div className="mb-6">
          <Button
            onClick={() => navigate(appRoutes.backoffice.testimonials)}
            variant="secondary"
          >
            {t("common.back")}
          </Button>
        </div>

        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mx-auto mb-6">
          {t("admin.testimonials.edit")} - {testimonial.name}
        </h1>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
          <Input
            type="text"
            name="name"
            label={t("admin.testimonials.fields.name")}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Textarea
            name="text"
            label={t("admin.testimonials.fields.text")}
            value={formData.text}
            onChange={handleChange}
            rows={5}
            required
          />

          <div className="flex items-center justify-between pt-2">
            <Button type="submit" isLoading={saving} variant="primary">
              {t("common.save")}
            </Button>
            <Button
              type="button"
              onClick={() => navigate(appRoutes.backoffice.testimonials)}
              variant="secondary"
            >
              {t("common.cancel")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminTestimonialEditPage;
