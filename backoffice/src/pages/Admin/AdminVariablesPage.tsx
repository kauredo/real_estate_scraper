import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  adminGetVariables,
  adminCreateVariable,
  adminUpdateVariable,
  adminDeleteVariable,
} from "../../services/api";
import {
  LoadingSpinner,
  AdminPageHeader,
  AdminTable,
  EmptyState,
  Input,
  Button,
} from "../../components/admin/ui";

interface Variable {
  id: number;
  name: string;
  value: string;
  icon: string;
}

const AdminVariablesPage = () => {
  const { t } = useTranslation();
  const [variables, setVariables] = useState<Variable[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    icon: "",
  });

  const fetchVariables = async () => {
    try {
      setLoading(true);
      const response = await adminGetVariables();
      setVariables(response.data || []);
    } catch (error) {
      console.error("Error fetching variables:", error);
      setVariables([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariables();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.value || !formData.icon) {
      return;
    }

    try {
      setSubmitting(true);
      await adminCreateVariable(formData);
      setFormData({ name: "", value: "", icon: "" });
      fetchVariables();
    } catch (error) {
      console.error("Error creating variable:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (variable: Variable) => {
    try {
      setSubmitting(true);
      await adminUpdateVariable(variable.id, variable);
      fetchVariables();
    } catch (error) {
      console.error("Error updating variable:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("admin.confirmDelete"))) return;

    try {
      setSubmitting(true);
      await adminDeleteVariable(id);
      fetchVariables();
    } catch (error) {
      console.error("Error deleting variable:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const columns = [
    {
      key: "name",
      label: t("admin.variables.name"),
      width: "w-1/4",
      render: (_: any, variable: Variable) => (
        <Input
          type="text"
          defaultValue={variable.name}
          onChange={(e) => (variable.name = e.target.value)}
        />
      ),
    },
    {
      key: "value",
      label: t("admin.variables.value"),
      width: "w-1/3",
      render: (_: any, variable: Variable) => (
        <Input
          type="text"
          defaultValue={variable.value}
          onChange={(e) => (variable.value = e.target.value)}
        />
      ),
    },
    {
      key: "icon",
      label: t("admin.variables.icon"),
      width: "w-1/4",
      render: (_: any, variable: Variable) => (
        <Input
          type="text"
          defaultValue={variable.icon}
          onChange={(e) => (variable.icon = e.target.value)}
        />
      ),
    },
    {
      key: "actions",
      label: t("common.actions"),
      width: "w-48",
      render: (_: any, variable: Variable) => (
        <div className="flex gap-2">
          <Button
            onClick={() => handleUpdate(variable)}
            disabled={submitting}
            variant="link"
            size="sm"
          >
            {t("common.update")}
          </Button>
          <Button
            onClick={() => handleDelete(variable.id)}
            disabled={submitting}
            variant="link"
            size="sm"
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            {t("common.delete")}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
      <AdminPageHeader
        title={t("admin.variables.title")}
        count={variables.length}
        countLabel={t("admin.variables.totalCount", {
          count: variables.length,
        })}
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
          {t("admin.variables.note")}{" "}
          <a
            className="text-primary-600 dark:text-primary-400 underline"
            href="https://fontawesome.com/v5/search?m=free"
            target="_blank"
            rel="noopener noreferrer"
          >
            fontawesome.com/v5
          </a>
        </p>
      </AdminPageHeader>

      {/* Create Form */}
      <form
        onSubmit={handleCreate}
        className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
      >
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {t("admin.variables.create_new")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t("admin.variables.name_placeholder")}
            required
          />
          <Input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            placeholder={t("admin.variables.value_placeholder")}
            required
          />
          <Input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleInputChange}
            placeholder={t("admin.variables.icon_placeholder")}
            required
          />
          <Button type="submit" isLoading={submitting}>
            {t("common.create")}
          </Button>
        </div>
      </form>

      {/* Variables Table */}
      {variables.length > 0 ? (
        <AdminTable columns={columns} data={variables} />
      ) : (
        <EmptyState message={t("admin.variables.empty")} />
      )}
    </div>
  );
};

export default AdminVariablesPage;
