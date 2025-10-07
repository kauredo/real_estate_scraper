# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "Sofia Galvão Group <#{ENV.fetch('MAILER_FROM', nil)}>"
  default reply_to: "Sofia Galvão Group <#{ENV.fetch('MAILER_FROM', nil)}>"
  layout 'mailer'
end
