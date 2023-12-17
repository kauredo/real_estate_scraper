import { useEffect, useState } from "react";
import Profile from "../shared/Profile";
import Results from "../home/Results";
import Banner from "../shared/Banner";
import { find_all_results, find_all_testimonials } from "../../utils/getters";
import { ResultNumbers } from "../utils/Interfaces";
import { i18n } from "../../languages/languages";

function About() {
  const [results, setResults] = useState({} as ResultNumbers | any);
  const [testimonials, setTestimonials] = useState([]);
  const meta_title = i18n.t("about.header");
  const meta_description = i18n.t("about.meta_description");

  useEffect(() => {
    const resizeFrame = () => {
      const frame = document.getElementById("iframe");
      if (!frame) return;

      frame.style.height = (frame.scrollWidth / 16) * 9 + "px";
    };

    resizeFrame();
    window.addEventListener("resize", resizeFrame);

    const fetchData = async () => {
      const tempResults = await find_all_results();
      const tempTestimonials = await find_all_testimonials();

      return { tempResults, tempTestimonials };
    };

    fetchData().then(data => {
      setResults(data.tempResults);
      setTestimonials(data.tempTestimonials);
    });

    return () => {
      window.removeEventListener("resize", resizeFrame);
    };
  }, []);

  return (
    <>
      <Banner height="20vh" blurred={true} text={meta_title}></Banner>
      <section className="container mx-auto mt-6 mb-12 px-8">
        <div className="pt-6 bg-white text-center md:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
            <h1
              id="main-title"
              className="relative block md:hidden mt-2 text-3xl text-black sm:text-4xl px-4"
            >
              {meta_title}
            </h1>
          </div>
        </div>
        <Profile />
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
            <h2 className="block mt-2 text-2xl text-black sm:text-4xl">
              {i18n.t("about.who.title")}
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-max">
              {i18n.t("about.who.sub1")}
            </p>
            <p className="mt-4 text-xl text-gray-500 max-w-max">
              {i18n.t("about.who.sub2")}
            </p>
          </div>
        </div>
        <iframe
          style={{ maxWidth: "1200px", aspectRatio: 16 / 9 }}
          className="w-full mx-auto"
          src="https://www.youtube.com/embed/5Df9-NnblZs"
          title="Intro Sofia Galvão"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="block mt-2 text-2xl text-black sm:text-4xl">
              {i18n.t("about.mission.title")}
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-max">
              {i18n.t("about.mission.sub1")}
            </p>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="block mt-2 text-2xl text-black sm:text-4xl">
              {i18n.t("about.vision.title")}
            </h2>
            <p className="mt-4 text-xl text-gray-500 max-w-max">
              {i18n.t("about.vision.sub1")}
            </p>
            <p className="mt-4 text-xl text-beige max-w-max">
              {i18n.t("about.vision.sub2")}
            </p>
          </div>
        </div>
        <div className="py-8 md:pb-0 md:pt-4 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="block mt-2 text-2xl text-black sm:text-4xl">
              {i18n.t("about.results.title")}
            </h2>
          </div>
        </div>
        <Results results={results} testimonials={testimonials} />
      </section>
    </>
  );
}

export default About;
