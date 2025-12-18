import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PhotoGallery from "@/components/ui/PhotoGallery";
import ShareIcons from "@/components/ui/ShareIcons";
import { ClubStory } from "@/utils/interfaces";
import MetaTags from "@/components/layout/MetaTags";
import { getClubStory } from "@/services/api";

export default function ClubStoryDetailPage() {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const previewToken = searchParams.get("preview_token");
  const [clubStory, setClubStory] = useState<ClubStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await getClubStory(slug, previewToken || undefined);
        setClubStory(response.data.club_story);
      } catch (error) {
        console.error("Error fetching club story:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [slug, previewToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!clubStory) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600 dark:text-gray-300">
          {t("club.story.not_found")}
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaTags
        pageType="club_stories"
        title={clubStory?.title}
        description={clubStory?.excerpt}
        image={clubStory?.main_photo}
        url={window.location.href}
      />
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white/50 dark:bg-dark/50 rounded-lg shadow-lg overflow-hidden">
          <header className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-dark dark:text-light">
              {clubStory.title}
            </h1>
            <div className="text-center text-gray-600 dark:text-gray-400">
              {new Date(clubStory.created_at).toLocaleDateString()}
            </div>
          </header>

          {clubStory.video_link && (
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <iframe
                src={clubStory.video_link}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}

          {clubStory.club_story_photos &&
            clubStory.club_story_photos.length > 0 && (
              <div className="px-8">
                <PhotoGallery
                  photos={clubStory.club_story_photos.map((p) => p.image_url)}
                />
              </div>
            )}

          <div className="prose prose-lg dark:prose-invert max-w-none p-8">
            <div
              className="tinymce"
              dangerouslySetInnerHTML={{ __html: clubStory.text }}
            />
          </div>

          <footer className="px-8 py-6 border-t border-gray-200 dark:border-gray-700">
            <ShareIcons title={clubStory.title} />
          </footer>
        </article>
      </div>
    </>
  );
}
