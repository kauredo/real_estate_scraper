# frozen_string_literal: true

module ControllerTestHelper
  # Set up tenant for API requests
  def setup_tenant(tenant = tenants(:one))
    Current.tenant = tenant
    @tenant = tenant
  end

  # Generate JWT token for admin authentication
  def generate_admin_token(admin)
    JsonWebToken.encode({ admin_id: admin.id })
  end

  # Set authorization header for admin requests
  def auth_headers(admin)
    {
      'Authorization' => "Bearer #{generate_admin_token(admin)}",
      'X-Tenant-Filter' => admin.tenant_id.to_s
    }
  end

  # Set API key header for public requests
  def api_key_headers(tenant = nil)
    tenant ||= @tenant || tenants(:one)
    {
      'X-API-Key' => tenant.api_key
    }
  end

  # Helper to make authenticated GET request
  def get_as_admin(action, admin, params: {}, headers: {})
    get action, params:, headers: auth_headers(admin).merge(headers)
  end

  # Helper to make authenticated POST request
  def post_as_admin(action, admin, params: {}, headers: {})
    post action, params:, headers: auth_headers(admin).merge(headers)
  end

  # Helper to make authenticated PATCH request
  def patch_as_admin(action, admin, params: {}, headers: {})
    patch action, params:, headers: auth_headers(admin).merge(headers)
  end

  # Helper to make authenticated DELETE request
  def delete_as_admin(action, admin, params: {}, headers: {})
    delete action, params:, headers: auth_headers(admin).merge(headers)
  end

  # Helper to make API key authenticated requests
  def get_with_api_key(action, params: {}, headers: {}, tenant: nil)
    get action, params:, headers: api_key_headers(tenant).merge(headers)
  end
end
