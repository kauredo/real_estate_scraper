import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { adminGetClubStory, adminUpdateClubStory, adminUploadClubStoryPhoto } from "../../services/api";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { appRoutes } from "../../utils/routes";

interface ClubStoryFormData {
  title: string;
  small_description: string;
  text: string;
  hidden: boolean;
  meta_title: string;
  meta_description: string;
  video_link?: string;
}

const AdminClubStoryEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ClubStoryFormData>({
    title: "",
    small_description: "",
    text: "",
    hidden: true,
    meta_title: "",
    meta_description: "",
    video_link: "",
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    onDrop: async (acceptedFiles) => {
      try {
        for (const file of acceptedFiles) {
          const formData = new FormData();
          formData.append("photo", file);
          await adminUploadClubStoryPhoto(parseInt(id!), formData);
        }
        fetchClubStory();
      } catch (error) {
        console.error("Error uploading photos:", error);
      }
    },
  });

  const fetchClubStory = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const response = await adminGetClubStory(parseInt(id));
      const story = response.data;
      setFormData({
        title: story.title,
        small_description: story.small_description,
        text: story.text,
        hidden: story.hidden,
        meta_title: story.meta_title,
        meta_description: story.meta_description,
        video_link: story.video_link,
      });
    } catch (error) {
      console.error("Error fetching club story:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubStory();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await adminUpdateClubStory(parseInt(id!), formData);
      navigate(appRoutes.backoffice.clubStories);
    } catch (error) {
      console.error("Error updating club story:", error);
    } finally {
      setSaving(false);
    }
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

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-default border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
      <h2 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl">
        {t("club.stories.edit")} {formData.title}
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
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
            {t("common.media")}
          </h3>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>{t("common.dragPhotos")}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {saving ? t("common.saving") : t("common.save")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminClubStoryEditPage;
