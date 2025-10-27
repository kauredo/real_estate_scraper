# frozen_string_literal: true

# Base mailer class for all tenant-specific emails
# Automatically configures from/reply-to addresses based on Current.tenant
# Includes URL helpers for generating frontend links
class TenantMailer < ApplicationMailer
  helper MailerUrlHelper
  layout 'tenant_mailer'

  default from: -> { tenant_from_email },
          reply_to: -> { tenant_reply_to_email }

  private

  def tenant
    @tenant ||= Current.tenant
  end

  def tenant_from_email
    tenant&.from_email || ENV.fetch('DEFAULT_FROM_EMAIL', 'noreply@example.com')
  end

  def tenant_reply_to_email
    tenant&.reply_to_email || tenant_from_email
  end
end
