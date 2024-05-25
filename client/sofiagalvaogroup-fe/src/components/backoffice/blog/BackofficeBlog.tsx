import { useEffect, useState } from "react";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { HashLink } from "react-router-hash-link";
import { find_all_backoffice_blog_posts } from "../../../utils/getters";
import { BlogPost as BlogPostType } from "../../utils/Interfaces";
import { i18n } from "../../../languages/languages";
import BlogPost from "../../blog/BlogPost";

const BackofficeBlog = () => {
  // Assuming you have a way to fetch or manage the listings data here
  const [blogPosts, setBlogs] = useState<BlogPostType[]>([]);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchData = async () => {
      const tempBlogs = await find_all_backoffice_blog_posts();

      return { tempBlogs };
    };

    fetchData().then(data => {
      setBlogs(data.tempBlogs);
    });
  }, []);

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
        <div className="mt-6">
          <HashLink
            to="new"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Novo Post
          </HashLink>
        </div>
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          {i18n.t("blog_posts.header")}
        </h2>
        <p className="text-center text-gray-600 max-w-none">
          Total {blogPosts.length} {i18n.t("blog_posts.header").toLowerCase()}
        </p>
        {blogPosts?.map(blogPost => (
          <BlogPost blogPost={blogPost} key={blogPost.id} backoffice />
        ))}
      </div>
    </div>
  );
};

export default BackofficeBlog;
