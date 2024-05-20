import { useEffect, useState } from "react";
import { find_all_backoffice_listings } from "../../../utils/getters";
import Listings from "../../listing/Listings";
import { updateAllListings } from "../../../utils/setters";
import { useFlashMessage } from "../../../contexts/FlashMessageContext";

const BackofficeListings = () => {
  // Assuming you have a way to fetch or manage the listings data here
  const [selectedOrder, setSelectedOrder] = useState("order");
  const [listings, setListings] = useState([]);
  const { setFlashMessage } = useFlashMessage();

  const handleOrderChange = event => {
    setSelectedOrder(event.target.value);
    // You would typically make an API call here to fetch new listings based on the selected order
  };

  const updateListingsButton = e => {
    e.preventDefault();

    updateAllListings(setFlashMessage);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tempListings = await find_all_backoffice_listings(selectedOrder);

      return { tempListings };
    };

    fetchData().then(data => {
      setListings(data.tempListings);
    });
  }, [selectedOrder]);

  return (
    <div className="container mx-auto flex flex-col sm:flex-row px-4 flex-wrap">
      <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap">
          {/* Form for updating all backoffice listings */}
          <form onSubmit={updateListingsButton} method="post" className="my-6">
            <button
              type="submit"
              className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Buscar os imóveis em falta ao site KW
            </button>
          </form>

          {/* Form for selecting order */}
          <form onSubmit={e => e.preventDefault()}>
            <select
              value={selectedOrder}
              onChange={handleOrderChange}
              className="block w-full p-2 border rounded focus:border-blue-500"
            >
              <option value="order">Ordem normal</option>
              <option value="recent">Mais recentes</option>
            </select>
          </form>
        </div>

        <h2 className="text-2xl font-bold leading-7 text-black text-center sm:text-3xl">
          Imóveis
        </h2>
        <p className="text-center text-gray-600 max-w-none">
          Total {listings?.length} imóveis
        </p>
        <Listings listings={listings} backoffice={true} />
      </div>
    </div>
  );
};

export default BackofficeListings;
