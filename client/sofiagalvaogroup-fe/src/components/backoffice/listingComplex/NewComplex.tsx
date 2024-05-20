import { useNavigate } from "react-router-dom";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { createListingComplex } from "../../../utils/setters";
import { ListingComplex } from "../../utils/Interfaces";
import ComplexForm from "./ComplexForm";

const NewComplex = () => {
  const initialValues = {
    name: "",
    video_link: "",
    description: "",
    subtext: "",
    final_text: "",
    listings: [],
    hidden: false,
    new_format: false,
    photos: [],
  };
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  const onCreate = (values: ListingComplex) => {
    // Handle form submission logic here
    createListingComplex(values, setFlashMessage).then(res => {
      if (res?.listing_complex) {
        navigate(
          `/backoffice/listing_complexes/${res.listing_complex.id}/edit`
        );
      }
    });
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          Novo Empreendimento
        </h2>
        <ComplexForm initialValues={initialValues} handleSubmit={onCreate} />
      </div>
    </div>
  );
};

export default NewComplex;
