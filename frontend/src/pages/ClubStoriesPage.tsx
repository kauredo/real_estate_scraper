import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import ClubStoryCard from "@/components/club/ClubStoryCard";
import ClubStorySkeleton from "@/components/loading/ClubStorySkeleton";
import TopProgressBar from "@/components/loading/TopProgressBar";
import { ClubStory } from "@/utils/interfaces";
import MetaTags from "@/components/shared/MetaTags";
import { getClubStories } from "@/services/api";
import Pagination from "@/components/shared/Pagination";
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
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center pt-12 pb-24">
          {/* Show progress bar when paginating (loading with existing data) */}
          {loading && hasInitialData && <TopProgressBar isLoading={loading} />}

          <div className="w-full max-w-7xl mt-16">
            {loading && !hasInitialData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <ClubStorySkeleton key={index} />
                ))}
              </div>
            ) : stories && stories.length > 0 ? (
              <>
                {stories.length === 1 && (
                  <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
                    {stories.map((story) => (
                      <div className="w-full" key={story.id}>
                        <ClubStoryCard story={story} />
                      </div>
                    ))}
                  </div>
                )}
                {stories.length === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {stories.map((story) => (
                      <div className="w-full" key={story.id}>
                        <ClubStoryCard story={story} />
                      </div>
                    ))}
                  </div>
                )}
                {stories.length >= 3 && (
                  <>
                    <Pagination
                      pagination={pagination}
                      onPageChange={handlePageChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {stories.map((story) => (
                        <div className="w-full" key={story.id}>
                          <ClubStoryCard story={story} />
                        </div>
                      ))}
                    </div>
                    <Pagination
                      pagination={pagination}
                      onPageChange={handlePageChange}
                    />
                  </>
                )}
              </>
            ) : (
              <div className="col-span-full text-center p-8 text-lg font-light bg-white/50 dark:bg-dark/50 rounded-lg shadow-lg">
                <h3>{t("club.stories.empty")}</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
