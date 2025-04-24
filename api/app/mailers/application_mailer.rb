# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "Sofia Galvão Group <#{ENV['MAILER_FROM']}>"
  default reply_to: "Sofia Galvão Group <#{ENV['MAILER_FROM']}>"
  layout 'mailer'
end
