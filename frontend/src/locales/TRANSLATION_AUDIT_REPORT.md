# Translation Audit Report

Generated on: 2025-12-18T19:37:26.975Z

## Executive Summary

### Language Parity
- Missing EN files: 0
- Missing PT files: 0
- Missing EN translations: 0
- Missing PT translations: 0

### Code Usage
- Translation keys used in code: 379
- Keys missing from EN locales: 3
- Keys missing from PT locales: 3
- Unused keys in EN locales: 2551
- Unused keys in PT locales: 2551

---

## ⚠️ Translation Keys Used in Code But Missing from Locales

These keys are referenced in your source code but don't exist in the locale files. This will cause runtime errors.

### Missing from English Locales (3 keys)

- `services.for_sellers.list`
  - Used in: pages/ServicesPage.tsx
- `club.stories.subtitle`
  - Used in: pages/ClubStoriesPage.tsx
- `listing.stats`
  - Used in: components/features/listings/AdvancedSearch.tsx

### Missing from Portuguese Locales (3 keys)

- `services.for_sellers.list`
  - Used in: pages/ServicesPage.tsx
- `club.stories.subtitle`
  - Used in: pages/ClubStoriesPage.tsx
- `listing.stats`
  - Used in: components/features/listings/AdvancedSearch.tsx

## 🧹 Unused Translations (Potential Cleanup Candidates)

These translations exist in locale files but aren't found in the source code. They might be safe to remove, but verify they're not used dynamically.

### Unused English Translations (2551 keys)

<details>
<summary>Click to expand list</summary>

- `header`
- `about.history_and_values.content.1_paragraph`
- `history_and_values.content.1_paragraph`
- `about.history_and_values.content.2_paragraph`
- `history_and_values.content.2_paragraph`
- `about.history_and_values.content.3_paragraph`
- `history_and_values.content.3_paragraph`
- `history_and_values.content.first_paragraph`
- `history_and_values.content.second_paragraph`
- `history_and_values.content.third_paragraph`
- `history_and_values.title`
- `kw_luxury.content`
- `kw_luxury.subtitle`
- `kw_luxury.title`
- `kw_partnership.international_network.content`
- `kw_partnership.international_network.title`
- `kw_partnership.national_network.content`
- `kw_partnership.national_network.title`
- `kw_partnership.principles.list`
- `kw_partnership.principles.title`
- `kw_partnership.title`
- `meta_description`
- `about.mission.sub1`
- `mission.sub1`
- `about.mission.title`
- `mission.title`
- `mission_and_vision.content`
- `mission_and_vision.title`
- `profile.name`
- `profile.description`
- `profile.slogan`
- `about.results.title`
- `results.title`
- `team.content`
- `team.title`
- `testimonies.title`
- `about.vision.sub1`
- `vision.sub1`
- `about.vision.sub2`
- `vision.sub2`
- `about.vision.title`
- `vision.title`
- `about.who.sub1`
- `who.sub1`
- `about.who.sub2`
- `who.sub2`
- `about.who.title`
- `who.title`
- `activerecord.errors.messages.record_invalid`
- `errors.messages.record_invalid`
- `activerecord.errors.messages.restrict_dependent_destroy.has_many`
- `errors.messages.restrict_dependent_destroy.has_many`
- `activerecord.errors.messages.restrict_dependent_destroy.has_one`
- `errors.messages.restrict_dependent_destroy.has_one`
- `title`
- `admin.dashboard`
- `dashboard`
- `admin.nav.blog_posts`
- `nav.blog_posts`
- `admin.nav.club_stories`
- `nav.club_stories`
- `admin.nav.listing_complexes`
- `nav.listing_complexes`
- `admin.nav.listings`
- `nav.listings`
- `admin.nav.testimonials`
- `nav.testimonials`
- `admin.nav.variables`
- `nav.variables`
- `admin.common.content_section`
- `common.content_section`
- `admin.common.delete_photo_confirm`
- `common.delete_photo_confirm`
- `admin.common.delete`
- `common.delete`
- `admin.common.dropzone`
- `common.dropzone`
- `admin.common.edit`
- `common.edit`
- `admin.common.loading`
- `common.loading`
- `admin.common.main_photo`
- `common.main_photo`
- `admin.common.media_section`
- `common.media_section`
- `admin.common.new`
- `common.new`
- `admin.common.readMore`
- `common.readMore`
- `admin.common.save`
- `common.save`
- `admin.common.saving`
- `admin.common.seo_section`
- `common.seo_section`
- `admin.common.total`
- `common.total`
- `admin.common.view`
- `common.view`
- `admin.blog_posts.title`
- `blog_posts.title`

... and 2451 more

</details>

### Unused Portuguese Translations (2551 keys)

<details>
<summary>Click to expand list</summary>

- `header`
- `history_and_values.content.first_paragraph`
- `history_and_values.content.second_paragraph`
- `history_and_values.content.third_paragraph`
- `about.history_and_values.content.1_paragraph`
- `history_and_values.content.1_paragraph`
- `about.history_and_values.content.2_paragraph`
- `history_and_values.content.2_paragraph`
- `about.history_and_values.content.3_paragraph`
- `history_and_values.content.3_paragraph`
- `history_and_values.title`
- `kw_luxury.content`
- `kw_luxury.subtitle`
- `kw_luxury.title`
- `kw_partnership.international_network.content`
- `kw_partnership.international_network.title`
- `kw_partnership.national_network.content`
- `kw_partnership.national_network.title`
- `kw_partnership.principles.list`
- `kw_partnership.principles.title`
- `kw_partnership.title`
- `about.mission.sub1`
- `mission.sub1`
- `about.mission.title`
- `mission.title`
- `mission_and_vision.content`
- `mission_and_vision.title`
- `profile.name`
- `profile.description`
- `profile.slogan`
- `about.results.title`
- `results.title`
- `team.content`
- `team.title`
- `testimonies.title`
- `about.vision.sub1`
- `vision.sub1`
- `about.vision.sub2`
- `vision.sub2`
- `about.vision.title`
- `vision.title`
- `about.who.sub1`
- `who.sub1`
- `about.who.sub2`
- `who.sub2`
- `about.who.title`
- `who.title`
- `meta_description`
- `activerecord.errors.messages.record_invalid`
- `errors.messages.record_invalid`
- `activerecord.errors.messages.restrict_dependent_destroy.has_many`
- `errors.messages.restrict_dependent_destroy.has_many`
- `activerecord.errors.messages.restrict_dependent_destroy.has_one`
- `errors.messages.restrict_dependent_destroy.has_one`
- `title`
- `admin.dashboard`
- `dashboard`
- `admin.nav.blog_posts`
- `nav.blog_posts`
- `admin.nav.club_stories`
- `nav.club_stories`
- `admin.nav.listing_complexes`
- `nav.listing_complexes`
- `admin.nav.listings`
- `nav.listings`
- `admin.nav.testimonials`
- `nav.testimonials`
- `admin.nav.variables`
- `nav.variables`
- `admin.common.content_section`
- `common.content_section`
- `admin.common.delete_photo_confirm`
- `common.delete_photo_confirm`
- `admin.common.delete`
- `common.delete`
- `admin.common.dropzone`
- `common.dropzone`
- `admin.common.edit`
- `common.edit`
- `admin.common.loading`
- `common.loading`
- `admin.common.main_photo`
- `common.main_photo`
- `admin.common.media_section`
- `common.media_section`
- `admin.common.new`
- `common.new`
- `admin.common.readMore`
- `common.readMore`
- `admin.common.save`
- `common.save`
- `admin.common.saving`
- `admin.common.seo_section`
- `common.seo_section`
- `admin.common.total`
- `common.total`
- `admin.common.view`
- `common.view`
- `admin.blog_posts.content`
- `blog_posts.content`

... and 2451 more

</details>

## 📁 File-by-File Breakdown

### ✅ about.json

- EN: 36 keys
- PT: 36 keys

### ✅ activerecord.json

- EN: 3 keys
- PT: 3 keys

### ✅ admin.json

- EN: 132 keys
- PT: 132 keys

### ✅ auth.json

- EN: 5 keys
- PT: 5 keys

### ✅ backoffice.json

- EN: 15 keys
- PT: 15 keys

### ✅ blog_posts.json

- EN: 5 keys
- PT: 5 keys

### ✅ buy.json

- EN: 1 keys
- PT: 1 keys

### ✅ club.json

- EN: 152 keys
- PT: 152 keys

### ✅ club_stories.json

- EN: 1 keys
- PT: 1 keys

### ✅ common.json

- EN: 17 keys
- PT: 17 keys

### ✅ contact.json

- EN: 1 keys
- PT: 1 keys

### ✅ contacts.json

- EN: 13 keys
- PT: 13 keys

### ✅ date.json

- EN: 8 keys
- PT: 8 keys

### ✅ datetime.json

- EN: 35 keys
- PT: 35 keys

### ✅ devise.json

- EN: 82 keys
- PT: 82 keys

### ✅ enterprises.json

- EN: 26 keys
- PT: 26 keys

### ✅ errors.json

- EN: 76 keys
- PT: 76 keys

### ✅ faq.json

- EN: 61 keys
- PT: 61 keys

### ✅ flash.json

- EN: 10 keys
- PT: 10 keys

### ✅ footer.json

- EN: 9 keys
- PT: 9 keys

### ✅ general.json

- EN: 1 keys
- PT: 1 keys

### ✅ good_job.json

- EN: 216 keys
- PT: 216 keys

### ✅ helpers.json

- EN: 4 keys
- PT: 4 keys

### ✅ home.json

- EN: 14 keys
- PT: 14 keys

### ✅ i18n.json

- EN: 31 keys
- PT: 31 keys

### ✅ kw.json

- EN: 25 keys
- PT: 25 keys

### ✅ listing.json

- EN: 87 keys
- PT: 87 keys

### ✅ listingComplex.json

- EN: 13 keys
- PT: 13 keys

### ✅ listing_complex.json

- EN: 10 keys
- PT: 10 keys

### ✅ listings.json

- EN: 3 keys
- PT: 3 keys

### ✅ meta.json

- EN: 35 keys
- PT: 35 keys

### ✅ navbar.json

- EN: 24 keys
- PT: 24 keys

### ✅ notifications.json

- EN: 11 keys
- PT: 11 keys

### ✅ number.json

- EN: 42 keys
- PT: 42 keys

### ✅ pagination.json

- EN: 4 keys
- PT: 4 keys

### ✅ privacy.json

- EN: 34 keys
- PT: 34 keys

### ✅ ransack.json

- EN: 97 keys
- PT: 97 keys

### ✅ sell.json

- EN: 19 keys
- PT: 19 keys

### ✅ services.json

- EN: 43 keys
- PT: 43 keys

### ✅ share.json

- EN: 9 keys
- PT: 9 keys

### ✅ shareIcons.json

- EN: 9 keys
- PT: 9 keys

### ✅ socials.json

- EN: 4 keys
- PT: 4 keys

### ✅ super_admin.json

- EN: 67 keys
- PT: 67 keys

### ✅ support.json

- EN: 3 keys
- PT: 3 keys

### ✅ tasks.json

- EN: 3 keys
- PT: 3 keys

### ✅ terms.json

- EN: 19 keys
- PT: 19 keys

### ✅ time.json

- EN: 6 keys
- PT: 6 keys

## 💡 Recommendations

1. **Priority High**: Fix missing translations that are used in code
2. **Priority Medium**: Add missing translations for language parity
3. **Priority Low**: Consider removing unused translations to reduce bundle size

