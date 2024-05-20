import { useEffect, useState } from "react";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { find_testimonial_by_id } from "../../../utils/getters";
import { Testimonial } from "../../utils/Interfaces";
import { i18n } from "../../../languages/languages";
import { updateTestimonial } from "../../../utils/setters";
import TestimonialForm from "./TestimonialForm";

const EditTestimonial = () => {
  const [testimonial, setTestimonial] = useState<Testimonial | any>(null);
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

      const tempTestimonial = await find_testimonial_by_id(id);

      return { tempTestimonial };
    };

    fetchData().then(data => {
      setTestimonial(data.tempTestimonial);
    });
  }, []);

  const onUpdate = (values: Testimonial) => {
    // Handle form submission logic here
    updateTestimonial(testimonial.id, values, setFlashMessage);
    setTestimonial(values);
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          Editar Testemunho: {testimonial?.name}
        </h2>
        {testimonial && (
          <TestimonialForm
            initialValues={testimonial}
            handleSubmit={onUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default EditTestimonial;
