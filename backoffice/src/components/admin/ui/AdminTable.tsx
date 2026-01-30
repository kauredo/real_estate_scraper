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
    <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-sm font-semibold text-neutral-700 dark:text-neutral-200"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
          {data.map((row, index) => (
            <tr
              key={(row[keyField] as string | number) || index}
              className="bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={`${row[keyField]}-${column.key}`}
                  className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300"
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
