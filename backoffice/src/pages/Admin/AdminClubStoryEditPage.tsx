import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import {
  adminGetClubStory,
  adminUpdateClubStory,
  adminUploadClubStoryPhoto,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import Flashes from "../../components/shared/Flashes";
import ClubStoryForm, { ClubStoryFormData } from "../../components/admin/forms/ClubStoryForm";
import { Button, LoadingSpinner } from "../../components/admin/ui";

interface FlashMessage {
  type: string;
  message: string;
}

const AdminClubStoryEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [initialData, setInitialData] = useState<ClubStoryFormData | null>(null);

  const fetchClubStory = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const response = await adminGetClubStory(parseInt(id));
      const story = response.data.club_story;

      setInitialData({
        title: story.title,
        small_description: story.small_description,
        text: story.text,
        hidden: story.hidden,
        meta_title: story.meta_title,
        meta_description: story.meta_description,
        video_link: story.video_link,
        club_story_photos: story.club_story_photos || [],
      });
    } catch (error) {
      console.error("Error fetching club story:", error);
      setFlash({
        type: "error",
        message: t("admin.clubStories.fetch_error"),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubStory();
  }, [id]);

  const handleSubmit = async (formData: ClubStoryFormData) => {
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

      // Add existing photo updates
      if (formData.club_story_photos && formData.club_story_photos.length > 0) {
        formData.club_story_photos.forEach((photo) => {
          submitData.append(
            `club_story_photos[${photo.id}][main]`,
            photo.main.toString()
          );
        });
      }

      await adminUpdateClubStory(parseInt(id!), submitData);
      await fetchClubStory(); // Refresh to get updated photos
      setFlash({
        type: "success",
        message: t("admin.clubStories.update_success"),
      });
    } catch (error) {
      console.error("Error updating club story:", error);
      setFlash({
        type: "error",
        message: t("admin.clubStories.update_error"),
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUploadPhoto = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);
      await adminUploadClubStoryPhoto(parseInt(id!), formData);
      await fetchClubStory(); // Refresh to show new photo
    } catch (error) {
      console.error("Error uploading photo:", error);
      setFlash({
        type: "error",
        message: t("admin.clubStories.photo_upload_error"),
      });
    }
  };

  const clearFlash = () => {
    setFlash(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!initialData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400">
            {t("admin.clubStories.not_found")}
          </p>
        </div>
      </div>
    );
  }

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
              {t("club.stories.edit")}
            </h1>
          </div>
          <Button
            onClick={() => navigate(appRoutes.backoffice.clubStories)}
            variant="secondary"
          >
            {t("common.back")}
          </Button>
        </div>

        <ClubStoryForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onUploadPhoto={handleUploadPhoto}
          isSubmitting={saving}
          showPhotoUpload={true}
        />
      </div>
    </div>
  );
};

export default AdminClubStoryEditPage;
