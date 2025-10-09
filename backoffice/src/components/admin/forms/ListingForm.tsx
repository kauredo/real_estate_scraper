import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input, Textarea, Select, Button } from "../ui";

export interface ListingFormData {
  title: string;
  description: string;
  price: string;
  location: string;
  property_type: string;
  status: string;
}

interface ListingFormProps {
  initialData?: ListingFormData;
  onSubmit: (data: ListingFormData) => Promise<void>;
  isSubmitting: boolean;
}

const ListingForm = ({
  initialData,
  onSubmit,
  isSubmitting,
}: ListingFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ListingFormData>(
    initialData || {
      title: "",
      description: "",
      price: "",
      location: "",
      property_type: "",
      status: "active",
    },
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
            name="title"
            label={t("admin.listings.fields.title")}
            value={formData.title}
            onChange={handleChange}
            required
          />

          <Textarea
            name="description"
            label={t("admin.listings.fields.description")}
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />

          <Input
            type="number"
            name="price"
            label={t("admin.listings.fields.price")}
            value={formData.price}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="location"
            label={t("admin.listings.fields.location")}
            value={formData.location}
            onChange={handleChange}
          />

          <Select
            name="property_type"
            label={t("admin.listings.fields.propertyType")}
            value={formData.property_type}
            onChange={handleChange}
          >
            <option value="">{t("common.select")}</option>
            <option value="apartment">
              {t("listings.propertyTypes.apartment")}
            </option>
            <option value="house">{t("listings.propertyTypes.house")}</option>
            <option value="commercial">
              {t("listings.propertyTypes.commercial")}
            </option>
          </Select>

          <Select
            name="status"
            label={t("admin.listings.fields.status")}
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">{t("common.status.active")}</option>
            <option value="inactive">{t("common.status.inactive")}</option>
          </Select>
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

export default ListingForm;
