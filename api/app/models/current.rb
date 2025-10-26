# frozen_string_literal: true

# Thread-safe storage of current request context
# Used by middleware to set tenant and admin for the duration of the request
class Current < ActiveSupport::CurrentAttributes
  attribute :tenant
  attribute :admin

  def tenant?
    tenant.present?
  end

  def admin?
    admin.present?
  end
end
