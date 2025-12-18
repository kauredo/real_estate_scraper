import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  Textarea,
  Select,
  Button,
  TagInput,
  MultiSelectOption,
} from "../ui";

export interface ListingFormData {
  title: string;
  description: string;
  address: string;
  price_cents: string;
  features: string[];
  status: string;
  kind: string;
  objective: string;
  order: string;
  video_link: string;
  virtual_tour_url: string;
  listing_complex_id: string;
  url?: string; // Optional, for view-only URL
}

interface ListingFormProps {
  initialData?: ListingFormData;
  onSubmit: (data: ListingFormData) => Promise<void>;
  isSubmitting: boolean;
  availableListingComplexes?: MultiSelectOption[];
}

const ListingForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  availableListingComplexes = [],
}: ListingFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ListingFormData>(
    initialData || {
      title: "",
      description: "",
      address: "",
      price_cents: "",
      features: [],
      status: "0",
      kind: "0",
      objective: "1",
      order: "",
      video_link: "",
      virtual_tour_url: "",
      listing_complex_id: "",
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

  const handleFeaturesChange = (features: string[]) => {
    setFormData((prev) => ({ ...prev, features }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* View-only Listing URL (if present) */}
      {formData.url && (
        <div className="bg-blue-50 dark:bg-blue-900 rounded px-4 py-2 flex items-center gap-2">
          <span className="font-medium text-blue-700 dark:text-blue-200">
            {t("admin.listings.view_only_url", "URL:")}
          </span>
          <a
            href={formData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-300 underline break-all"
          >
            {formData.url}
          </a>
        </div>
      )}

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
            type="text"
            name="address"
            label={t("admin.listings.fields.address")}
            value={formData.address}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="price_cents"
            label={t("admin.listings.fields.price")}
            value={formData.price_cents}
            onChange={handleChange}
            helperText={t("admin.listings.fields.priceDescription")}
          />

          <TagInput
            label={t("admin.listings.fields.features")}
            tags={formData.features}
            onChange={handleFeaturesChange}
            placeholder={t("admin.listings.fields.featuresPlaceholder")}
            description={t("admin.listings.fields.featuresDescription")}
          />
        </div>
      </div>

      {/* Classification Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {t("admin.listings.classification")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            name="kind"
            label={t("admin.listings.fields.kind")}
            value={formData.kind}
            onChange={handleChange}
          >
            <option value="0">{t("admin.listings.kinds.other")}</option>
            <option value="1">{t("admin.listings.kinds.apartment")}</option>
            <option value="2">{t("admin.listings.kinds.house")}</option>
            <option value="3">{t("admin.listings.kinds.land")}</option>
            <option value="4">{t("admin.listings.kinds.office")}</option>
            <option value="5">{t("admin.listings.kinds.garage")}</option>
            <option value="6">{t("admin.listings.kinds.parking")}</option>
            <option value="7">{t("admin.listings.kinds.store")}</option>
            <option value="8">{t("admin.listings.kinds.storage")}</option>
            <option value="9">{t("admin.listings.kinds.warehouse")}</option>
          </Select>

          <Select
            name="objective"
            label={t("admin.listings.fields.objective")}
            value={formData.objective}
            onChange={handleChange}
          >
            <option value="0">{t("admin.listings.objectives.other")}</option>
            <option value="1">{t("admin.listings.objectives.sale")}</option>
            <option value="2">{t("admin.listings.objectives.rent")}</option>
          </Select>

          <Select
            name="status"
            label={t("admin.listings.fields.status")}
            value={formData.status}
            onChange={handleChange}
          >
            <option value="0">{t("admin.listings.statuses.recent")}</option>
            <option value="1">{t("admin.listings.statuses.standard")}</option>
            <option value="2">{t("admin.listings.statuses.agreed")}</option>
            <option value="3">{t("admin.listings.statuses.sold")}</option>
            <option value="4">{t("admin.listings.statuses.rented")}</option>
            <option value="5">{t("admin.listings.statuses.closed")}</option>
          </Select>

          {availableListingComplexes.length > 0 && (
            <Select
              name="listing_complex_id"
              label={t("admin.listings.fields.listingComplex")}
              value={formData.listing_complex_id}
              onChange={handleChange}
            >
              <option value="">{t("common.select")}</option>
              {availableListingComplexes.map((complex) => (
                <option key={complex.value} value={complex.value}>
                  {complex.label}
                </option>
              ))}
            </Select>
          )}
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {t("admin.listings.additionalInfo")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Input
            type="url"
            name="video_link"
            label={t("admin.listings.fields.videoLink")}
            value={formData.video_link}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
          />

          <Input
            type="url"
            name="virtual_tour_url"
            label={t("admin.listings.fields.virtualTourUrl")}
            value={formData.virtual_tour_url}
            onChange={handleChange}
            placeholder="https://..."
          />

          <Input
            type="number"
            name="order"
            label={t("admin.listings.fields.order")}
            value={formData.order}
            onChange={handleChange}
            helperText={t("admin.listings.fields.orderDescription")}
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

export default ListingForm;
