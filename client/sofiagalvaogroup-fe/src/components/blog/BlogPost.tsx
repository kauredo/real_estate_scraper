import { HashLink } from "react-router-hash-link";

interface BlogPost {
  hidden: Boolean;
  id: number;
  meta_description: string;
  meta_title: string;
  slug: string;
  title: string;
  text: string;
  main_photo: string;
  sample_text: string;
}

export default function BlogPost({ blogPost }: { blogPost: BlogPost }) {
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
        <HashLink to={`/blog/${blogPost.slug}`}>
          <p className="w-fit bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Ler Mais
          </p>
        </HashLink>
      </div>
    </div>
  );
}
