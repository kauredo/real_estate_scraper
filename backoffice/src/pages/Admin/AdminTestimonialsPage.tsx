import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Testimonial } from "../../utils/interfaces";
import { adminGetTestimonials } from "../../services/api";
import {
  LoadingSpinner,
  AdminPageHeader,
  AdminTable,
  Pagination,
  EmptyState,
  Button,
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
      render: (value: string) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      ),
    },
    {
      key: "actions",
      label: t("admin.testimonials.table.actions"),
      width: "w-48",
      render: (_: any, testimonial: Testimonial) => (
        <div className="flex flex-wrap gap-2">
          <Button
            as="a"
            href={`/testimonials/${testimonial.id}`}
            variant="link"
            size="sm"
            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            {t("common.view")}
          </Button>
          <Button
            as="a"
            href={`/testimonials/${testimonial.id}/edit`}
            variant="link"
            size="sm"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {t("common.edit")}
          </Button>
        </div>
      ),
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
        <AdminTable columns={columns} data={testimonials} />
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
