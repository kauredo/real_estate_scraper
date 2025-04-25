import { useTranslation } from "react-i18next";
import { Testimonial } from "../../utils/interfaces";
import Carousel from "../shared/Carousel";

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials(props: Props) {
  const { t } = useTranslation();
  const { testimonials } = props;

  const testimonialItems = testimonials.map(testimonial => (
    <div
      key={`${testimonial.name}--testimonial`}
      className="p-6 mx-2 text-left flex flex-col bg-white dark:bg-dark-default rounded-lg shadow-md h-full"
    >
      <p className="whitespace-pre-line text-dark dark:text-light mb-4">
        <span className="inline-block mr-1 text-xl">"</span>
        {testimonial.text}
        <span className="inline-block ml-1 text-xl">"</span>
      </p>
      <p className="font-bold text-right text-dark dark:text-light mt-auto">
        - {testimonial.name}
      </p>
    </div>
  ));

  return (
    <div className="p-6 text-center w-full max-w-[1200px] mx-auto">
      <h2
        id="testimony-title"
        className="text-2xl mb-8 mx-auto font-semibold text-dark dark:text-light"
      >
        {t("about.testimonies.title")}
      </h2>

      <Carousel
        items={testimonialItems}
        slidesToShow={2}
        autoplay
        showCounter={false}
        responsive
      />
    </div>
  );
}
