import { useEffect, useState } from "react";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { find_listing_complex_by_id } from "../../../utils/getters";
import { ListingComplex } from "../../utils/Interfaces";
import { i18n } from "../../../languages/languages";
import { updateListingComplex } from "../../../utils/setters";
import ComplexForm from "./ComplexForm";

const EditComplex = () => {
  const [complex, setComplex] = useState<ListingComplex | any>(null);
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

      const tempComplex = await find_listing_complex_by_id(id);

      return { tempComplex };
    };

    fetchData().then(data => {
      setComplex(data.tempComplex.listing_complex);
    });
  }, []);

  const onUpdate = (values: ListingComplex) => {
    // Handle form submission logic here
    updateListingComplex(complex.id, values, setFlashMessage);
    setComplex(values);
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          Editar Empreendimento: {complex?.name}
        </h2>
        {complex && (
          <ComplexForm initialValues={complex} handleSubmit={onUpdate} />
        )}
      </div>
    </div>
  );
};

export default EditComplex;
