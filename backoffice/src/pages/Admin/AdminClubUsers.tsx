import { useState } from "react";
import { adminExportClubUsers } from "../../services/api";

interface ClubUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  [key: string]: string | number;
}

interface AdminClubUsersProps {
  clubUsers?: ClubUser[];
}

const AdminClubUsers = ({ clubUsers = [] }: AdminClubUsersProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleExportCSV = async () => {
    try {
      setLoading(true);

      const response = await adminExportClubUsers();

      // Create a blob from the response data
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);

      // Create a link and trigger download
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "club_users.csv";
      document.body.appendChild(a);
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessage({ text: "Exportação concluída!", type: "success" });
    } catch (error) {
      console.error("Error exporting CSV:", error);
      setMessage({ text: "Erro ao exportar CSV", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-dark dark:text-light border-b pb-2">
        Definições do Clube SGG
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

      <div className="space-y-6">
        <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-dark dark:text-light">
              Membros
            </h2>
            <button
              onClick={handleExportCSV}
              disabled={loading}
              className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark px-4 py-2 rounded flex items-center gap-2"
            >
              <i className="fas fa-file-export"></i>
              <span>Exportar CSV</span>
            </button>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            <ul className="space-y-2">
              {clubUsers.map((user) => (
                <li
                  key={user.id}
                  className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.phone}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        user.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </div>
                </li>
              ))}
              {clubUsers.length === 0 && (
                <li className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
                  Nenhum membro encontrado
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminClubUsers;
