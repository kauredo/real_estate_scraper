import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  adminGetTestimonials,
  adminDeleteTestimonial,
  adminCreateTestimonial,
  adminUpdateTestimonial,
} from "../../services/api";
import { Testimonial } from "../../utils/interfaces";
import {
  Button,
  Input,
  Textarea,
  Pagination,
  LoadingSpinner,
} from "../admin/ui";

const TestimonialsManagement: React.FC = () => {
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    text: "",
  });
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 25,
  });

  const fetchTestimonials = async (page = 1) => {
    try {
      setLoading(true);
      const response = await adminGetTestimonials({ page, per_page: 25 });
      setTestimonials(response.data.testimonials);
      setPagination(response.data.pagination);
      setError(null);
    } catch (err) {
      setError(t("admin.testimonials.errorLoading"));
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm(t("admin.confirmDelete"))) {
      return;
    }

    try {
      await adminDeleteTestimonial(id);
      await fetchTestimonials(pagination.current_page);
    } catch (err) {
      setError(t("admin.testimonials.errorDeleting"));
      console.error("Error deleting testimonial:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTestimonial) {
        await adminUpdateTestimonial(editingTestimonial.id, formData);
      } else {
        await adminCreateTestimonial(formData);
      }

      setShowForm(false);
      setEditingTestimonial(null);
      setFormData({ name: "", text: "" });
      await fetchTestimonials(pagination.current_page);
    } catch (err) {
      setError(t("admin.testimonials.errorSaving"));
      console.error("Error saving testimonial:", err);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      text: testimonial.text,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTestimonial(null);
    setFormData({ name: "", text: "" });
  };

  const handlePageChange = (newPage: number) => {
    fetchTestimonials(newPage);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {t("admin.testimonials.managementTitle")}
        </h2>
        <Button onClick={() => setShowForm(true)}>
          {t("admin.testimonials.new")}
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <div className="bg-white p-6 border rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">
            {editingTestimonial
              ? t("admin.testimonials.edit")
              : t("admin.testimonials.new")}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              id="name"
              label={t("admin.testimonials.form.name")}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <Textarea
              id="text"
              label={t("admin.testimonials.form.testimonial")}
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              required
              rows={4}
            />

            <div className="flex space-x-4">
              <Button type="submit" className="bg-green-500 hover:bg-green-700">
                {editingTestimonial
                  ? t("admin.testimonials.form.update")
                  : t("admin.testimonials.form.create")}
              </Button>
              <Button type="button" onClick={handleCancel} variant="secondary">
                {t("admin.testimonials.form.cancel")}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium">
            {t("admin.testimonials.totalCount", {
              count: pagination.total_count,
            })}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="mt-2 text-gray-600">{testimonial.text}</p>
                </div>
                <div className="ml-4 space-x-2">
                  <Button
                    onClick={() => handleEdit(testimonial)}
                    variant="link"
                    size="sm"
                    className="text-blue-600 hover:text-blue-900"
                  >
                    {t("common.edit")}
                  </Button>
                  <Button
                    onClick={() => handleDelete(testimonial.id)}
                    variant="link"
                    size="sm"
                    className="text-red-600 hover:text-red-900"
                  >
                    {t("common.delete")}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <Pagination
          currentPage={pagination.current_page}
          totalPages={pagination.total_pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default TestimonialsManagement;
