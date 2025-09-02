import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Testimonial } from "../../utils/interfaces";
import { adminGetTestimonials } from "../../services/api";

interface PaginationState {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

const AdminTestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current_page: 1,
    per_page: 25,
    total_count: 0,
    total_pages: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetTestimonials({ page });
      setTestimonials(response.data.testimonials);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchTestimonials(page);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-default border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/backoffice/testimonials/new"
          className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Novo Testemunho
        </Link>
      </div>

      <h2 className="text-2xl font-bold leading-7 text-dark dark:text-light text-center sm:text-3xl">
        Testemunhos
      </h2>
      <p className="text-center text-gray-600 max-w-none">
        Total {pagination.total_count} testemunhos
      </p>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center items-center space-x-2 my-6">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="px-3 py-1">
            Página {pagination.current_page} de {pagination.total_pages}
          </span>

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.total_pages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}

      {/* Testimonials Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-light">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-light">
                Nome
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-light">
                Testemunho
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900 dark:text-light">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial, index) => (
              <tr
                key={testimonial.id}
                className={
                  index % 2 === 0
                    ? "bg-white dark:bg-dark"
                    : "bg-gray-50 dark:bg-gray-800"
                }
              >
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 dark:text-light">
                  {testimonial.id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 dark:text-light">
                  {testimonial.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900 dark:text-light">
                  <div className="max-w-xs truncate" title={testimonial.text}>
                    {testimonial.text}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={`/backoffice/testimonials/${testimonial.id}`}
                      className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-1 px-3 rounded text-xs"
                    >
                      Ver
                    </a>
                    <a
                      href={`/backoffice/testimonials/${testimonial.id}/edit`}
                      className="bg-blue-500 hover:bg-blue-700 text-white dark:text-dark font-bold py-1 px-3 rounded text-xs"
                    >
                      Editar
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {testimonials.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-light">
            Nenhum testemunho encontrado.
          </p>
        </div>
      )}

      {/* Bottom Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="px-3 py-1">
            Página {pagination.current_page} de {pagination.total_pages}
          </span>

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.total_pages}
            className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonialsPage;
