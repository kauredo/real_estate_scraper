import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { adminGetClubStories, adminDeleteClubStory } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import { ClubStory } from "../../utils/interfaces";

interface PaginationState {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

const AdminClubStoriesPage = () => {
  const { t } = useTranslation();
  const [clubStories, setClubStories] = useState<ClubStory[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current_page: 1,
    per_page: 12,
    total_count: 0,
    total_pages: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchClubStories = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetClubStories({ page });
      if (response.data?.club_stories) {
        setClubStories(response.data.club_stories);
        setPagination(response.data.pagination);
      } else {
        setClubStories([]);
        setPagination((prev) => ({ ...prev, total_count: 0 }));
      }
    } catch (error) {
      console.error("Error fetching club stories:", error);
      setClubStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("admin.confirmDelete"))) return;

    try {
      await adminDeleteClubStory(id);
      fetchClubStories(); // Refresh the list
    } catch (error) {
      console.error("Error deleting club story:", error);
    }
  };

  useEffect(() => {
    fetchClubStories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-default border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
      <div className="mb-6 flex justify-between items-center">
        <Link
          to={appRoutes.backoffice.newClubStory}
          className="bg-beige-default text-white px-4 py-2 rounded hover:bg-beige-dark transition-colors"
        >
          {t("admin.clubStories.new")}
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">
            {t("common.total")}: {pagination.total_count}
          </span>
        </div>
      </div>

      {clubStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubStories.map((story) => (
            <div
              key={story.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {story.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {story.small_description}
                </p>
                <div className="flex justify-end space-x-2">
                  <Link
                    to={appRoutes.backoffice.editClubStory(story.id)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {t("common.edit")}
                  </Link>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    {t("common.delete")}
                  </button>
                  <Link
                    to={appRoutes.backoffice.showClubStory(story.id)}
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  >
                    {t("common.view")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {t("admin.clubStories.noStories")}
        </div>
      )}

      {pagination.total_pages > 1 && (
        <div className="mt-4 flex justify-center">
          <nav className="flex items-center">
            {[...Array(pagination.total_pages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => fetchClubStories(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  pagination.current_page === index + 1
                    ? "bg-beige-default text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default AdminClubStoriesPage;
