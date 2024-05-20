import { useEffect, useState } from "react";
import { find_listing_by_id } from "../../../utils/getters";
import { updateListing, updateListingDetails } from "../../../utils/setters";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";
import { Listing } from "../../utils/Interfaces";
import { i18n } from "../../../languages/languages";
import { HashLink } from "react-router-hash-link";

const EditListing = () => {
  const [listing, setListing] = useState<Listing | any>(null);
  const [formState, setFormState] = useState<Listing>({ ...listing });
  const [listingStatuses, setListingStatuses] = useState([]);
  const [listingComplexes, setListingComplexes] = useState([]);
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

      const tempListing = await find_listing_by_id(id);

      return { tempListing };
    };

    fetchData().then(data => {
      setListing(data.tempListing.listing);
      setFormState({ ...data.tempListing.listing });
      setListingStatuses(data.tempListing.statuses);
      setListingComplexes(data.tempListing.complexes);
    });
  }, []);

  if (!listing) {
    return <div>Loading...</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    updateListing(listing.id, formState, setFlashMessage);
  };

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          Editar Imóvel {formState.title}
        </h2>
        <p className="text-gray-500 pt-3 max-w-none">
          Nota: os textos podem ser mudados nas diferentes liguagens, basta
          mudar para a linguagem desejada
        </p>
        <form onSubmit={handleSubmit} className="my-6">
          <ActionBtns setFlashMessage={setFlashMessage} listing={listing} gap />

          {/* Form Fields */}
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="title" className="w-1/4">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formState.title || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="url" className="w-1/4">
              URL:
            </label>
            <input
              type="text"
              name="url"
              value={formState.url || ""}
              onChange={handleChange}
              disabled
              className="input-disabled shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="order" className="w-1/4">
              Order:
            </label>
            <input
              type="text"
              name="order"
              value={formState.order || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="address" className="w-1/4">
              Address:
            </label>
            <input
              type="text"
              name="address"
              value={formState.address || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="price" className="w-1/4">
              Price:
            </label>
            <input
              type="text"
              name="price"
              value={formState.price || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="video_link" className="w-1/4">
              Video Link:
            </label>
            <input
              type="text"
              name="video_link"
              value={formState.video_link || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="status" className="w-1/4">
              Status:
            </label>
            <select
              name="status"
              value={formState.status || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {listingStatuses.map(status => {
                const text = status[0];
                const value = status[1] || status[0];

                return (
                  <option value={value} key={value}>
                    {text}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="listing_complex_id" className="w-1/4">
              Empreendimento:
            </label>
            <select
              name="listing_complex_id"
              value={formState.listing_complex_id || ""}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Associar a Empreendimento?</option>
              {listingComplexes.map(complex => {
                const text = complex[0];
                const value = complex[1] || complex[0];

                return (
                  <option value={value} key={value}>
                    {text}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
            <label htmlFor="description" className="w-1/4">
              Description:
            </label>
            <textarea
              name="description"
              value={formState.description || ""}
              onChange={handleChange}
              rows={30}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <ActionBtns setFlashMessage={setFlashMessage} listing={listing} />
        </form>

        {/* Photos Section */}
        <div className="photos my-4">
          <h3 className="text-xl font-bold mb-2">Photos</h3>
          <div className="flex gap-2 flex-wrap">
            {listing.photos.map(photoUrl => (
              <img
                src={photoUrl}
                alt=""
                className="w-24 h-24 object-cover shadow rounded"
                key={photoUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditListing;

const ActionBtns = ({ listing, setFlashMessage, gap = false }) => {
  return (
    <div className={`flex items-center gap-2 ${gap && "mb-4"}`}>
      <button
        type="submit"
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Atualizar Imóvel
      </button>
      <HashLink
        onClick={() => updateListingDetails(listing.id, setFlashMessage)}
        className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Atualizar informação - site KW
      </HashLink>
      <HashLink
        to={`/buy/${listing.slug}`}
        className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Ver Imóvel
      </HashLink>
    </div>
  );
};
