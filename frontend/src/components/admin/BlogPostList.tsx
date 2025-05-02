import { useTranslation } from "react-i18next";
import { BlogPost } from "../../utils/interfaces";
import BlogPostCard from "./BlogPostCard";

interface Props {
  posts: BlogPost[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
}

const BlogPostList = ({ posts, onEdit, onDelete, onView }: Props) => {
  const { t } = useTranslation();

  if (!posts.length) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-lg text-gray-500 dark:text-gray-400">
        {t("admin.blog_posts.not_found")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-4">
        {t("admin.blog_posts.total")}: {posts.length}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <BlogPostCard
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPostList;
