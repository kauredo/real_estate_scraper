import { useEffect, useState } from "react";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { find_blog_post_by_id } from "../../../utils/getters";
import { BlogPost } from "../../utils/Interfaces";
import { i18n } from "../../../languages/languages";
import { updateBlogPost } from "../../../utils/setters";
import BlogForm from "./BlogForm";

const EditBlog = () => {
  const [blog_post, setBlog] = useState<BlogPost | any>(null);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchData = async () => {
      const path = window.location.pathname.split("/");
      let id;
      if (Object.keys(i18n.translations).includes(path[1])) {
        id = path[4];
      } else {
        id = path[3];
      }

      const tempBlog = await find_blog_post_by_id(id);

      return { tempBlog };
    };

    fetchData().then(data => {
      setBlog(data.tempBlog.blog_post);
    });
  }, []);

  const onUpdate = (values: BlogPost) => {
    // Handle form submission logic here
    updateBlogPost(blog_post.id, values, setFlashMessage);
    setBlog(values);
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black sm:text-3xl">
          Editar Post: {blog_post?.title}
        </h2>
        {blog_post && (
          <BlogForm initialValues={blog_post} handleSubmit={onUpdate} />
        )}
      </div>
    </div>
  );
};

export default EditBlog;
