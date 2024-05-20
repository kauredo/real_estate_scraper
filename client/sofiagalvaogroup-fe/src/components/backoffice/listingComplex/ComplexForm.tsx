import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { ListingComplex } from "../../utils/Interfaces";

const ComplexForm = ({ handleSubmit, initialValues }) => {
  const [formState, setFormState] = useState<ListingComplex>({
    ...initialValues,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (e.target.type === "checkbox") {
      setFormState({
        ...formState,
        [name]: (e.target as HTMLInputElement).checked,
      });
      return;
    }
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmitForm = event => {
    event.preventDefault();
    handleSubmit(formState);
  };

  return (
    <form className="my-6" onSubmit={handleSubmitForm}>
      <BluePart />
      <ActionBtns initialValues={initialValues} gap />
      <div className="field mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label className="sm:w-1/4 w-full">Name</label>
        <input
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={handleChange}
          name="name"
          value={formState.name || ""}
        />
      </div>
      <div className="field mb-4 flex flex-row sm:items-center gap-2 sm:gap-4">
        <label className="w-1/4">New format</label>
        <input
          type="checkbox"
          onChange={handleChange}
          name="new_format"
          checked={formState.new_format}
        />
      </div>
      <div className="field mb-4 flex flex-row sm:items-center gap-2 sm:gap-4">
        <label className="w-1/4">Hidden</label>
        <input
          type="checkbox"
          onChange={handleChange}
          name="hidden"
          checked={formState.hidden}
        />
      </div>
      <div className="field mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label className="sm:w-1/4 w-full">Video link</label>

        <input
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={handleChange}
          name="video_link"
          value={formState.video_link || ""}
        />
      </div>
      <div className="field mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label className="sm:w-1/4 w-full">Order</label>

        <input
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          onChange={handleChange}
          name="order"
          value={formState.order || ""}
        />
      </div>
      <div className="field mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label className="sm:w-1/4 w-full">Description</label>

        <textarea
          rows={20}
          onChange={handleChange}
          name="description"
          value={formState.description || ""}
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="field mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label className="sm:w-1/4 w-full">Subtext</label>

        <textarea
          rows={20}
          onChange={handleChange}
          name="subtext"
          value={formState.subtext || ""}
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="field mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <label className="sm:w-1/4 w-full">Final text</label>

        <textarea
          rows={20}
          onChange={handleChange}
          name="final_text"
          value={formState.final_text || ""}
          className="shadow appearance-none border rounded w-full sm:w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="field mb-4 flex flex-col items-center gap-2 sm:gap-4">
        <label className="sm:w-1/4 w-full">Photos</label>

        <div className="field w-full sm:w-auto">
          <label>Image</label>
          <br />
          <input type="file" />
        </div>

        <div className="flex flex-wrap justify-between content-center"></div>
      </div>
      <div className="field mb-4 flex flex-col items-center gap-2 sm:gap-4">
        <label className="sm:w-1/4 w-full">Listings</label>

        <div className="mb-4">
          <div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-6"></div>
        </div>
      </div>
      <ActionBtns initialValues={initialValues} />
    </form>
  );
};

export default ComplexForm;

const ActionBtns = ({ initialValues, gap = false }) => {
  return (
    <div className={`flex items-center gap-2 ${gap && "mb-4"}`}>
      <button
        type="submit"
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {initialValues.id ? "Update" : "Create"}
      </button>
      <HashLink
        to={`/latest/${initialValues.slug}`}
        className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Ver Empreendimento
      </HashLink>
    </div>
  );
};

const BluePart = () => {
  return (
    <div className="bg-blue-100 p-4 rounded mb-4">
      <p>
        <strong>Nota:</strong>
      </p>
      <hr className="my-2" />
      <p className="max-w-none">
        O campo <strong>New format</strong> altera a visualização do
        empreendimento.
      </p>
      <p className="max-w-none">
        Se o empreendimento <strong>tiver</strong> os imóveis presentes no site,
        adicionar os imóveis e a lista aparecerá na página com esses detalhes.
      </p>
      <p className="max-w-none">
        Se o empreendimento <strong>não tiver</strong> os imóveis presentes no
        site, adicionar os preços num dos campos de texto (description, subtext
        ou final text) com o seguinte formato (consoante a versão PT ou EN do
        site):
      </p>
      <br />
      <p>
        <strong>Exemplo:</strong>
      </p>

      <p className="max-w-none text-center">
        <code>
          <span>Versão PT:</span>
          <br />
          Preço <strong>para um</strong> tipologia
          <br />
          290 000€ para um Estúdio
          <br />
          610 000€ para um apartamento T2
          <br />
          <br />
          <span>Versão EN:</span>
          <br />
          Preço <strong>for a</strong> tipologia
          <br />
          290 000€ for a Studio
          <br />
          610 000€ for a 2 bedroom apartment
          <br />
        </code>
      </p>
    </div>
  );
};
