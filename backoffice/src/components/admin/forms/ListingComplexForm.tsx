import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Input,
  Textarea,
  Button,
  Checkbox,
  MultiSelect,
  MultiSelectOption,
  PhotoManagementSection,
} from "../ui";

export interface ListingComplexFormData {
  name: string;
  description: string;
  subtext: string;
  final_text: string;
  video_link: string;
  hidden: boolean;
  new_format: boolean;
  order: string;
  listing_ids?: number[];
  [key: string]: string | boolean | number[] | undefined;
}

interface Photo {
  id: number;
  image: { url: string };
  image_url?: string;
  main: boolean;
}

interface ListingComplexFormProps {
  initialData?: ListingComplexFormData;
  onSubmit: (data: ListingComplexFormData) => Promise<void>;
  isSubmitting: boolean;
  availableListings?: MultiSelectOption[];
  photos?: Photo[];
  onSetMainPhoto?: (photoId: number) => void;
  onDeletePhoto?: (photoId: number) => Promise<void>;
  onUploadPhotos?: (files: File[]) => void;
  showPhotoManagement?: boolean;
}

const ListingComplexForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  availableListings = [],
  photos = [],
  onSetMainPhoto,
  onDeletePhoto,
  onUploadPhotos,
  showPhotoManagement = false,
}: ListingComplexFormProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ListingComplexFormData>(
    initialData || {
      name: "",
      description: "",
      subtext: "",
      final_text: "",
      video_link: "",
      hidden: false,
      new_format: false,
      order: "",
      listing_ids: [],
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleListingsChange = (values: (string | number)[]) => {
    setFormData((prev) => ({ ...prev, listing_ids: values as number[] }));
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
            type="url"
            name="video_link"
            label={t("admin.listingComplexes.fields.videoLink")}
            value={formData.video_link}
            onChange={handleChange}
            placeholder="https://youtube.com/..."
          />

          <Input
            type="number"
            name="order"
            label={t("admin.listingComplexes.fields.order")}
            value={formData.order}
            onChange={handleChange}
            helperText={t("admin.listingComplexes.fields.orderDescription")}
          />
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {t("admin.common.settings")}
          </h2>
        </div>

        <div className="space-y-4">
          <Checkbox
            name="hidden"
            label={t("admin.listingComplexes.fields.hidden")}
            checked={formData.hidden}
            onChange={handleCheckboxChange}
            description={t("admin.listingComplexes.fields.hiddenDescription")}
          />

          <Checkbox
            name="new_format"
            label={t("admin.listingComplexes.fields.newFormat")}
            checked={formData.new_format}
            onChange={handleCheckboxChange}
            description={t(
              "admin.listingComplexes.fields.newFormatDescription",
            )}
          />
        </div>
      </div>

      {/* Listings Section */}
      {availableListings.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {t("admin.listingComplexes.listings")}
            </h2>
          </div>

          <MultiSelect
            label={t("admin.listingComplexes.fields.listings")}
            options={availableListings}
            selectedValues={formData.listing_ids || []}
            onChange={handleListingsChange}
            placeholder={t("admin.listingComplexes.fields.listingsPlaceholder")}
            description={t("admin.listingComplexes.fields.listingsDescription")}
          />
        </div>
      )}

      {/* Photo Management */}
      {showPhotoManagement && (
        <PhotoManagementSection
          photos={photos}
          onSetMain={onSetMainPhoto}
          onDelete={onDeletePhoto}
          onUpload={onUploadPhotos}
          showUpload={true}
          mode="edit"
        />
      )}

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
