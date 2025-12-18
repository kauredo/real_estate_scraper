import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getBlogPosts } from "@/services/api";
import BlogCard from "@/components/features/blog/BlogCard";
import BlogPostSkeleton from "@/components/ui/BlogPostSkeleton";
import TopProgressBar from "@/components/ui/TopProgressBar";
import Banner from "@/components/ui/Banner";
import Pagination from "@/components/ui/Pagination";
import MetaTags from "@/components/layout/MetaTags";
import { BlogPost } from "@/utils/interfaces";
import { useNotifications } from "@/hooks/useNotifications";

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">
            {t("blog_posts.header")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            {t("blog_posts.subheader")}
          </p>
        </div>

        {/* Show progress bar when paginating (loading with existing data) */}
        {loading && hasInitialData && <TopProgressBar isLoading={loading} />}

        {loading && !hasInitialData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogPostSkeleton key={index} />
            ))}
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600 dark:text-gray-400">
              {t("blog_posts.empty")}
            </h2>
          </div>
        ) : (
          <>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </>
  );
};

export default BlogPostsPage;
