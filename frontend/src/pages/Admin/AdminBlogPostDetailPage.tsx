import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShareIcons from "../../components/shared/ShareIcons";
import { BlogPost } from "../../utils/interfaces";
import { adminGetBlogPost, adminDeleteBlogPost } from "../../services/api";
import { appRoutes } from "../../utils/routes";

const AdminBlogPostDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await adminGetBlogPost(parseInt(id!));
        setBlogPost(response.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(t("admin.confirmDelete"))) return;

    try {
      await adminDeleteBlogPost(parseInt(id!));
      navigate(appRoutes.backoffice.blogPosts);
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-default border-t-transparent"></div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t("admin.blog_posts.not_found")}
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
            {blogPost.title}
          </h1>
          <div className="flex items-center space-x-4">
            <Link
              to={appRoutes.backoffice.editBlogPost(parseInt(id!))}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {t("admin.blog_posts.edit")}
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              {t("admin.blog_posts.delete")}
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          {blogPost.video_link ? (
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={blogPost.video_link}
                className="w-full"
                title="Blog post video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            blogPost.main_photo && (
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={blogPost.main_photo}
                  alt={blogPost.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )
          )}

          <div className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blogPost.created_at).toLocaleDateString()}
                  </p>
                  {blogPost.hidden && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-2">
                      {t("admin.blog_posts.hidden")}
                    </span>
                  )}
                </div>
                <ShareIcons title={blogPost.meta_title || blogPost.title} />
              </div>

              <div
                className="blog-content mt-6"
                dangerouslySetInnerHTML={{ __html: blogPost.text }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPostDetailPage;
