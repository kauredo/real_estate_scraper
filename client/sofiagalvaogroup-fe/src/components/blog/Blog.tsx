import { useEffect, useState } from "react";
import { i18n } from "../../languages/languages";
import Complexes from "../listingComplex/Complexes";
import Banner from "../shared/Banner";
import Pagination from "../shared/Pagination";
import { Pagy } from "../utils/Interfaces";
import { find_all_blog_posts } from "../../utils/getters";
import BlogPost from "./BlogPost";

export default function Blog() {
  const meta_title = i18n.t("blog_posts.header");
  const meta_description = i18n.t("blog_posts.meta_description");

  const [blogPosts, setBlogPosts] = useState([]);
  const [pagy, setPagy] = useState<Pagy | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const tempPosts = await find_all_blog_posts(page);

      return { tempPosts };
    };

    fetchData().then(data => {
      setBlogPosts(data.tempPosts.blog_posts);
      setPagy(data.tempPosts.pagy);
    });
  }, [page]);

  return (
    <>
      <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
        <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
          <h1 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
            {meta_title}
          </h1>
          <br />
          <div className="flex flex-wrap gap-4">
            {pagy && <Pagination pagy={pagy} page={page} setPage={setPage} />}
            {blogPosts?.map(blogPost => (
              <BlogPost blogPost={blogPost} />
            ))}
            {pagy && <Pagination pagy={pagy} page={page} setPage={setPage} />}
          </div>
        </div>
      </div>
    </>
  );
}
