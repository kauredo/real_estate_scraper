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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-beige-default"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light sm:text-3xl">
          {t("admin.blog_posts.title")}
        </h1>
        <Link
          to={appRoutes.backoffice.newBlogPost}
          className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
