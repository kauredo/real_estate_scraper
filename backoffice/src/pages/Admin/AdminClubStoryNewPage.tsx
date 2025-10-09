import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminCreateClubStory } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import Flashes from "../../components/shared/Flashes";
import ClubStoryForm, { ClubStoryFormData } from "../../components/admin/forms/ClubStoryForm";
import { Button } from "../../components/admin/ui";

interface FlashMessage {
  type: string;
  message: string;
}

const AdminClubStoryNewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<FlashMessage | null>(null);

  const handleSubmit = async (formData: ClubStoryFormData, newPhotos?: File[]) => {
    setSaving(true);
    setFlash(null);

    try {
      const submitData = new FormData();

      // Add club story data
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "club_story_photos") {
          if (typeof value === "boolean") {
            submitData.append(`club_story[${key}]`, value.toString());
          } else if (value !== null && value !== undefined) {
            submitData.append(`club_story[${key}]`, value.toString());
          }
        }
      });

      // Add new photo files
      if (newPhotos && newPhotos.length > 0) {
        newPhotos.forEach((photo) => {
          submitData.append("club_story_photos[image][]", photo);
        });
      }

      const response = await adminCreateClubStory(submitData);
      setFlash({
        type: "success",
        message: t("admin.clubStories.create_success"),
      });
      // Navigate to edit page after creation
      setTimeout(() => navigate(appRoutes.backoffice.editClubStory(response.data.club_story.id)), 1500);
    } catch (error) {
      console.error("Error creating club story:", error);
      setFlash({
        type: "error",
        message: t("admin.clubStories.create_error"),
      });
    } finally {
      setSaving(false);
    }
  };

  const clearFlash = () => {
    setFlash(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Flash Messages */}
      {flash && (
        <Flashes
          type={flash.type}
          message={flash.message}
          onClose={clearFlash}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t("club.stories.new")}
            </h1>
          </div>
          <Button
            onClick={() => navigate(appRoutes.backoffice.clubStories)}
            variant="secondary"
          >
            {t("common.back")}
          </Button>
        </div>

        <ClubStoryForm onSubmit={handleSubmit} isSubmitting={saving} />
      </div>
    </div>
  );
};

export default AdminClubStoryNewPage;
