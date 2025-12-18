import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getBlogPosts } from "../services/api";
import BlogCard from "../components/blog/BlogCard";
import BlogPostSkeleton from "../components/loading/BlogPostSkeleton";
import TopProgressBar from "../components/loading/TopProgressBar";
import Banner from "../components/shared/Banner";
import Pagination from "../components/shared/Pagination";
import MetaTags from "../components/shared/MetaTags";
import { BlogPost } from "../utils/interfaces";
import { useNotifications } from "../context/NotificationContext";

const BlogPostsPage = () => {
  const { t } = useTranslation();
  const { showError } = useNotifications();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasInitialData, setHasInitialData] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 12,
    total_count: 0,
    total_pages: 0,
  });

  const fetchBlogPosts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getBlogPosts({ page });
      setBlogPosts(response.data.blog_posts);
      setPagination(response.data.pagination);
      setHasInitialData(true);

      // Smooth scroll to top after data is loaded (for pagination)
      if (hasInitialData) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      showError(t("errors.fetch_blog_posts"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handlePageChange = (page: number) => {
    fetchBlogPosts(page);
  };

  return (
    <>
      <MetaTags pageType="blog" url={window.location.href} />
      <Banner height="20vh" blurred={true} text={t("blog_posts.header")} />

      <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
        <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
          <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mx-auto">
            {t("blog_posts.header")}
          </h1>
          <p className="mx-auto text-gray-500 dark:text-light text-lg mt-2">
            {t("blog_posts.subheader")}
          </p>
          <br />

          {/* Show progress bar when paginating (loading with existing data) */}
          {loading && hasInitialData && <TopProgressBar isLoading={loading} />}

          <div className="w-full max-w-7xl mx-auto">
            {loading && !hasInitialData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlogPostSkeleton key={index} />
                ))}
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="w-full text-center p-8 text-xl">
                <h2>{t("blog_posts.empty")}</h2>
              </div>
            ) : blogPosts.length === 1 ? (
              <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
                <BlogCard blogPost={blogPosts[0]} />
              </div>
            ) : blogPosts.length === 2 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((blogPost) => (
                  <BlogCard key={blogPost.id} blogPost={blogPost} />
                ))}
              </div>
            ) : (
              <>
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((blogPost) => (
                    <BlogCard key={blogPost.id} blogPost={blogPost} />
                  ))}
                </div>
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostsPage;
