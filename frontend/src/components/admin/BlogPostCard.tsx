import { useTranslation } from "react-i18next";
import { BlogPost } from "../../utils/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BlogPostCardProps {
  post: BlogPost;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
}

const BlogPostCard = ({
  post,
  onDelete,
  onEdit,
  onView,
}: BlogPostCardProps) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    if (window.confirm(t("admin.confirmDelete"))) {
      onDelete?.(post.id);
    }
  };

  return (
    <div className="bg-white dark:bg-dark shadow-md border border-gray-200 rounded-lg max-w-sm w-96 mb-5 mx-auto">
      {onView && (
        <div onClick={() => onView(post.id)} className="cursor-pointer">
          <img
            loading="lazy"
            className="w-full rounded-t-lg aspect-video object-cover"
            src={post.main_photo}
            alt={post.title}
          />
        </div>
      )}
      <div className="p-5">
        {onView && (
          <div onClick={() => onView(post.id)} className="cursor-pointer">
            <h5 className="text-gray-900 dark:text-light font-bold text-2xl tracking-tight mb-2">
              {post.title}
            </h5>
          </div>
        )}
        <p className="font-normal text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-line">
          {post.small_description}
        </p>
        <div className="flex gap-2">
          {onView && (
            <button
              onClick={() => onView(post.id)}
              className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {t("admin.view")}
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(post.id)}
              className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {t("admin.edit")}
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-700 text-white dark:text-dark p-2 rounded font-bold"
            >
              <FontAwesomeIcon icon="trash-alt" />
            </button>
          )}
        </div>
        {post.hidden && (
          <span className="mt-2 inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
            {t("admin.blog_posts.hidden")}
          </span>
        )}
      </div>
    </div>
  );
};

export default BlogPostCard;
