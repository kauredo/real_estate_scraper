import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { adminCreateClubStory } from "../../services/api";
import { Editor } from "@tinymce/tinymce-react";
import { appRoutes } from "../../utils/routes";
import Flashes from "../../components/shared/Flashes";

interface FlashMessage {
  type: string;
  message: string;
}

interface ClubStoryFormData {
  title: string;
  small_description: string;
  text: string;
  hidden: boolean;
  meta_title: string;
  meta_description: string;
  video_link?: string;
}

const AdminClubStoryNewPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [formData, setFormData] = useState<ClubStoryFormData>({
    title: "",
    small_description: "",
    text: "",
    hidden: true,
    meta_title: "",
    meta_description: "",
    video_link: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFlash(null); // Clear any existing flash messages

    try {
      await adminCreateClubStory(formData);
      setFlash({
        type: "success",
        message: t("admin.clubStories.create_success"),
      });
      // Navigate after showing success message
      setTimeout(() => navigate(appRoutes.backoffice.clubStories), 1500);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
      {/* Flash Messages */}
      {flash && (
        <Flashes
          type={flash.type}
          message={flash.message}
          onClose={clearFlash}
        />
      )}

      <h2 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mx-auto">
        {t("club.stories.new")}
      </h2>
      <form onSubmit={handleSubmit} className="my-6">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
            {t("common.basicInfo")}
          </h3>
          <div className="field mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("common.title")}
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="field mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("common.description")}
            </label>
            <textarea
              name="small_description"
              value={formData.small_description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
              rows={3}
              required
            />
          </div>

          <div className="field mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("common.content")}
            </label>
            <Editor
              value={formData.text}
              onEditorChange={(content) =>
                setFormData((prev) => ({ ...prev, text: content }))
              }
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | bold italic | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
              }}
            />
          </div>

          <div className="field mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("common.videoLink")}
            </label>
            <input
              type="url"
              name="video_link"
              value={formData.video_link}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="field mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hidden"
                checked={formData.hidden}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300 text-sm font-bold">
                {t("common.hidden")}
              </span>
            </label>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
            {t("common.meta")}
          </h3>
          <div className="field mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("common.metaTitle")}
            </label>
            <input
              type="text"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="field mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              {t("common.metaDescription")}
            </label>
            <textarea
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white"
              rows={3}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {saving ? t("common.saving") : t("common.save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminClubStoryNewPage;
