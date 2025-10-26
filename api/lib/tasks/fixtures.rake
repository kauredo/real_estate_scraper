# frozen_string_literal: true

namespace :fixtures do
  desc 'Looks for bad fixture files'
  task check_format: :environment do
    fixtures_dir = Rails.root.join('test', 'fixtures')
    fixture_files = Pathname.glob("#{fixtures_dir}/**/*.yml")

    fixture_files.each do |file|
      fixture = YAML.load(File.read(file))
      # puts fixture
      fixture.each_pair do |name, entry|
        puts "Bad fixture entry #{name}: #{entry.inspect} in fixture #{file}" unless entry.is_a? Hash
      end
    end
  end

  desc 'create fixtures files from db'
  task create: :environment do
    Rails.application.eager_load!
    models = defined?(AppicationRecord) ? ApplicationRecord.decendants : ActiveRecord::Base.descendants
    c = I18n.with_locale(:en) do
      FileUtils.rm_rf(Dir.glob("#{Rails.root}/test/fixtures/mobility/*"))

      models.map do |model|
        model_name = model.name.pluralize.underscore

        next if (model_name.include?('/') && model_name.exclude?('translations')) || (model_name.split('/').count > 2) || ['application_records'].include?(model_name)

        puts "Creating for #{model.name}"
        if model_name.include?('translations')
          name = model_name.split('/')
          name.pop
          name = name.join('/')

          new_model_name = "#{name}_translations"
          path = "#{Rails.root}/test/fixtures/#{new_model_name}.yml"

          File.open(path, 'w') do |file|
            instances = model.all.to_a.map.with_index(1) do |m, idx|
              attributes = m.attributes.except('_at').merge({
                                                              created_at: Time.zone.now.to_s,
                                                              updated_at: Time.zone.now.to_s
                                                            })
              { idx.humanize => attributes }
            end

            instances.each { |instance| file.write instance.to_yaml.sub!(/---\s?/, "\n") }
          end
        else
          path = "#{Rails.root}/test/fixtures/#{model_name}.yml"

          File.open(path, 'w') do |file|
            instances = model.all.to_a.map.with_index(1) do |m, idx|
              attributes = m.attributes.except('_at').except('password')
              { idx.humanize => attributes }
            end

            instances.each { |instance| file.write instance.to_yaml.sub!(/---\s?/, "\n") }
          end
        end
      end
    end
  end
end
