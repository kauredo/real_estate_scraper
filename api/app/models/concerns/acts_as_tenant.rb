# frozen_string_literal: true

# Concern for models that belong to a tenant
# Automatically scopes all queries to the current tenant
module ActsAsTenant
  extend ActiveSupport::Concern

  included do
    belongs_to :tenant

    # Automatically scope all queries to current tenant
    default_scope { where(tenant_id: Current.tenant&.id) if Current.tenant }

    # Set tenant_id on create
    before_validation :set_tenant_id, on: :create

    # Prevent changing tenant after creation
    before_update :prevent_tenant_change
  end

  class_methods do
    # Use unscoped to bypass tenant filtering (admin/system tasks only)
    def without_tenant
      unscoped
    end

    # Get records for specific tenant (super admin use)
    def for_tenant(tenant)
      unscoped.where(tenant_id: tenant.id)
    end

    # Get records across all tenants (super admin use)
    def across_all_tenants
      unscoped
    end

    # Execute block with a specific tenant context
    def with_tenant(tenant)
      previous_tenant = Current.tenant
      Current.tenant = tenant
      yield
    ensure
      Current.tenant = previous_tenant
    end
  end

  private

  def set_tenant_id
    self.tenant_id ||= Current.tenant&.id
  end

  def prevent_tenant_change
    return unless tenant_id_changed? && persisted?

    errors.add(:tenant_id, 'cannot be changed')
    throw :abort
  end
end
