# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_10_11_125647) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.boolean "confirmed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "blog_photos", force: :cascade do |t|
    t.text "image"
    t.boolean "main", default: false
    t.bigint "blog_post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blog_post_id"], name: "index_blog_photos_on_blog_post_id"
  end

  create_table "blog_post_translations", force: :cascade do |t|
    t.text "title"
    t.text "text"
    t.string "locale", null: false
    t.bigint "blog_post_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "slug"
    t.index ["blog_post_id", "locale"], name: "index_blog_post_translations_on_blog_post_id_and_locale", unique: true
    t.index ["locale"], name: "index_blog_post_translations_on_locale"
  end

  create_table "blog_posts", force: :cascade do |t|
    t.string "title"
    t.text "text"
    t.boolean "hidden", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "meta_title"
    t.text "meta_description"
    t.string "slug"
    t.index ["slug"], name: "index_blog_posts_on_slug", unique: true
  end

  create_table "data_migrations", primary_key: "version", id: :string, force: :cascade do |t|
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "listing_complex_translations", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "locale", null: false
    t.bigint "listing_complex_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "subtext"
    t.text "final_text"
    t.text "slug"
    t.index ["listing_complex_id", "locale"], name: "index_08ff862f275e86f460eb017836002c84b1ca958b", unique: true
    t.index ["locale"], name: "index_listing_complex_translations_on_locale"
  end

  create_table "listing_complexes", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "video_link"
    t.integer "order"
    t.text "subtext"
    t.text "final_text"
    t.boolean "new_format", default: false
    t.boolean "hidden", default: false
    t.string "slug"
    t.index ["slug"], name: "index_listing_complexes_on_slug", unique: true
  end

  create_table "listing_translations", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "features", default: [], array: true
    t.string "locale", null: false
    t.bigint "listing_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "slug"
    t.datetime "deleted_at"
    t.index ["listing_id", "locale"], name: "index_listing_translations_on_listing_id_and_locale", unique: true
    t.index ["locale"], name: "index_listing_translations_on_locale"
  end

  create_table "listings", force: :cascade do |t|
    t.json "stats"
    t.string "address"
    t.string "features", default: [], array: true
    t.string "title"
    t.string "url"
    t.text "description"
    t.text "photos", default: [], array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "old_status"
    t.bigint "listing_complex_id"
    t.datetime "deleted_at"
    t.integer "order"
    t.datetime "status_changed_at"
    t.integer "status"
    t.string "video_link"
    t.string "slug"
    t.integer "price_cents", default: 0, null: false
    t.integer "kind", default: 0, null: false
    t.integer "objective", default: 0, null: false
    t.string "virtual_tour_url"
    t.index ["deleted_at"], name: "index_listings_on_deleted_at"
    t.index ["listing_complex_id"], name: "index_listings_on_listing_complex_id"
    t.index ["slug"], name: "index_listings_on_slug", unique: true
  end

  create_table "mobility_string_translations", force: :cascade do |t|
    t.string "locale", null: false
    t.string "key", null: false
    t.string "value"
    t.string "translatable_type"
    t.bigint "translatable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["translatable_id", "translatable_type", "key"], name: "index_mobility_string_translations_on_translatable_attribute"
    t.index ["translatable_id", "translatable_type", "locale", "key"], name: "index_mobility_string_translations_on_keys", unique: true
    t.index ["translatable_type", "key", "value", "locale"], name: "index_mobility_string_translations_on_query_keys"
  end

  create_table "mobility_text_translations", force: :cascade do |t|
    t.string "locale", null: false
    t.string "key", null: false
    t.text "value"
    t.string "translatable_type"
    t.bigint "translatable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["translatable_id", "translatable_type", "key"], name: "index_mobility_text_translations_on_translatable_attribute"
    t.index ["translatable_id", "translatable_type", "locale", "key"], name: "index_mobility_text_translations_on_keys", unique: true
  end

  create_table "newsletter_subscriptions", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_newsletter_subscriptions_on_user_id"
  end

  create_table "photos", force: :cascade do |t|
    t.text "image"
    t.boolean "main", default: false
    t.integer "order"
    t.bigint "listing_complex_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["listing_complex_id"], name: "index_photos_on_listing_complex_id"
  end

  create_table "testimonial_translations", force: :cascade do |t|
    t.text "text"
    t.string "locale", null: false
    t.bigint "testimonial_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["locale"], name: "index_testimonial_translations_on_locale"
    t.index ["testimonial_id", "locale"], name: "index_testimonial_translations_on_testimonial_id_and_locale", unique: true
  end

  create_table "testimonials", force: :cascade do |t|
    t.string "name"
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "confirmed_email"
  end

  create_table "variable_translations", force: :cascade do |t|
    t.text "name"
    t.text "value"
    t.string "locale", null: false
    t.bigint "variable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["locale"], name: "index_variable_translations_on_locale"
    t.index ["variable_id", "locale"], name: "index_variable_translations_on_variable_id_and_locale", unique: true
  end

  create_table "variables", force: :cascade do |t|
    t.string "name"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "icon"
  end

  add_foreign_key "blog_post_translations", "blog_posts"
  add_foreign_key "listing_complex_translations", "listing_complexes"
  add_foreign_key "listing_translations", "listings"
  add_foreign_key "newsletter_subscriptions", "users"
  add_foreign_key "testimonial_translations", "testimonials"
  add_foreign_key "variable_translations", "variables"
end
