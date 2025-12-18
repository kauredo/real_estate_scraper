import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Testimonial } from "../../utils/interfaces";
import { adminGetTestimonials } from "../../services/api";
import {
  LoadingSpinner,
  AdminPageHeader,
  AdminTable,
  Pagination,
  EmptyState,
} from "../../components/admin/ui";

interface PaginationState {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
}

const AdminTestimonialsPage = () => {
  const { t } = useTranslation();
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

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const columns = [
    {
      key: "id",
      label: t("admin.testimonials.table.id"),
      width: "w-20",
    },
    {
      key: "name",
      label: t("admin.testimonials.table.name"),
      width: "w-1/4",
    },
    {
      key: "text",
      label: t("admin.testimonials.table.testimonial"),
      render: (value: unknown) => {
        const text = value as string;
        return (
          <div className="max-w-xs truncate" title={text}>
            {text}
          </div>
        );
      },
    },
    {
      key: "actions",
      label: t("admin.testimonials.table.actions"),
      width: "w-48",
      render: (_: unknown, row: unknown) => {
        const testimonial = row as Testimonial;
        return (
          <div className="flex flex-wrap gap-2">
            <Link
              to={`/testimonials/${testimonial.id}`}
              className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 underline"
            >
              {t("common.view")}
            </Link>
            <Link
              to={`/testimonials/${testimonial.id}/edit`}
              className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              {t("common.edit")}
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full shadow-md rounded px-2 sm:px-8 py-4 mt-4 relative">
      <AdminPageHeader
        title={t("admin.testimonials.title")}
        count={pagination.total_count}
        countLabel={t("admin.testimonials.totalCount", {
          count: pagination.total_count,
        })}
        actionButton={{
          label: t("admin.testimonials.new"),
          href: "/testimonials/new",
        }}
      />

      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={fetchTestimonials}
        className="my-6"
      />

      {testimonials.length > 0 ? (
        <AdminTable
          columns={columns}
          data={testimonials as unknown as Record<string, unknown>[]}
        />
      ) : (
        <EmptyState message={t("admin.testimonials.empty")} />
      )}

      <Pagination
        currentPage={pagination.current_page}
        totalPages={pagination.total_pages}
        onPageChange={fetchTestimonials}
        className="mt-6"
      />
    </div>
  );
};

export default AdminTestimonialsPage;
