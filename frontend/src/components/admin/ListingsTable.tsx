import React, { useState, useEffect } from "react";
import { adminGetListings, adminDeleteListing } from "../../services/api";
import { Listing } from "../../utils/interfaces";

interface ListingsTableProps {
  onEdit?: (listing: Listing) => void;
  onView?: (listing: Listing) => void;
}

const ListingsTable: React.FC<ListingsTableProps> = ({ onEdit, onView }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 25,
  });

  const fetchListings = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetListings({ page, per_page: 25 });
      setListings(response.data.listings);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar os imóveis");
      console.error("Error fetching listings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja eliminar este imóvel?")) {
      return;
    }

    try {
      await adminDeleteListing(id);
      await fetchListings(pagination.current_page);
    } catch (err) {
      setError("Erro ao eliminar o imóvel");
      console.error("Error deleting listing:", err);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchListings(newPage);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">A carregar imóveis...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestão de Imóveis</h2>
        <div className="text-sm text-gray-600">
          {pagination.total_count} imóveis no total
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Empreendimento
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listings.map(listing => (
              <tr key={listing.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {listing.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {listing.title}
                  </div>
                  <div className="text-sm text-gray-500">{listing.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatPrice(listing.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      listing.status === "recent"
                        ? "bg-green-100 text-green-800"
                        : listing.status === "sold"
                        ? "bg-red-100 text-red-800"
                        : listing.status === "rented"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {listing.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {listing.listing_complex_id || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {onView && (
                    <button
                      onClick={() => onView(listing)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Ver
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(listing)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Editar
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>

          <span className="px-3 py-1">
            Página {pagination.current_page} de {pagination.total_pages}
          </span>

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.total_pages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingsTable;
