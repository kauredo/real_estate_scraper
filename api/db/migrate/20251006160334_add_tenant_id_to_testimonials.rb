class AddTenantIdToTestimonials < ActiveRecord::Migration[7.1]
  def change
    add_reference :testimonials, :tenant, null: true, foreign_key: true
  end
end
