import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BlogPost } from "@/utils/interfaces";
import { Button } from "@/components/ui/Button";

const BlogCard = ({ blogPost }: { blogPost: BlogPost }) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";
  const prefix = isEnglish ? "/en" : "";
  const slug = isEnglish && blogPost.slug_en ? blogPost.slug_en : blogPost.slug;

  return (
    <div className="bg-white dark:bg-dark shadow-md border border-gray-200 rounded-lg max-w-sm w-96 mb-5 mx-auto">
      <Link to={`${prefix}/blog/${slug}`}>
        <img
          loading="lazy"
          className="w-full rounded-t-lg aspect-video object-cover"
          src={blogPost.main_photo_thumb || blogPost.main_photo}
          alt={blogPost.title}
        />
      </Link>
      <div className="p-5">
        <Link to={`${prefix}/blog/${slug}`}>
          <h5 className="text-gray-900 dark:text-light font-bold text-2xl tracking-tight mb-2">
            {blogPost.title}
          </h5>
        </Link>
        <p className="font-normal text-gray-700 dark:text-light mb-3 whitespace-pre-line">
          {blogPost.sample_text}
        </p>
        <Link to={`${prefix}/blog/${slug}`}>
          <Button>{t("general.read_more")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
