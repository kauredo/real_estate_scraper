# frozen_string_literal: true

# Initialize default meta tags.
DEFAULT_META = YAML.load_file(Rails.root.join('config/meta.yml'))
DEFAULT_META_EN = YAML.load_file(Rails.root.join('config/meta_en.yml'))
