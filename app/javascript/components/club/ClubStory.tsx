import React from "react";
import { i18n } from "../../languages/languages";
import { ClubStory } from "../utils/Interfaces";
import ShareIcons from "../shared/ShareIcons";

interface Props {
  club_story: ClubStory;
}

export default function ClubStoryShow({ club_story }: Props) {
  return (
    <div className="container mx-auto flex flex-col px-4">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
        <h1 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl mb-4">
          {club_story.title}
        </h1>
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: club_story.text }}
        />
        <div className="mt-10">
          <ShareIcons title={club_story.title} />
        </div>
      </div>
    </div>
  );
}
