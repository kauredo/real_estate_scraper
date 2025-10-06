class AssignExistingDataToSggTenant < ActiveRecord::Migration[7.1]
  def up
    # Find or create the SGG tenant
    sgg_tenant = Tenant.find_or_create_by!(slug: 'sgg') do |t|
      t.name = 'Sofia Galvao Group'
      t.domain = 'sofiagalvaogroup.com'
      t.contact_email = 'info@sofiagalvaogroup.com'
      t.active = true
      t.features = {
        blog_enabled: true,
        club_enabled: true,
        testimonials_enabled: true,
        newsletter_enabled: true,
        listing_complexes_enabled: true
      }
      t.metadata = {
        timezone: 'Europe/Lisbon',
        currency: 'EUR',
        locale: 'pt'
      }
    end

    puts "✓ SGG Tenant: #{sgg_tenant.name} (ID: #{sgg_tenant.id})"

    # Assign all existing records with NULL tenant_id to SGG tenant
    # Order doesn't matter here since we're just updating tenant_id
    tables_to_update = [
      { table: 'listings', model: 'Listing' },
      { table: 'blog_posts', model: 'BlogPost' },
      { table: 'blog_photos', model: 'BlogPhoto' },
      { table: 'listing_complexes', model: 'ListingComplex' },
      { table: 'photos', model: 'Photo' },
      { table: 'testimonials', model: 'Testimonial' },
      { table: 'variables', model: 'Variable' },
      { table: 'club_stories', model: 'ClubStory' },
      { table: 'club_story_photos', model: 'ClubStoryPhoto' },
      { table: 'club_users', model: 'ClubUser' },
      { table: 'newsletter_subscriptions', model: 'NewsletterSubscription' },
      { table: 'users', model: 'User' }
    ]

    tables_to_update.each do |info|
      count = execute(<<-SQL).cmd_tuples
        UPDATE #{info[:table]}
        SET tenant_id = #{sgg_tenant.id}
        WHERE tenant_id IS NULL
      SQL
      puts "  ✓ Updated #{count} #{info[:model]} records"
    end

    # Update admins separately (only tenant admins, not super admins)
    # Super admins have tenant_id=NULL and should remain that way
    admin_count = execute(<<-SQL).cmd_tuples
      UPDATE admins
      SET tenant_id = #{sgg_tenant.id}
      WHERE tenant_id IS NULL
      AND email NOT LIKE '%superadmin%'
    SQL
    puts "  ✓ Updated #{admin_count} Admin records (super admins excluded)"

    puts "\n✓ Data migration completed!"
    puts "  All existing data has been assigned to SGG tenant (ID: #{sgg_tenant.id})"
  end

  def down
    # Rollback: Set tenant_id back to NULL for SGG tenant's records
    sgg_tenant = Tenant.find_by(slug: 'sgg')
    return unless sgg_tenant

    puts '⚠ Rolling back: Removing tenant assignments for SGG tenant'

    tables_to_update = [
      'listings', 'blog_posts', 'blog_photos', 'listing_complexes',
      'photos', 'testimonials', 'variables', 'club_stories',
      'club_story_photos', 'club_users', 'newsletter_subscriptions', 'users', 'admins'
    ]

    tables_to_update.each do |table|
      execute(<<-SQL)
        UPDATE #{table}
        SET tenant_id = NULL
        WHERE tenant_id = #{sgg_tenant.id}
      SQL
      puts "  ✓ Rolled back #{table}"
    end

    puts '✓ Rollback completed'
  end
end
