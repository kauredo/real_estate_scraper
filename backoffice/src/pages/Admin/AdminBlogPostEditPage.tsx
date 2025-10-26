import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { adminGetBlogPost, adminUpdateBlogPost } from "../../services/api";
import { appRoutes } from "../../utils/routes";
import Flashes from "../../components/shared/Flashes";
import BlogPostForm, {
  BlogPostFormData,
} from "../../components/admin/forms/BlogPostForm";
import { Button, LoadingSpinner } from "../../components/admin/ui";
import PreviewButton from "../../components/admin/PreviewButton";

interface FlashMessage {
  type: string;
  message: string;
}

const AdminBlogPostEditPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<FlashMessage | null>(null);
  const [initialData, setInitialData] = useState<BlogPostFormData | null>(null);

  const fetchBlogPost = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      const response = await adminGetBlogPost(parseInt(id));
      const post = response.data.blog_post;

      setInitialData({
        title: post.title,
        small_description: post.small_description,
        text: post.text,
        hidden: post.hidden,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        video_link: post.video_link,
        blog_photos: post.blog_photos || [],
      });
    } catch (error) {
      console.error("Error fetching blog post:", error);
      setFlash({
        type: "error",
        message: t("admin.blog_posts.fetch_error"),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const handleSubmit = async (
    formData: BlogPostFormData,
    newPhotos: File[],
  ) => {
    setSaving(true);
    setFlash(null);

    try {
      const submitData = new FormData();

      // Add blog post data
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "blog_photos") {
          if (typeof value === "boolean") {
            submitData.append(`blog_post[${key}]`, value.toString());
          } else if (value !== null && value !== undefined) {
            submitData.append(`blog_post[${key}]`, value.toString());
          }
        }
      });

      // Add new photo files
      if (newPhotos.length > 0) {
        newPhotos.forEach((photo) => {
          submitData.append("blog_photos[image][]", photo);
        });
      }

      // Add existing photo updates
      if (formData.blog_photos.length > 0) {
        formData.blog_photos.forEach((photo) => {
          submitData.append(
            `blog_photos[${photo.id}][main]`,
            photo.main.toString(),
          );
        });
      }

      await adminUpdateBlogPost(parseInt(id!), submitData);
      await fetchBlogPost(); // Refresh to get updated photos
      setFlash({
        type: "success",
        message: t("admin.blog_posts.update_success"),
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      setFlash({
        type: "error",
        message: t("admin.blog_posts.update_error"),
      });
    } finally {
      setSaving(false);
    }
  };

  const clearFlash = () => {
    setFlash(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!initialData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400">
            {t("admin.blog_posts.not_found")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Flash Messages */}
      {flash && (
        <Flashes
          type={flash.type}
          message={flash.message}
          onClose={clearFlash}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {t("admin.blog_posts.edit")}
            </h1>
          </div>
          <div className="flex gap-2">
            <PreviewButton contentType="blog_post" contentId={parseInt(id!)} />
            <Button
              onClick={() => navigate(appRoutes.backoffice.blogPosts)}
              variant="secondary"
            >
              {t("common.back")}
            </Button>
          </div>
        </div>

        <BlogPostForm
          initialData={initialData}
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </div>
    </div>
  );
};

export default AdminBlogPostEditPage;
