import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BlogPost } from "@/utils/interfaces";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

const BlogCard = ({ blogPost }: { blogPost: BlogPost }) => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language === "en";
  const prefix = isEnglish ? "/en" : "";
  const slug = isEnglish && blogPost.slug_en ? blogPost.slug_en : blogPost.slug;

  return (
    <Card className="max-w-sm w-96 mb-5 mx-auto">
      <Link to={`${prefix}/blog/${slug}`}>
        <img
          loading="lazy"
          className="w-full rounded-t-lg aspect-video object-cover"
          src={blogPost.main_photo_thumb || blogPost.main_photo}
          alt={blogPost.title}
        />
      </Link>
      <CardContent className="p-5">
        <Link to={`${prefix}/blog/${slug}`}>
          <CardTitle className="mb-2">{blogPost.title}</CardTitle>
        </Link>
        <CardDescription className="mb-3 whitespace-pre-line">
          {blogPost.sample_text}
        </CardDescription>
        <ButtonLink to={`${prefix}/blog/${slug}`}>
          {t("general.read_more")}
        </ButtonLink>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
