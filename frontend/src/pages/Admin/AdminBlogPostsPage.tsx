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
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-default border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="px-6 mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t("admin.blog_posts.title")}
        </h1>
        <Link
          to={appRoutes.backoffice.newBlogPost}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-beige-default hover:bg-beige-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-beige-default transition-colors duration-200"
        >
          {t("admin.blog_posts.new")}
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <BlogPostList
          posts={blogPosts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>
    </div>
  );
};

export default AdminBlogPostsPage;
