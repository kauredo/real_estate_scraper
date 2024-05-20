import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { createTestimonial } from "../../../utils/setters";
import { Testimonial } from "../../utils/Interfaces";
import TestimonialForm from "./TestimonialForm";

const NewTestimonial = () => {
  const initialValues = { name: "", text: "" };
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const onCreate = (values: Testimonial) => {
    // Handle form submission logic here
    createTestimonial(values, setFlashMessage);
    navigate("/backoffice/testimonials");
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          Novo Testemunho
        </h2>
        <TestimonialForm
          initialValues={initialValues}
          handleSubmit={onCreate}
        />
      </div>
    </div>
  );
};

export default NewTestimonial;
