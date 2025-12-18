import { ReactNode } from "react";

interface Column<T = unknown> {
  key: string;
  label: string;
  width?: string;
  render?: (value: unknown, row: T) => ReactNode;
}

interface AdminTableProps<T = unknown> {
  columns: Column<T>[];
  data: T[];
  keyField?: string;
}

const AdminTable = <
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  columns,
  data,
  keyField = "id",
}: AdminTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            {columns.map((column) => (
              <th
                key={column.key}
                className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={(row[keyField] as string | number) || index}
              className={
                index % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-900"
              }
            >
              {columns.map((column) => (
                <td
                  key={`${row[keyField]}-${column.key}`}
                  className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-gray-200"
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : (row[column.key] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
