import { useState } from "react";
import {
  adminCreateListing,
  adminFetchListingComplex,
} from "../../services/api";

const AdminListingsManagement = () => {
  const [listingUrl, setListingUrl] = useState("");
  const [complexUrl, setComplexUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleListingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!listingUrl.startsWith("https://www.kwportugal.pt/")) {
      setMessage({
        text: "A URL deve começar com https://www.kwportugal.pt/",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      await adminCreateListing({ url: listingUrl });

      setMessage({
        text: "Imóvel adicionado à fila de processamento. Os dados serão atualizados em breve.",
        type: "success",
      });
      setListingUrl("");
    } catch (_error) {
      setMessage({
        text: "Erro ao adicionar imóvel",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplexSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!complexUrl.startsWith("https://www.kwportugal.pt/")) {
      setMessage({
        text: "A URL deve começar com https://www.kwportugal.pt/",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      await adminFetchListingComplex({ url: complexUrl });

      setMessage({
        text: "Empreendimento adicionado à fila de processamento. Os dados serão atualizados em breve.",
        type: "success",
      });
      setComplexUrl("");
    } catch (_error) {
      setMessage({
        text: "Erro ao adicionar empreendimento",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-dark dark:text-light border-b pb-2">
        Gestão de Imóveis
      </h1>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listings Section */}
        <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
            Links de Imóveis
          </h2>
          <p className="text-gray-500 dark:text-light mb-6">
            Nota: este campo pode ser usado para adicionar imóveis de colegas,
            ou para ir buscar a informação mais recente de qualquer imóvel já na
            plataforma.
          </p>

          <form onSubmit={handleListingSubmit}>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                placeholder="url"
                className="flex-1 bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark px-4 py-2 rounded"
              >
                {loading ? "A processar..." : "Adicionar à Fila"}
              </button>
            </div>
          </form>
        </div>

        {/* Complexes Section */}
        <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
            Links de Empreendimentos
          </h2>
          <p className="text-gray-500 dark:text-light mb-6">
            Nota: este campo pode ser usado para adicionar Empreendimentos da
            Sofia ou de colegas.
          </p>

          <form onSubmit={handleComplexSubmit}>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={complexUrl}
                onChange={(e) => setComplexUrl(e.target.value)}
                placeholder="url"
                className="flex-1 bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark px-4 py-2 rounded"
              >
                {loading ? "A processar..." : "Adicionar à Fila"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminListingsManagement;
