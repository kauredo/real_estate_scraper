import { useEffect, useState } from "react";
import { BlogPost } from "../utils/Interfaces";
import { i18n } from "../../languages/languages";
import { find_blog_post_by_id } from "../../utils/getters";
import { useResource } from "../../contexts/ResourceContext";

export default function BlogShow() {
  const [blogPost, setBlogPost] = useState<BlogPost | any>(null);
  const meta_title = blogPost ? blogPost.meta_title : "";
  const meta_description = blogPost ? blogPost.meta_description : "";
  const { setResource } = useResource();

  useEffect(() => {
    const fetchData = async () => {
      const path = window.location.pathname.split("/");
      let id;
      if (Object.keys(i18n.translations).includes(path[1])) {
        id = path[3];
      } else {
        id = path[2];
      }

      const tempBlogPost = await find_blog_post_by_id(id);

      return { tempBlogPost };
    };

    fetchData().then(data => {
      setBlogPost(data.tempBlogPost.blog_post);
      setResource({
        path: `/backoffice/blog_posts/${data.tempBlogPost.blog_post.slug}/edit`,
        name: "Post",
      });
    });
  }, []);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header
        className="!bg-center !bg-no-repeat !bg-cover min-h-[320px]"
        style={{ backgroundImage: `url(${blogPost.main_photo})` }}
      ></header>
      <div className="tinymce pt-8 px-8 mx-auto container">
        <div className="w-full tablet:w-2/3 mb-4">
          <h1>{blogPost.title}</h1>
          <p>{blogPost.date_created}</p>
        </div>

        <div dangerouslySetInnerHTML={{ __html: blogPost.text }}></div>
      </div>
    </>
  );
}
