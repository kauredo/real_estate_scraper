import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { createBlogPost } from "../../../utils/setters";
import { BlogPost } from "../../utils/Interfaces";
import BlogForm from "./BlogForm";

const NewBlog = () => {
  const initialValues = {
    meta_title: "",
    meta_description: "",
    title: "",
    text: "",
    hidden: true,
    sample_text: "",
  };

  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const onCreate = (values: BlogPost) => {
    // Handle form submission logic here
    createBlogPost(values, setFlashMessage);
    navigate("/backoffice/blog_posts");
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black sm:text-3xl">
          Novo Post
        </h2>
        <BlogForm initialValues={initialValues} handleSubmit={onCreate} />
      </div>
    </div>
  );
};

export default NewBlog;
