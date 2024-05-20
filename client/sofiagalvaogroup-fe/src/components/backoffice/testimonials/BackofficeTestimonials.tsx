import { useEffect, useState } from "react";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { HashLink } from "react-router-hash-link";
import { find_all_testimonials } from "../../../utils/getters";
import { Testimonial } from "../../utils/Interfaces";
import { i18n } from "../../../languages/languages";
import { deleteTestimonial } from "../../../utils/setters";

const BackofficeTestimonials = () => {
  // Assuming you have a way to fetch or manage the listings data here
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchData = async () => {
      const tempTestimonials = await find_all_testimonials();

      return { tempTestimonials };
    };

    fetchData().then(data => {
      setTestimonials(data.tempTestimonials);
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
            Novo Testemunho
          </HashLink>
        </div>
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          {i18n.t("navbar.testimonies")}
        </h2>
        <p className="text-center text-gray-600 max-w-none">
          Total {testimonials.length}{" "}
          {i18n.t("navbar.testimonies").toLowerCase()}
        </p>
        {testimonials?.map(testimonial => (
          <div
            key={testimonial.id}
            className="field mb-4 flex flex-col sm:flex-row gap-4 justify-between border-b border-blue-700 py-4"
          >
            <div>
              <q className="block text-gray-700 w-full text-sm font-bold">
                {testimonial.text}
              </q>{" "}
              - <span>{testimonial.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <HashLink
                to={`${testimonial.id}/edit`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Editar
              </HashLink>
              <HashLink
                onClick={e => {
                  if (
                    window.confirm("Are you sure you want to delete this item?")
                  ) {
                    e.preventDefault();
                    deleteTestimonial(testimonial.id, setFlashMessage);
                    setTestimonials(prev =>
                      prev.filter(t => t.id !== testimonial.id)
                    );
                  }
                }}
                className="bg-red-500 hover:bg-red-700 p-2 rounded font-bold"
              >
                🗑️
              </HashLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackofficeTestimonials;
