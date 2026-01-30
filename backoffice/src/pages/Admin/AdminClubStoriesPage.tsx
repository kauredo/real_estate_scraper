/* eslint-disable no-restricted-syntax */
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  adminGetClubStories,
  adminDeleteClubStory,
  generatePreviewToken,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import { ClubStory } from "../../utils/interfaces";
import {
  LoadingSpinner,
  AdminPageHeader,
  AdminCard,
  Pagination,
  EmptyState,
  Button,
  PreviewModal,
  ConfirmDialog,
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteClick = (id: number) => {
    setStoryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!storyToDelete) return;

    try {
      setIsDeleting(true);
      await adminDeleteClubStory(storyToDelete);
      fetchClubStories(pagination.current_page);
      setIsDeleteDialogOpen(false);
      setStoryToDelete(null);
    } catch (error) {
      console.error("Error deleting club story:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePreview = async (story: ClubStory) => {
    try {
      const response = await generatePreviewToken("club_story", story.id);
      setPreviewUrl(response.data.preview_url);
      setPreviewTitle(`Preview: ${story.title}`);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error generating preview token:", error);
    }
  };

  useEffect(() => {
    fetchClubStories();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full shadow-md rounded px-4 sm:px-6 lg:px-8 py-4 mt-4 relative">
      <AdminPageHeader
        title={t("admin.clubStories.title")}
        count={pagination.total_count}
        countLabel={t("admin.clubStories.totalCount", {
          count: pagination.total_count,
        })}
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
              image={story.main_photo}
              imagePlaceholder={
                <svg
                  className="w-16 h-16"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              }
              status={
                story.hidden
                  ? { label: t("admin.clubStories.hidden"), variant: "warning" }
                  : undefined
              }
              actions={
                <div className="flex gap-2">
                  <Button
                    onClick={() => handlePreview(story)}
                    variant="link"
                    size="sm"
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  >
                    👁️ Preview
                  </Button>
                  <Link to={appRoutes.backoffice.editClubStory(story.id)}>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {t("common.edit")}
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteClick(story.id)}
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

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={previewUrl}
        title={previewTitle}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setStoryToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={t("admin.clubStories.deleteTitle")}
        message={t("admin.confirmDelete")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        variant="danger"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminClubStoriesPage;
