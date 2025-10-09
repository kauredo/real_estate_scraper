import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input, Textarea, Button } from "../ui";

export interface ListingComplexFormData {
  name: string;
  description: string;
  subtext: string;
  final_text: string;
  location: string;
  price_from: string;
  video_link: string;
}

interface ListingComplexFormProps {
  initialData?: ListingComplexFormData;
  onSubmit: (data: ListingComplexFormData) => Promise<void>;
  isSubmitting: boolean;
}

const ListingComplexForm = ({ initialData, onSubmit, isSubmitting }: ListingComplexFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ListingComplexFormData>(
    initialData || {
      name: "",
      description: "",
      subtext: "",
      final_text: "",
      location: "",
      price_from: "",
      video_link: "",
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {t("admin.common.basic_info")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input
            type="text"
            name="name"
            label={t("admin.listingComplexes.fields.name")}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Textarea
            name="description"
            label={t("admin.listingComplexes.fields.description")}
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />

          <Textarea
            name="subtext"
            label={t("admin.listingComplexes.fields.subtext")}
            value={formData.subtext}
            onChange={handleChange}
            rows={2}
          />

          <Textarea
            name="final_text"
            label={t("admin.listingComplexes.fields.finalText")}
            value={formData.final_text}
            onChange={handleChange}
            rows={3}
          />

          <Input
            type="text"
            name="location"
            label={t("admin.listingComplexes.fields.location")}
            value={formData.location}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="price_from"
            label={t("admin.listingComplexes.fields.priceFrom")}
            value={formData.price_from}
            onChange={handleChange}
          />

          <Input
            type="url"
            name="video_link"
            label={t("admin.listingComplexes.fields.videoLink")}
            value={formData.video_link}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" isLoading={isSubmitting} size="lg">
          {t("common.save")}
        </Button>
      </div>
    </form>
  );
};

export default ListingComplexForm;
