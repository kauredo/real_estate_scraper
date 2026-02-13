import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  adminCreateVariable,
  adminUpdateVariable,
  adminDeleteVariable,
} from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Variable } from "../../utils/interfaces";
import { ConfirmDialog } from "../../components/admin/ui";

interface NewsletterSubscription {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  created_at?: string;
  [key: string]: unknown;
}

interface AdminSystemSettingsProps {
  variables?: Variable[];
  subs?: NewsletterSubscription[];
}

const AdminSystemSettings = ({
  variables = [],
  subs = [],
}: AdminSystemSettingsProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    icon: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [variableToDelete, setVariableToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariableSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.value || !formData.icon) {
      setMessage({ text: t("backoffice.system_settings.variables.all_fields_required"), type: "error" });
      return;
    }

    try {
      setLoading(true);
      await adminCreateVariable(formData);

      setMessage({ text: t("backoffice.system_settings.variables.create_success"), type: "success" });
      setFormData({ name: "", value: "", icon: "" });

      // Refresh the page to show the new variable
      window.location.reload();
    } catch {
      setMessage({ text: t("backoffice.system_settings.variables.create_error"), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleVariableUpdate = async (
    id: number | undefined,
    updatedVariable: { name: string; value: string; icon: string },
  ) => {
    if (!id) return;
    try {
      setLoading(true);
      await adminUpdateVariable(id, updatedVariable);
      setMessage({ text: t("backoffice.system_settings.variables.update_success"), type: "success" });

      // Refresh the page to show the updated variable
      window.location.reload();
    } catch {
      setMessage({ text: t("backoffice.system_settings.variables.update_error"), type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleVariableDeleteClick = (id: number | undefined) => {
    if (!id) return;
    setVariableToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmVariableDelete = async () => {
    if (!variableToDelete) return;

    try {
      setIsDeleting(true);
      await adminDeleteVariable(variableToDelete);
      setMessage({ text: t("backoffice.system_settings.variables.delete_success"), type: "success" });
      setIsDeleteDialogOpen(false);
      setVariableToDelete(null);

      // Refresh the page to show the updated list
      window.location.reload();
    } catch {
      setMessage({ text: t("backoffice.system_settings.variables.delete_error"), type: "error" });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6 text-dark dark:text-light border-b pb-2">
        {t("backoffice.system_settings.title")}
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
            {t("backoffice.system_settings.variables.title")}
          </h2>
          <p className="text-neutral-500 dark:text-light mb-6">
            {t("backoffice.system_settings.variables.note")}{" "}
            <a
              className="text-primary-600 dark:text-beige-medium underline"
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
                className="flex flex-wrap items-center gap-3 p-2 bg-neutral-50 dark:bg-neutral-800 rounded-lg"
              >
                <input
                  type="text"
                  defaultValue={variable.name}
                  onChange={(e) => (variable.name = e.target.value)}
                  className="flex-1 min-w-[150px] bg-neutral-50 dark:bg-light border rounded py-2 px-3 text-neutral-700"
                />
                <input
                  type="text"
                  defaultValue={variable.value}
                  onChange={(e) => (variable.value = e.target.value)}
                  className="flex-1 min-w-[150px] bg-neutral-50 dark:bg-light border rounded py-2 px-3 text-neutral-700"
                />
                <input
                  type="text"
                  defaultValue={variable.icon}
                  onChange={(e) => (variable.icon = e.target.value)}
                  className="flex-1 min-w-[150px] bg-neutral-50 dark:bg-light border rounded py-2 px-3 text-neutral-700"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVariableUpdate(variable.id, variable)}
                    disabled={loading}
                    className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark px-4 py-2 rounded"
                  >
                    {t("common.update")}
                  </button>
                  <button
                    onClick={() => handleVariableDeleteClick(variable.id)}
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
                  placeholder={t("backoffice.system_settings.variables.placeholder_name")}
                  className="flex-1 min-w-[150px] bg-neutral-50 dark:bg-light border rounded py-2 px-3 text-neutral-700"
                />
                <input
                  type="text"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder={t("backoffice.system_settings.variables.placeholder_value")}
                  className="flex-1 min-w-[150px] bg-neutral-50 dark:bg-light border rounded py-2 px-3 text-neutral-700"
                />
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder={t("backoffice.system_settings.variables.placeholder_icon")}
                  className="flex-1 min-w-[150px] bg-neutral-50 dark:bg-light border rounded py-2 px-3 text-neutral-700"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary-600 hover:bg-primary-700 text-white dark:text-dark px-4 py-2 rounded"
                >
                  {t("common.create")}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-dark rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-dark dark:text-light">
              {t("backoffice.system_settings.newsletter.title")}
            </h2>
            <div className="max-h-[300px] overflow-y-auto">
              <ul className="space-y-2">
                {subs.map((sub) => (
                  <li
                    key={sub.id}
                    className="py-2 px-3 bg-neutral-50 dark:bg-neutral-800 rounded"
                  >
                    <span className="font-medium">
                      {sub.user.first_name} {sub.user.last_name}:
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400 ml-2">
                      {sub.user.email}
                    </span>
                  </li>
                ))}
                {subs.length === 0 && (
                  <li className="py-2 px-3 bg-neutral-50 dark:bg-neutral-800 rounded text-center">
                    {t("backoffice.system_settings.newsletter.empty")}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setVariableToDelete(null);
        }}
        onConfirm={handleConfirmVariableDelete}
        title={t("backoffice.system_settings.variables.delete_title")}
        message={t("backoffice.system_settings.variables.delete_message")}
        confirmLabel={t("common.delete")}
        cancelLabel={t("common.cancel")}
        variant="danger"
        isLoading={isDeleting}
      />
    </section>
  );
};

export default AdminSystemSettings;
