import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { adminGetClubStories, adminDeleteClubStory } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import { ClubStory } from "../../utils/interfaces";
import {
  LoadingSpinner,
  AdminPageHeader,
  AdminCard,
  Pagination,
  EmptyState,
  Button,
} from "../../components/admin/ui";

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
      fetchClubStories(pagination.current_page);
    } catch (error) {
      console.error("Error deleting club story:", error);
    }
  };

  useEffect(() => {
    fetchClubStories();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
      <AdminPageHeader
        title={t("admin.clubStories.title")}
        count={pagination.total_count}
        countLabel={t("admin.clubStories.totalCount", { count: pagination.total_count })}
        actionButton={{
          label: t("admin.clubStories.new"),
          href: appRoutes.backoffice.newClubStory,
        }}
      />

      {clubStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubStories.map((story) => (
            <AdminCard
              key={story.id}
              title={story.title}
              subtitle={story.small_description}
              actions={
                <div className="flex justify-end space-x-2">
                  <Link
                    to={appRoutes.backoffice.showClubStory(story.id)}
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  >
                    {t("common.view")}
                  </Link>
                  <Link
                    to={appRoutes.backoffice.editClubStory(story.id)}
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    {t("common.edit")}
                  </Link>
                  <Button
                    onClick={() => handleDelete(story.id)}
                    variant="link"
                    size="sm"
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    {t("common.delete")}
                  </Button>
                </div>
              }
            />
          ))}
        </div>
      ) : (
        <EmptyState message={t("admin.clubStories.noStories")} />
      )}

      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={fetchClubStories}
        className="mt-6"
      />
    </div>
  );
};

export default AdminClubStoriesPage;
