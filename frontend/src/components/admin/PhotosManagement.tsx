import React, { useState, useEffect } from "react";
import { adminGetPhotos, adminDeletePhoto } from "../../services/api";
import { Photo } from "../../utils/interfaces";

const PhotosManagement: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 25,
  });

  const fetchPhotos = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetPhotos({ page, per_page: 25 });
      setPhotos(response.data.photos);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar as fotos");
      console.error("Error fetching photos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja eliminar esta foto?")) {
      return;
    }

    try {
      await adminDeletePhoto(id);
      await fetchPhotos(pagination.current_page);
    } catch (err) {
      setError("Erro ao eliminar a foto");
      console.error("Error deleting photo:", err);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchPhotos(newPage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">A carregar fotos...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestão de Fotos</h2>
        <div className="text-sm text-gray-600">
          {pagination.total_count} fotos no total
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map(photo => (
          <div
            key={photo.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
              <img
                src={photo.image.url}
                alt={`Photo ${photo.id}`}
                className="h-48 w-full object-cover object-center group-hover:opacity-75"
              />
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    ID: {photo.id}
                  </p>
                  <p className="text-xs text-gray-500">Ordem: {photo.order}</p>
                </div>
                {photo.main && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Principal
                  </span>
                )}
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-600">
                  Empreendimento ID: {photo.listing_complex_id}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma foto encontrada</p>
        </div>
      )}

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

export default PhotosManagement;
