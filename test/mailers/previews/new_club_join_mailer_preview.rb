# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/new_club_join_mailer
class NewClubJoinMailerPreview < ActionMailer::Preview
  def new_join_request
    params = {
      name: 'Ana Ferreira',
      email: 'ana.ferreira@example.com',
      phone: '+351 965 432 109'
    }
    NewClubJoinMailer.with(params).new_join_request
  end

  def new_join_request_international
    params = {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+44 7700 900123'
    }
    NewClubJoinMailer.with(params).new_join_request
  end

  def new_join_request_business
    params = {
      name: 'Miguel Santos',
      email: 'miguel.santos@empresa.pt',
      phone: '+351 910 000 000'
    }
    NewClubJoinMailer.with(params).new_join_request
  end
end
