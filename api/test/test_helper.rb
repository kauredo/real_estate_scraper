# frozen_string_literal: true

require 'simplecov'
SimpleCov.start :rails

require_relative '../config/environment'
require 'rails/test_help'
require_relative 'helpers/controller_test_helper'

module ActiveSupport
  class TestCase
    include ActiveRecord::TestFixtures
    include ActiveRecord::TestFixtures::ClassMethods

    # Run tests in parallel with specified workers
    # parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Bullet integration for N+1 query detection
    setup do
      Bullet.start_request if Bullet.enable?
    end

    teardown do
      if Bullet.enable?
        if Bullet.notification?
          # Output detailed information about the N+1 query
          puts "\n#{'=' * 80}"
          puts 'N+1 Query Detected!'
          puts '=' * 80
          # Bullet.warnings can be a hash or array, handle both
          warnings = Bullet.warnings
          if warnings.is_a?(Hash)
            warnings.each do |key, value|
              puts "#{key}:"
              Array(value).each { |v| puts "  #{v}" }
            end
          else
            Array(warnings).each { |w| puts w }
          end
          puts "#{'=' * 80}\n"
        end
        Bullet.perform_out_of_channel_notifications if Bullet.notification?
        Bullet.end_request
      end
    end

    # Add more helper methods to be used by all tests here...
  end
end

# Include ControllerTestHelper in ActionDispatch::IntegrationTest
module ActionDispatch
  class IntegrationTest
    include ControllerTestHelper
  end
end
