import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BlogPost } from "../../utils/interfaces";
import {
  adminGetBlogPosts,
  adminDeleteBlogPost,
  generatePreviewToken,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import {
  LoadingSpinner,
  AdminPageHeader,
  AdminCard,
  Pagination,
  EmptyState,
  Button,
  PreviewModal,
} from "../../components/admin/ui";

interface PaginationState {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

const AdminBlogPostsPage = () => {
  const { t } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
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

  const fetchBlogPosts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetBlogPosts({ page });
      if (response.data?.blog_posts) {
        setBlogPosts(response.data.blog_posts);
        setPagination(
          response.data.pagination || {
            current_page: 1,
            per_page: 12,
            total_count: response.data.blog_posts.length,
            total_pages: 1,
          },
        );
      } else {
        setBlogPosts([]);
        setPagination((prev) => ({ ...prev, total_count: 0 }));
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("admin.confirmDelete"))) return;

    try {
      await adminDeleteBlogPost(id);
      fetchBlogPosts(pagination.current_page);
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const handlePreview = async (post: BlogPost) => {
    try {
      const response = await generatePreviewToken("blog_post", post.id);
      setPreviewUrl(response.data.preview_url);
      setPreviewTitle(`Preview: ${post.title}`);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error generating preview token:", error);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
      <AdminPageHeader
        title={t("admin.blog_posts.title")}
        count={pagination.total_count}
        countLabel={t("admin.blog_posts.totalCount", {
          count: pagination.total_count,
        })}
        actionButton={{
          label: t("admin.blog_posts.new"),
          href: appRoutes.backoffice.newBlogPost,
        }}
      />

      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <AdminCard
              key={post.id}
              title={post.title}
              subtitle={post.small_description || post.sample_text}
              image={post.main_photo}
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
                post.hidden
                  ? { label: t("admin.blog_posts.hidden"), variant: "warning" }
                  : undefined
              }
              actions={
                <div className="flex gap-2">
                  <Button
                    onClick={() => handlePreview(post)}
                    variant="link"
                    size="sm"
                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                  >
                    👁️ Preview
                  </Button>
                  <Link to={appRoutes.backoffice.editBlogPost(post.id)}>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {t("common.edit")}
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(post.id)}
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
        <EmptyState message={t("admin.blog_posts.not_found")} />
      )}

      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={fetchBlogPosts}
        className="mt-6"
      />

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={previewUrl}
        title={previewTitle}
      />
    </div>
  );
};

export default AdminBlogPostsPage;
