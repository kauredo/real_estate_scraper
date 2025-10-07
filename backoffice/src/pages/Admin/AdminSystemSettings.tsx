import React, { useState } from "react";
import {
  adminCreateVariable,
  adminUpdateVariable,
  adminDeleteVariable,
} from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminSystemSettings = ({ variables = [], subs = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    icon: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariableSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.value || !formData.icon) {
      setMessage({ text: "Todos os campos são obrigatórios", type: "error" });
      return;
    }

    try {
      setLoading(true);
      await adminCreateVariable(formData);

      setMessage({ text: "Variável criada com sucesso!", type: "success" });
      setFormData({ name: "", value: "", icon: "" });

      // Refresh the page to show the new variable
      window.location.reload();
    } catch (error) {
      setMessage({ text: "Erro ao criar variável", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleVariableUpdate = async (id, updatedVariable) => {
    try {
      setLoading(true);
      await adminUpdateVariable(id, updatedVariable);
      setMessage({ text: "Variável atualizada com sucesso!", type: "success" });

      // Refresh the page to show the updated variable
      window.location.reload();
    } catch (error) {
      setMessage({ text: "Erro ao atualizar variável", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleVariableDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta variável?")) {
      return;
    }

    try {
      setLoading(true);
      await adminDeleteVariable(id);
      setMessage({ text: "Variável excluída com sucesso!", type: "success" });

      // Refresh the page to show the updated list
      window.location.reload();
    } catch (error) {
      setMessage({ text: "Erro ao excluir variável", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-dark dark:text-light border-b pb-2">
        Configurações do Sistema
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
        {/* Variables Section */}
        <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
            Variáveis do Sistema
          </h2>
          <p className="text-gray-500 dark:text-light mb-6">
            Nota: copiar ícones do site{" "}
            <a
              className="text-beige-default dark:text-beige-medium underline"
              href="https://fontawesome.com/v5/search?m=free"
              target="_blank"
              rel="noopener noreferrer"
            >
              fontawesome.com/v5
            </a>
          </p>

          <div className="space-y-6">
            {variables.map((variable) => (
              <div
                key={variable.id}
                className="flex flex-wrap items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <input
                  type="text"
                  defaultValue={variable.name}
                  onChange={(e) => (variable.name = e.target.value)}
                  className="flex-1 min-w-[150px] bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
                />
                <input
                  type="text"
                  defaultValue={variable.value}
                  onChange={(e) => (variable.value = e.target.value)}
                  className="flex-1 min-w-[150px] bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
                />
                <input
                  type="text"
                  defaultValue={variable.icon}
                  onChange={(e) => (variable.icon = e.target.value)}
                  className="flex-1 min-w-[150px] bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVariableUpdate(variable.id, variable)}
                    disabled={loading}
                    className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark px-4 py-2 rounded"
                  >
                    Atualizar
                  </button>
                  <button
                    onClick={() => handleVariableDelete(variable.id)}
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-700 text-white dark:text-dark p-2 rounded"
                  >
                    <FontAwesomeIcon icon="trash-alt" />
                  </button>
                </div>
              </div>
            ))}

            <form
              onSubmit={handleVariableSubmit}
              className="mt-6 pt-6 border-t"
            >
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="variável"
                  className="flex-1 min-w-[150px] bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
                />
                <input
                  type="text"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="valor"
                  className="flex-1 min-w-[150px] bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
                />
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="ícone"
                  className="flex-1 min-w-[150px] bg-gray-50 dark:bg-light border rounded py-2 px-3 text-gray-700"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-beige-default hover:bg-beige-medium text-white dark:text-dark px-4 py-2 rounded"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
              Subscrições Newsletter
            </h2>
            <div className="max-h-[300px] overflow-y-auto">
              <ul className="space-y-2">
                {subs.map((sub) => (
                  <li
                    key={sub.id}
                    className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <span className="font-medium">
                      {sub.user.first_name} {sub.user.last_name}:
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      {sub.user.email}
                    </span>
                  </li>
                ))}
                {subs.length === 0 && (
                  <li className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
                    Nenhuma subscrição encontrada
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminSystemSettings;
