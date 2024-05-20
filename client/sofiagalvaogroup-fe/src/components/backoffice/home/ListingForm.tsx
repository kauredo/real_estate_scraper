import { useState } from "react";
import { createListing } from "../../../utils/setters";

export default function ListingForm() {
  const [url, setUrl] = useState("");

  const handleSubmit = event => {
    event.preventDefault();

    createListing({ url });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field mb-4 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="URL do imóvel"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="shadow appearance-none border rounded w-full sm:w-2/3 py-2 px-3 ml-6 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Procurar
        </button>
      </div>
    </form>
  );
}
