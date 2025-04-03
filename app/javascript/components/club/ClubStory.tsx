import React from "react";
import { i18n } from "../../languages/languages";
import { ClubStory } from "../utils/Interfaces";
import ShareIcons from "../shared/ShareIcons";
import PhotoGallery from "../shared/PhotoGallery";
import SubNavbar from "../shared/SubNavbar";
import { clubSections } from "../utils/constants/clubSections";

interface Props {
  club_story: ClubStory;
}

export default function ClubStoryShow({ club_story }: Props) {
  return (
    <>
      <SubNavbar items={clubSections} />
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white/50 dark:bg-dark/50 rounded-lg shadow-lg overflow-hidden">
          <header className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-dark dark:text-light">
              {club_story.title}
            </h1>
            <div className="text-center text-gray-600 dark:text-gray-400">
              {new Date(club_story.created_at).toLocaleDateString()}
            </div>
          </header>

          {club_story.video_link && (
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <iframe
                src={club_story.video_link}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}

          {club_story.club_story_photos &&
            club_story.club_story_photos.length > 0 && (
              <div className="px-8">
                <PhotoGallery
                  photos={club_story.club_story_photos.map(p => p.image.url)}
                />
              </div>
            )}

          <div className="prose prose-lg dark:prose-invert max-w-none p-8">
            <div dangerouslySetInnerHTML={{ __html: club_story.text }} />
          </div>

          <footer className="px-8 py-6 border-t border-gray-200 dark:border-gray-700">
            <ShareIcons title={club_story.title} />
          </footer>
        </article>
      </div>
    </>
  );
}
