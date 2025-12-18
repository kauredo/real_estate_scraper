import { useTranslation } from "react-i18next";
import { BlogPost } from "@/utils/interfaces";
import { ButtonLink } from "@/components/ui/ButtonLink";
import ContentCard from "@/components/ui/ContentCard";

const BlogCard = ({ blogPost }: { blogPost: BlogPost }) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";
  const prefix = isEnglish ? "/en" : "";
  const slug = isEnglish && blogPost.slug_en ? blogPost.slug_en : blogPost.slug;
  const blogUrl = `${prefix}/blog/${slug}`;

  return (
    <ContentCard
      title={blogPost.title}
      description={blogPost.sample_text}
      image={blogPost.main_photo_thumb || blogPost.main_photo}
      imageAlt={blogPost.title}
      linkUrl={blogUrl}
      action={<ButtonLink to={blogUrl}>{t("general.read_more")}</ButtonLink>}
      className="max-w-sm w-96 mb-5 mx-auto"
    />
  );
};

export default BlogCard;
