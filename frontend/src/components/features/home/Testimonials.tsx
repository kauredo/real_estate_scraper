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
      <div className="mx-2 p-6 text-left bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 dark:border dark:border-gray-700 max-w-2xl">
        <p className="whitespace-pre-line text-dark dark:text-light mb-4">
          <span className="inline-block mr-1 text-xl">"</span>
          {testimonial.text}
          <span className="inline-block ml-1 text-xl">"</span>
        </p>
        <p className="font-bold text-right text-dark dark:text-light">
          - {testimonial.name}
        </p>
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
