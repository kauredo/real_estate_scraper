import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getBlogPost } from "../services/api";
import ShareIcons from "../components/shared/ShareIcons";
import MetaTags from "../components/shared/MetaTags";
import { BlogPost } from "../utils/interfaces";
import Flashes from "../components/shared/Flashes";

const BlogPostDetailPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const previewToken = searchParams.get("preview_token");
  const { t } = useTranslation();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getBlogPost(slug, previewToken || undefined);
        setBlogPost(response.data.blog_post);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError(t("meta.blog.fetch_error"));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug, previewToken, t]);

  const clearError = () => {
    setError(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-beige-default"></div>
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl">{t("meta.blog.post_not_found")}</h1>
      </div>
    );
  }

  return (
    <div>
      <MetaTags
        pageType="blog"
        blogMeta={{
          meta_title: blogPost?.meta_title,
          meta_description: blogPost?.meta_description,
        }}
        title={blogPost?.title}
        description={blogPost?.description?.substring(0, 160)}
        image={blogPost?.main_photo}
        type="article"
        url={window.location.href}
      />

      {error && <Flashes type="error" message={error} onClose={clearError} />}

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
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(blogPost.created_at).toLocaleDateString(
                t("meta.blog.date_locale"),
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </p>
          </div>
          <ShareIcons title={blogPost.meta_title || blogPost.title} />

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blogPost.sanitized_text }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetailPage;
