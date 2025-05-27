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

ActiveRecord::Schema[7.1].define(version: 2025_05_05_144456) do
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
    t.text "small_description"
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
    t.string "video_link"
    t.text "small_description"
    t.index ["slug"], name: "index_blog_posts_on_slug", unique: true
  end

  create_table "club_stories", force: :cascade do |t|
    t.string "title"
    t.text "text"
    t.boolean "hidden"
    t.text "meta_title"
    t.text "meta_description"
    t.string "slug"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "video_link"
    t.text "small_description"
    t.index ["slug"], name: "index_club_stories_on_slug", unique: true
  end

  create_table "club_story_photos", force: :cascade do |t|
    t.text "image"
    t.boolean "main", default: false
    t.bigint "club_story_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["club_story_id"], name: "index_club_story_photos_on_club_story_id"
  end

  create_table "club_story_translations", force: :cascade do |t|
    t.text "title"
    t.text "text"
    t.text "slug"
    t.string "locale", null: false
    t.bigint "club_story_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "small_description"
    t.index ["club_story_id", "locale"], name: "index_club_story_translations_on_club_story_id_and_locale", unique: true
    t.index ["locale"], name: "index_club_story_translations_on_locale"
  end

  create_table "club_users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.integer "status"
    t.boolean "terms_accepted"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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

  create_table "good_job_batches", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.jsonb "serialized_properties"
    t.text "on_finish"
    t.text "on_success"
    t.text "on_discard"
    t.text "callback_queue_name"
    t.integer "callback_priority"
    t.datetime "enqueued_at"
    t.datetime "discarded_at"
    t.datetime "finished_at"
    t.datetime "jobs_finished_at"
  end

  create_table "good_job_executions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "active_job_id", null: false
    t.text "job_class"
    t.text "queue_name"
    t.jsonb "serialized_params"
    t.datetime "scheduled_at"
    t.datetime "finished_at"
    t.text "error"
    t.integer "error_event", limit: 2
    t.text "error_backtrace", array: true
    t.uuid "process_id"
    t.interval "duration"
    t.index ["active_job_id", "created_at"], name: "index_good_job_executions_on_active_job_id_and_created_at"
    t.index ["process_id", "created_at"], name: "index_good_job_executions_on_process_id_and_created_at"
  end

  create_table "good_job_processes", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.jsonb "state"
    t.integer "lock_type", limit: 2
  end

  create_table "good_job_settings", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "key"
    t.jsonb "value"
    t.index ["key"], name: "index_good_job_settings_on_key", unique: true
  end

  create_table "good_jobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "queue_name"
    t.integer "priority"
    t.jsonb "serialized_params"
    t.datetime "scheduled_at"
    t.datetime "performed_at"
    t.datetime "finished_at"
    t.text "error"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.uuid "active_job_id"
    t.text "concurrency_key"
    t.text "cron_key"
    t.uuid "retried_good_job_id"
    t.datetime "cron_at"
    t.uuid "batch_id"
    t.uuid "batch_callback_id"
    t.boolean "is_discrete"
    t.integer "executions_count"
    t.text "job_class"
    t.integer "error_event", limit: 2
    t.text "labels", array: true
    t.uuid "locked_by_id"
    t.datetime "locked_at"
    t.index ["active_job_id", "created_at"], name: "index_good_jobs_on_active_job_id_and_created_at"
    t.index ["batch_callback_id"], name: "index_good_jobs_on_batch_callback_id", where: "(batch_callback_id IS NOT NULL)"
    t.index ["batch_id"], name: "index_good_jobs_on_batch_id", where: "(batch_id IS NOT NULL)"
    t.index ["concurrency_key"], name: "index_good_jobs_on_concurrency_key_when_unfinished", where: "(finished_at IS NULL)"
    t.index ["cron_key", "created_at"], name: "index_good_jobs_on_cron_key_and_created_at_cond", where: "(cron_key IS NOT NULL)"
    t.index ["cron_key", "cron_at"], name: "index_good_jobs_on_cron_key_and_cron_at_cond", unique: true, where: "(cron_key IS NOT NULL)"
    t.index ["finished_at"], name: "index_good_jobs_jobs_on_finished_at", where: "((retried_good_job_id IS NULL) AND (finished_at IS NOT NULL))"
    t.index ["labels"], name: "index_good_jobs_on_labels", where: "(labels IS NOT NULL)", using: :gin
    t.index ["locked_by_id"], name: "index_good_jobs_on_locked_by_id", where: "(locked_by_id IS NOT NULL)"
    t.index ["priority", "created_at"], name: "index_good_job_jobs_for_candidate_lookup", where: "(finished_at IS NULL)"
    t.index ["priority", "created_at"], name: "index_good_jobs_jobs_on_priority_created_at_when_unfinished", order: { priority: "DESC NULLS LAST" }, where: "(finished_at IS NULL)"
    t.index ["priority", "scheduled_at"], name: "index_good_jobs_on_priority_scheduled_at_unfinished_unlocked", where: "((finished_at IS NULL) AND (locked_by_id IS NULL))"
    t.index ["queue_name", "scheduled_at"], name: "index_good_jobs_on_queue_name_and_scheduled_at", where: "(finished_at IS NULL)"
    t.index ["scheduled_at"], name: "index_good_jobs_on_scheduled_at", where: "(finished_at IS NULL)"
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
    t.string "url"
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
    t.string "original_url"
    t.index ["listing_complex_id"], name: "index_photos_on_listing_complex_id"
    t.index ["original_url"], name: "index_photos_on_original_url", unique: true, where: "(original_url IS NOT NULL)"
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
  add_foreign_key "club_story_translations", "club_stories"
  add_foreign_key "listing_complex_translations", "listing_complexes"
  add_foreign_key "listing_translations", "listings"
  add_foreign_key "newsletter_subscriptions", "users"
  add_foreign_key "testimonial_translations", "testimonials"
  add_foreign_key "variable_translations", "variables"
end
