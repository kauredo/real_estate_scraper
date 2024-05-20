import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Listing, ListingComplex, Photo } from "../../utils/Interfaces";
import { find_all_backoffice_listings } from "../../../utils/getters";
import LongCard from "../../listing/LongCard";
import {
  deletePhoto,
  updatePhotosListingComplex,
} from "../../../utils/setters";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";

const ComplexForm = ({ handleSubmit, initialValues }) => {
  const [formState, setFormState] = useState<ListingComplex>({
    ...initialValues,
  });
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListingIds, setSelectedListingIds] = useState(
    initialValues.listings.map(listing => listing.id)
  );
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    const fetchData = async () => {
      const tempListings = await find_all_backoffice_listings();

      return { tempListings };
    };

    fetchData().then(data => {
      setListings(data.tempListings);
    });

    return () => {
      formState.photos.forEach(photo => URL.revokeObjectURL(photo.image.url));
    };
  }, []);

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const formData = new FormData();
      Array.from(e.target.files).forEach((file: File, index: number) => {
        // Append the file to the form data as an array of files
        formData.append("photos[image][]", file, file.name);
      });

      const newPhotos = Array.from(e.target.files).map(
        (file: File) =>
          ({
            id: 0,
            image: { url: URL.createObjectURL(file) },
            main: false,
            order: 0,
            listing_complex_id: formState.id,
          } as unknown as Photo)
      );

      setFormState({
        ...formState,
        photos: [...formState.photos, ...newPhotos],
      });

      updatePhotosListingComplex(formState.id, formData, setFlashMessage);
    }
  };

  const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;

    // Determine which photo to update based on the name attribute
    const photoIndex = parseInt(name.split("[")[1].split("]")[0]);
    const photoToUpdate = formState.photos.find(
      photo => photo.id === photoIndex
    );

    // Update the main status or order based on the input type
    if (!photoToUpdate) return;

    if (e.target.type === "checkbox") {
      photoToUpdate.main = checked;
    } else if (e.target.type === "number") {
      photoToUpdate.order = Number(value); // Ensure the value is a number
    }

    // Trigger re-render to reflect the changes
    setFormState({ ...formState });
  };

  const removePhoto = indexToRemove => {
    if (window.confirm("Are you sure you want to remove this photo?")) {
      URL.revokeObjectURL(formState.photos[indexToRemove].image.url);

      setFormState({
        ...formState,
        photos: formState.photos.filter((_, index) => index !== indexToRemove),
      });

      deletePhoto(formState.photos[indexToRemove].id, setFlashMessage);
    }
  };

  const handleCheckboxChange = listingId => {
    setSelectedListingIds(prevSelectedIds => {
      if (prevSelectedIds.includes(listingId)) {
        // If the listing is already selected, remove it
        return prevSelectedIds.filter(id => id !== listingId);
      } else {
        // Otherwise, add it to the selection
        return [...prevSelectedIds, listingId];
      }
    });
    setFormState({
      ...formState,
      listing_ids: selectedListingIds,
    });
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
      {formState.id && (
        <div className="field mb-4 flex flex-col items-center gap-4">
          <label className="sm:w-1/4 w-full">Photos</label>
          <div className="field w-full sm:w-auto">
            <label>Image</label>
            <br />
            <input
              type="file"
              multiple
              name="photos[image][]"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full flex flex-wrap justify-between items-center gap-4">
            {formState.photos.map((photo, index) => (
              <div key={index} className="w-full sm:w-[48%] p-6 border">
                <button onClick={() => removePhoto(index)}>❌</button>
                <img
                  src={photo.image.url}
                  alt={`Uploaded Photo ${index + 1}`}
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                  className="m-auto pb-4"
                />
                <div className="flex gap-2">
                  <label>Main Photo?</label>
                  <input
                    checked={photo.main}
                    type="checkbox"
                    name={`photos[${photo.id}][main]`}
                    onChange={handleChangePhoto}
                  ></input>
                </div>
                <div className="flex gap-2 items-center">
                  <label className="w-1/2 sm:w-3/4">Order on page</label>
                  <br />
                  <input
                    value={photo.order}
                    className="w-1/2 sm:w-1/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name={`photos[${photo.id}][order]`}
                    onChange={handleChangePhoto}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="field mb-4 flex flex-col items-center gap-2 sm:gap-4">
        <label className="sm:w-1/4 w-full">Listings</label>

        <div className="mb-4">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            {listings?.map(listing => (
              <div
                key={listing.id}
                className="flex space-between items-center h-[200px]"
              >
                <span className="w-1/4">
                  <input
                    type="checkbox"
                    checked={selectedListingIds.includes(listing.id)}
                    onChange={() => handleCheckboxChange(listing.id)}
                  />
                </span>
                <div>
                  <LongCard listing={listing} small />
                </div>
              </div>
            ))}
          </div>
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
      {initialValues.id && (
        <HashLink
          to={`/latest/${initialValues.slug}`}
          className="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Ver Empreendimento
        </HashLink>
      )}
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
