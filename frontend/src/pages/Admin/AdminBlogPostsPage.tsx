import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BlogPost } from "../../utils/interfaces";
import BlogPostList from "../../components/admin/BlogPostList";
import { adminGetBlogPosts, adminDeleteBlogPost } from "../../services/api";
import { appRoutes } from "../../utils/routes";

const AdminBlogPostsPage = () => {
  const { t } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await adminGetBlogPosts();
      setBlogPosts(response.data.blog_posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminDeleteBlogPost(id);
      fetchBlogPosts(); // Refresh the list
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  const handleEdit = (id: number) => {
    window.location.href = appRoutes.backoffice.editBlogPost(id);
  };

  const handleView = (id: number) => {
    window.location.href = appRoutes.backoffice.showBlogPost(id);
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-default border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t("admin.blog_posts.title")}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("admin.blog_posts.total")}: {blogPosts.length}
          </p>
        </div>
        <Link
          to={appRoutes.backoffice.newBlogPost}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-beige-default hover:bg-beige-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beige-default transition-colors duration-200"
        >
          {t("admin.blog_posts.new")}
        </Link>
      </div>

      <BlogPostList
        posts={blogPosts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
};

export default AdminBlogPostsPage;
