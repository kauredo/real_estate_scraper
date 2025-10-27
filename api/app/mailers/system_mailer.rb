# frozen_string_literal: true

# Base mailer class for system/admin emails
# These emails are not tenant-specific and use system email addresses
class SystemMailer < ApplicationMailer
  layout 'system_mailer'

  default from: -> { ENV.fetch('SYSTEM_FROM_EMAIL', 'system@example.com') },
          reply_to: -> { ENV.fetch('SYSTEM_REPLY_TO_EMAIL', 'admin@example.com') }
end
