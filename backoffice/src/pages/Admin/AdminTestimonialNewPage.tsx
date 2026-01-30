import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminCreateTestimonial } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import Flashes from "../../components/shared/Flashes";
import { Input, Textarea, Button } from "../../components/admin/ui";

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
          {t("admin.testimonials.new")}
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
            <Button type="submit" isLoading={loading} variant="primary">
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

export default AdminTestimonialNewPage;
