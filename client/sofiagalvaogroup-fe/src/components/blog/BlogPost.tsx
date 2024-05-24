import { HashLink } from "react-router-hash-link";
import type { BlogPost } from "../utils/Interfaces";
import { deleteBlogPost } from "../../utils/setters";
import { useFlashMessage } from "../../contexts/FlashMessageContext";
import { useState } from "react";

interface BlogPostProps {
  blogPost: BlogPost;
  backoffice?: boolean;
}

export default function BlogPost(props: BlogPostProps) {
  const { setFlashMessage } = useFlashMessage();
  const [blogPost, setBlogPost] = useState<BlogPost | any>(props.blogPost);
  const { backoffice } = props;

  if (!blogPost) {
    return null;
  }

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm w-96 mb-5">
      <HashLink to={`/blog/${blogPost.slug}`}>
        <img
          loading="lazy"
          className="w-full rounded-t-lg aspect-video object-cover"
          src={blogPost.main_photo}
          alt={blogPost.title}
        />
      </HashLink>
      <div className="p-5">
        <HashLink to={`/blog/${blogPost.slug}`}>
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
            {blogPost.title}
          </h5>
        </HashLink>

        <p className="font-normal text-gray-700 mb-3 whitespace-pre-line">
          {blogPost.sample_text}
        </p>
        <HashLink
          to={`/blog/${blogPost.slug}`}
          className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        >
          Ler Mais
        </HashLink>
        {backoffice && (
          <>
            <HashLink
              to={`/backoffice/blog_posts/${blogPost.slug}/edit`}
              className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Editar
            </HashLink>
            <HashLink
              onClick={e => {
                if (
                  window.confirm("Are you sure you want to delete this item?")
                ) {
                  e.preventDefault();
                  deleteBlogPost(blogPost.id, setFlashMessage);
                  setBlogPost(null);
                }
              }}
              className="bg-red-500 hover:bg-red-700 p-2 rounded font-bold"
            >
              🗑️
            </HashLink>
          </>
        )}
      </div>
    </div>
  );
}
