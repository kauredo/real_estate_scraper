# Backoffice Migration Progress

## ✅ Completed Views Migration

### Blog Posts (`app/views/admin/blog_posts/`)

Original ERB -> React Components

- `index.html.erb` -> `AdminBlogPostsPage.tsx`
- `show.html.erb` -> `AdminBlogPostDetailPage.tsx`
- `new.html.erb` -> `AdminBlogPostEditPage.tsx`
- `edit.html.erb` -> `AdminBlogPostEditPage.tsx`

Supporting Components:

- BlogPostList.tsx
- BlogPostCard.tsx
- BlogPostForm.tsx

## 📝 Remaining Views to Migrate

### Property Management

#### Listing Complexes (`app/views/admin/listing_complexes/`)

Files to Create:

- 📄 Pages:
  - `src/pages/Admin/AdminListingComplexesPage.tsx` (from `index.html.erb`)
  - `src/pages/Admin/AdminListingComplexDetailPage.tsx` (from `show.html.erb`)
  - `src/pages/Admin/AdminListingComplexEditPage.tsx` (from `new.html.erb` and `edit.html.erb`)
- 🧩 Components:
  - `src/components/admin/listingComplex/ListingComplexList.tsx`
  - `src/components/admin/listingComplex/ListingComplexCard.tsx`
  - `src/components/admin/listingComplex/ListingComplexForm.tsx`

#### Properties (`app/views/admin/properties/`)

Files to Create:

- 📄 Pages:
  - `src/pages/Admin/AdminPropertiesPage.tsx` (from `index.html.erb`)
  - `src/pages/Admin/AdminPropertyDetailPage.tsx` (from `show.html.erb`)
  - `src/pages/Admin/AdminPropertyEditPage.tsx` (from `new.html.erb` and `edit.html.erb`)
- 🧩 Components:
  - `src/components/admin/property/PropertyList.tsx`
  - `src/components/admin/property/PropertyCard.tsx`
  - `src/components/admin/property/PropertyForm.tsx`
  - `src/components/admin/property/PropertyPhotoManager.tsx`
  - `src/components/admin/property/PropertyFeaturesForm.tsx`

### User Management (`app/views/admin/users/`)

Files to Create:

- 📄 Pages:
  - `src/pages/Admin/AdminUsersPage.tsx` (from `index.html.erb`)
  - `src/pages/Admin/AdminUserDetailPage.tsx` (from `show.html.erb`)
  - `src/pages/Admin/AdminUserEditPage.tsx` (from `edit.html.erb`)
- 🧩 Components:
  - `src/components/admin/user/UserList.tsx`
  - `src/components/admin/user/UserCard.tsx`
  - `src/components/admin/user/UserForm.tsx`
  - `src/components/admin/user/UserRolesManager.tsx`

### Settings (`app/views/admin/settings/`)

Files to Create:

- 📄 Pages:
  - `src/pages/Admin/AdminSettingsPage.tsx` (from `index.html.erb`)
- 🧩 Components:
  - `src/components/admin/settings/GeneralSettings.tsx`
  - `src/components/admin/settings/MetaTagsSettings.tsx`
  - `src/components/admin/settings/ContactSettings.tsx`

### Content Management

#### FAQs (`app/views/admin/faqs/`)

Files to Create:

- 📄 Pages:
  - `src/pages/Admin/AdminFaqsPage.tsx` (from `index.html.erb`)
  - `src/pages/Admin/AdminFaqEditPage.tsx` (from `new.html.erb` and `edit.html.erb`)
- 🧩 Components:
  - `src/components/admin/faq/FaqList.tsx`
  - `src/components/admin/faq/FaqForm.tsx`

#### Club Memberships (`app/views/admin/club_memberships/`)

Files to Create:

- 📄 Pages:
  - `src/pages/Admin/AdminClubMembershipsPage.tsx` (from `index.html.erb`)
  - `src/pages/Admin/AdminClubMembershipDetailPage.tsx` (from `show.html.erb`)
- 🧩 Components:
  - `src/components/admin/club/MembershipList.tsx`
  - `src/components/admin/club/MembershipCard.tsx`

#### Contact Submissions (`app/views/admin/contacts/`)

Files to Create:

- 📄 Pages:
  - `src/pages/Admin/AdminContactsPage.tsx` (from `index.html.erb`)
  - `src/pages/Admin/AdminContactDetailPage.tsx` (from `show.html.erb`)
- 🧩 Components:
  - `src/components/admin/contact/ContactList.tsx`
  - `src/components/admin/contact/ContactDetail.tsx`

#### Newsletter (`app/views/admin/newsletter_subscribers/`)

Files to Create:

- 📄 Pages:
  - `src/pages/Admin/AdminNewsletterPage.tsx` (from `index.html.erb`)
- 🧩 Components:
  - `src/components/admin/newsletter/SubscriberList.tsx`
  - `src/components/admin/newsletter/SubscriberStats.tsx`

### Analytics (`app/views/admin/analytics/`)

Files to Create:

- 📄 Pages:
  - `src/pages/Admin/AdminAnalyticsPage.tsx` (from `index.html.erb`)
- 🧩 Components:
  - `src/components/admin/analytics/PropertyViewsChart.tsx`
  - `src/components/admin/analytics/ContactFormChart.tsx`
  - `src/components/admin/analytics/UserActivityLog.tsx`

Note: Each section will require:

1. Corresponding TypeScript interfaces in `src/utils/interfaces.ts`
2. API service functions in `src/services/api.ts`
3. Route definitions in `src/utils/routes.ts`
4. i18n translations in `src/locales/`
