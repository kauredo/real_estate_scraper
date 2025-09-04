import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import ClubStoryCard from "../components/club/ClubStoryCard";
import SubNavbar from "../components/shared/SubNavbar";
import ClubHeader from "../components/club/ClubHeader";
import IconDecorationWrapper from "../components/shared/IconDecorationWrapper";
import { useClubSections } from "../utils/constants/clubSections";
import { ClubStory } from "../utils/interfaces";
import MetaTags from "../components/shared/MetaTags";
import { getClubStories } from "../services/api";
import Pagination from "../components/shared/Pagination";

export default function ClubStoriesPage({ isBackoffice = false }) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [stories, setStories] = useState<ClubStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    per_page: 12,
    total_count: 0,
    total_pages: 0,
  });
  const clubSections = useClubSections();

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
    } catch (error) {
      console.error("Error fetching club stories:", error);
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
      {!isBackoffice && <SubNavbar items={clubSections} />}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center pt-12 pb-24">
          {!isBackoffice && (
            <>
              <ClubHeader />

              <section className="w-full max-w-4xl">
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-16">
                  <IconDecorationWrapper id="dignity">
                    <div className="flex flex-col mb-16">
                      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-dark dark:text-light">
                        {t("club.stories.transformed_life")}
                      </h1>
                      <p className="text-xl md:text-2xl leading-relaxed text-gray-700 dark:text-gray-200 mb-6">
                        {t("club.stories.real_people")}
                      </p>
                      <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
                        {t("club.stories.impact_description")}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-dark dark:text-light">
                        {t("club.stories.explore_stories")}
                      </h3>
                      <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
                        {t("club.stories.stories_description")}
                      </p>
                    </div>
                  </IconDecorationWrapper>
                </div>
              </section>
            </>
          )}

          <div className="w-full max-w-7xl mt-16">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : stories && stories.length > 0 ? (
              <>
                {stories.length === 1 && (
                  <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
                    {stories.map(story => (
                      <div className="w-full" key={story.id}>
                        <ClubStoryCard
                          story={story}
                          isBackoffice={isBackoffice}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {stories.length === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {stories.map(story => (
                      <div className="w-full" key={story.id}>
                        <ClubStoryCard
                          story={story}
                          isBackoffice={isBackoffice}
                        />
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
                      {stories.map(story => (
                        <div className="w-full" key={story.id}>
                          <ClubStoryCard
                            story={story}
                            isBackoffice={isBackoffice}
                          />
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
