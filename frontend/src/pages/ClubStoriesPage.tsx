import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import ClubStoryCard from "@/components/features/club/ClubStoryCard";
import ClubStorySkeleton from "@/components/ui/ClubStorySkeleton";
import TopProgressBar from "@/components/ui/TopProgressBar";
import { ClubStory } from "@/utils/interfaces";
import MetaTags from "@/components/layout/MetaTags";
import { getClubStories } from "@/services/api";
import Pagination from "@/components/ui/Pagination";
import { useNotifications } from "@/hooks/useNotifications";

export default function ClubStoriesPage() {
  const { t } = useTranslation();
  const { showError } = useNotifications();
  const [searchParams] = useSearchParams();
  const [stories, setStories] = useState<ClubStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasInitialData, setHasInitialData] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 12,
    total_count: 0,
    total_pages: 0,
  });

  const fetchStories = async (page = 1) => {
    try {
      setLoading(true);
      const params: Record<string, string> = { page: page.toString() };
      for (const [key, value] of searchParams.entries()) {
        if (key !== "page") {
          params[key] = value;
        }
      }

      const response = await getClubStories(params);
      setStories(response.data.club_stories);
      setPagination(response.data.pagination);
      setHasInitialData(true);

      // Smooth scroll to top after data is loaded (for pagination)
      if (hasInitialData) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      showError(t("errors.fetch_club_stories"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories(Number(searchParams.get("page") || 1));
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    fetchStories(page);
  };

  return (
    <>
      <MetaTags pageType="club_stories" url={window.location.href} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">
            {t("club.stories.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            {t("club.stories.subtitle")}
          </p>
        </div>

        {/* Show progress bar when paginating (loading with existing data) */}
        {loading && hasInitialData && <TopProgressBar isLoading={loading} />}

        {loading && !hasInitialData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <ClubStorySkeleton key={index} />
            ))}
          </div>
        ) : stories && stories.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <ClubStoryCard key={story.id} story={story} />
              ))}
            </div>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600 dark:text-gray-400">
              {t("club.stories.empty")}
            </h3>
          </div>
        )}
      </div>
    </>
  );
}
