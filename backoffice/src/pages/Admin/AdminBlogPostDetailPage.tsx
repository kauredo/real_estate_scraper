import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BlogPost } from "../../utils/interfaces";
import {
  adminGetBlogPost,
  adminDeleteBlogPost,
  generatePreviewToken,
} from "../../services/api";
import { appRoutes } from "../../utils/routes";
import {
  LoadingSpinner,
  Button,
  PreviewModal,
} from "../../components/admin/ui";

const AdminBlogPostDetailPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const response = await adminGetBlogPost(parseInt(id!));
        console.log("Fetched blog post:", response.data);
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

  const handlePreview = async () => {
    try {
      const response = await generatePreviewToken("blog_post", parseInt(id!));
      setPreviewUrl(response.data.preview_url);
      setIsPreviewOpen(true);
    } catch (error) {
      console.error("Error generating preview token:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
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
      <div className="m-8 flex items-center justify-end">
        <div className="flex items-center space-x-4">
          <Button
            onClick={handlePreview}
            variant="secondary"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            👁️ Preview
          </Button>
          <Button
            as={Link}
            to={appRoutes.backoffice.editBlogPost(parseInt(id!))}
            variant="secondary"
          >
            {t("admin.blog_posts.edit")}
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            {t("admin.blog_posts.delete")}
          </Button>
        </div>
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        previewUrl={previewUrl}
        title={`Preview: ${blogPost.title}`}
      />

      <div id="blog-show" className="relative">
        <header
          className="!bg-center !bg-no-repeat !bg-cover min-h-[320px] relative"
          style={{ background: `url('${blogPost.main_photo}')` }}
        >
          {blogPost.video_link && (
            <iframe
              className="relative top-0 right-0 p-0 w-full min-h-[320px]"
              src={blogPost.video_link}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </header>
        <div className="tinymce pt-8 px-8 mx-auto container">
          <div className="w-full tablet:w-2/3 mb-4">
            <h1>{blogPost.title}</h1>
            <p>{new Date(blogPost.created_at).toLocaleDateString()}</p>
          </div>

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogPost.sanitized_text }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminBlogPostDetailPage;
