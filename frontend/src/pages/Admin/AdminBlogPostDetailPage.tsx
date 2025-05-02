import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
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
        setBlogPost(response.data.blog_post);
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
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-beige-default"></div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-light">
          {t("admin.blog_posts.not_found")}
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-light">
          {blogPost.title}
        </h1>
        <div className="flex gap-2">
          <Link
            to={appRoutes.backoffice.editBlogPost(blogPost.id)}
            className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {t("admin.edit")}
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white dark:text-dark p-2 rounded font-bold"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      {/* Status Badge */}
      {blogPost.hidden && (
        <div className="mb-4">
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            {t("admin.blog_posts.hidden")}
          </span>
        </div>
      )}

      {/* SEO Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
          {t("admin.common.seo_section")}
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold">
              {t("admin.blog_posts.meta_title")}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {blogPost.meta_title}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold">
              {t("admin.blog_posts.meta_description")}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {blogPost.meta_description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Preview */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
          {t("admin.common.content_section")}
        </h2>

        <div className="mb-4">
          <h3 className="text-sm font-bold mb-2">
            {t("admin.blog_posts.small_description")}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {blogPost.small_description}
          </p>
        </div>

        {blogPost.video_link && (
          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2">
              {t("admin.blog_posts.video_link")}
            </h3>
            <a
              href={blogPost.video_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-beige-default hover:text-beige-medium"
            >
              {blogPost.video_link}
            </a>
          </div>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: blogPost.text }} />
        </div>
      </div>

      {/* Media Gallery */}
      {blogPost.blog_photos && blogPost.blog_photos.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
            {t("admin.common.media_section")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {blogPost.blog_photos.map(photo => (
              <div
                key={photo.id}
                className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-2"
              >
                <img
                  src={photo.image_url}
                  alt=""
                  className="w-full h-48 object-cover rounded-lg"
                />
                {photo.main && (
                  <span className="absolute top-4 right-4 bg-beige-default text-white dark:text-dark text-xs font-medium px-2.5 py-0.5 rounded">
                    {t("admin.common.main_photo")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogPostDetailPage;
