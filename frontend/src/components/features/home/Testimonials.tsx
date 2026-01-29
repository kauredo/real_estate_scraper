import { useTranslation } from "react-i18next";
import { Testimonial } from "@/utils/interfaces";
import Carousel from "@/components/ui/Carousel";

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials(props: Props) {
  const { t } = useTranslation();
  const { testimonials } = props;

  const testimonialItems = testimonials.map((testimonial) => (
    <div key={`${testimonial.name}--testimonial`}>
      <div className="mx-2 p-6 text-left bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-out dark:shadow-gray-900/50 dark:border dark:border-gray-700 max-w-2xl">
        <blockquote className="whitespace-pre-line text-dark dark:text-light mb-4 italic">
          <span className="inline-block mr-1 text-2xl text-beige-default dark:text-beige-medium not-italic" aria-hidden="true">"</span>
          {testimonial.text}
          <span className="inline-block ml-1 text-2xl text-beige-default dark:text-beige-medium not-italic" aria-hidden="true">"</span>
        </blockquote>
        <cite className="block font-bold text-right text-dark dark:text-light not-italic">
          — {testimonial.name}
        </cite>
      </div>
    </div>
  ));

  return (
    <section
      className="p-6 text-center w-full max-w-[1200px] mx-auto"
      aria-labelledby="testimonials-title"
    >
      <h2
        id="testimonials-title"
        className="text-2xl mb-8 mx-auto font-semibold text-dark dark:text-light"
      >
        {t("about.testimonies.title")}
      </h2>

      <div
        className="transition-all duration-300"
        role="region"
        aria-label={t("about.testimonies.carousel_label") || "Customer testimonials"}
      >
        <Carousel
          items={testimonialItems}
          slidesToShow={2}
          autoplay={false}
          showCounter={false}
          responsive
          dynamicHeight
          className="testimonials-carousel"
        />
      </div>
    </section>
  );
}
