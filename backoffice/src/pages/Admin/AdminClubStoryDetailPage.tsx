import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams, Link } from "react-router-dom";
import { adminGetClubStory, adminDeleteClubStory } from "../../services/api";
import { appRoutes } from "../../utils/routes";

const AdminClubStoryDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [clubStory, setClubStory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubStory = async () => {
      try {
        setLoading(true);
        const response = await adminGetClubStory(parseInt(id!));
        setClubStory(response.data);
      } catch (error) {
        console.error("Error fetching club story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubStory();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(t("admin.confirmDelete"))) return;

    try {
      await adminDeleteClubStory(parseInt(id!));
      navigate(appRoutes.backoffice.clubStories);
    } catch (error) {
      console.error("Error deleting club story:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!clubStory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t("common.notFound")}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {clubStory.title}
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              to={appRoutes.backoffice.editClubStory(clubStory.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {t("common.edit")}
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              {t("common.delete")}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {clubStory.video_link ? (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={clubStory.video_link}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          ) : (
            clubStory.main_photo && (
              <img
                src={clubStory.main_photo}
                alt={clubStory.title}
                className="w-full h-64 object-cover"
              />
            )
          )}

          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {clubStory.small_description}
            </p>

            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: clubStory.text }}
            />

            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold mb-2">{t("common.meta")}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>{t("common.metaTitle")}:</strong> {clubStory.meta_title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>{t("common.metaDescription")}:</strong>{" "}
                {clubStory.meta_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClubStoryDetailPage;
