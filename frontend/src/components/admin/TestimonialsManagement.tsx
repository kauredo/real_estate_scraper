import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  adminGetTestimonials,
  adminDeleteTestimonial,
  adminCreateTestimonial,
  adminUpdateTestimonial,
} from "../../services/api";
import { Testimonial } from "../../utils/interfaces";

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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">{t("admin.testimonials.loading")}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {t("admin.testimonials.managementTitle")}
        </h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {t("admin.testimonials.new")}
        </button>
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
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {t("admin.testimonials.form.name")}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                {t("admin.testimonials.form.testimonial")}
              </label>
              <textarea
                id="text"
                value={formData.text}
                onChange={e =>
                  setFormData({ ...formData, text: e.target.value })
                }
                required
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {editingTestimonial
                  ? t("admin.testimonials.form.update")
                  : t("admin.testimonials.form.create")}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                {t("admin.testimonials.form.cancel")}
              </button>
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
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="mt-2 text-gray-600">{testimonial.text}</p>
                </div>
                <div className="ml-4 space-x-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="text-blue-600 hover:text-blue-900 text-sm"
                  >
                    {t("common.edit")}
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    {t("common.delete")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={pagination.current_page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("pagination.previous")}
          </button>

          <span className="px-3 py-1">
            {t("pagination.page", {
              current: pagination.current_page,
              total: pagination.total_pages,
            })}
          </span>

          <button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={pagination.current_page === pagination.total_pages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("pagination.next")}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagement;
