# Design Redesign Progress

This document tracks the design alignment work across promo-site and backoffice.

## Design Principles (from .cursorrules)

1. **Clarity over cleverness** — Simplify, reduce cognitive load
2. **Warmth through details** — Rounded corners, comfortable spacing, friendly copy
3. **Professional by default** — Refined and trustworthy, not playful
4. **Progressive disclosure** — Show only what's needed now
5. **Consistency builds trust** — Same patterns throughout

## Color System

| Token | Purpose | Hex |
|-------|---------|-----|
| `primary-600` | Key actions, CTAs | #0284c7 (sky blue) |
| `warm-500` | Warmth accents, secondary emphasis | #f59e0b (amber) |
| `neutral-*` | Text, backgrounds, borders | Stone gray scale |
| `success/warning/error` | Semantic feedback | Green/Amber/Red |

**Rule**: Blue sparingly (primary actions only). Use neutral for most UI.

---

## Promo-Site Progress

### Completed

- [x] **tailwind.config.mjs** - Added warm, neutral palettes
- [x] **Button.tsx** - primary tokens, warm variant, rounded-lg
- [x] **Card.tsx** - neutral borders, softer shadow
- [x] **Navbar.tsx** - neutral text colors
- [x] **Footer.tsx** - neutral text colors
- [x] **Home.tsx** - Removed blue-purple gradients, warm accents, neutral stats
- [x] **Pricing.tsx** - primary tokens, warm accent for recommended plan
- [x] **Features.tsx** - warm icon backgrounds, neutral colors

- [x] **About.tsx** - Replaced blue-purple gradients with neutral, semantic tokens
- [x] **Contact.tsx** - Neutral colors, semantic icon backgrounds
- [x] **CaseStudies.tsx** - Neutral CTA section, semantic colors
- [x] **Help.tsx** - Neutral documentation card, semantic colors
- [x] **Badge.tsx** - Added primary, warm, success variants, neutral tokens
- [x] **Input.tsx** - neutral-300 border, primary-500 focus ring, rounded-lg
- [x] **Textarea.tsx** - neutral-300 border, primary-500 focus ring, rounded-lg
- [x] **Label.tsx** - Added neutral-900 text color

### Remaining

*All promo-site components completed!*

---

## Backoffice Progress

### Completed

- [x] **tailwind.config.mjs** - Added warm, neutral palettes
- [x] **Button.tsx** - warm variant, neutral secondary/ghost
- [x] **Input.tsx** - neutral borders and text
- [x] **Badge.tsx** - semantic color tokens
- [x] **AdminTable.tsx** - Removed harsh borders, added hover states
- [x] **AdminCard.tsx** - neutral colors, softer shadow, rounded-xl
- [x] **Modal.tsx** - softer overlay (neutral-900/60), neutral borders
- [x] **Tabs.tsx** - neutral active states instead of blue
- [x] **Sidebar.tsx** - neutral active states, softer overlay
- [x] **Navbar.tsx** - neutral borders and text

- [x] **Select.tsx** - neutral borders, text, backgrounds
- [x] **Textarea.tsx** - neutral borders, text, backgrounds
- [x] **Checkbox.tsx** - neutral borders, primary-600 accent
- [x] **MultiSelect.tsx** - primary-* tags, neutral backgrounds
- [x] **TagInput.tsx** - primary-* tags, neutral backgrounds
- [x] **Pagination.tsx** - neutral buttons
- [x] **Breadcrumbs.tsx** - neutral text colors
- [x] **EmptyState.tsx** - neutral text color
- [x] **LoadingSpinner.tsx** - neutral text color
- [x] **AdminPageHeader.tsx** - Left-aligned titles, neutral text

- [x] **AdminBackofficePage.tsx** - neutral text colors
- [x] **AdminDashboard.tsx** - neutral colors, neutral tab states
- [x] **ConfirmDialog.tsx** - NEW: reusable delete confirmation component
- [x] **ListingsTable.tsx** - Uses ConfirmDialog, neutral colors

### Remaining

- [x] **Dashboard pages** - Reviewed: they serve different purposes (stats vs content management). Fixed i18n in AdminDashboard ✅
- [x] **Delete confirmations** - All 12 files migrated from window.confirm to ConfirmDialog ✅
- [x] **Form pages** - Standardized container padding (px-4 sm:px-6 lg:px-8) ✅

*All backoffice components completed!*

---

## Known Issues to Fix

### High Priority
1. ~~**Hero highlights** - Consider removing blue highlight from page titles~~ ✅ FIXED (no blue highlights found)
2. ~~**Gradient placeholders** - Several pages still have colorful gradient fallbacks~~ ✅ FIXED (Features.tsx)
3. **Hardcoded strings** - Some Portuguese strings not using i18n (40+ files - large task, partially addressed)

### Medium Priority
4. ~~**Spacing inconsistency** - Container padding varies (px-4, px-2 sm:px-8)~~ ✅ FIXED (standardized to px-4 sm:px-6 lg:px-8)
5. ~~**Two dashboards** - AdminBackofficePage vs AdminDashboard confusion~~ ✅ REVIEWED (different purposes, fixed i18n)
6. ~~**window.confirm** - Jarring native dialogs instead of styled modals~~ ✅ FIXED

### Lower Priority
7. ~~**App.css cleanup** - Remove Vite boilerplate (backoffice)~~ ✅ FIXED
8. ~~**Dark mode improvements** - Move toggle to html element~~ ✅ FIXED
9. ~~**Missing illustrations** - Empty states use text/emoji only~~ ✅ FIXED (added SVG illustration)

---

## Quick Reference: Common Replacements

```
text-gray-* → text-neutral-*
bg-gray-* → bg-neutral-*
border-gray-* → border-neutral-*
text-blue-600 → text-primary-600
bg-blue-* → bg-primary-*
bg-purple-* → bg-warm-*
bg-black bg-opacity-50 → bg-neutral-900/60
hover:border-blue-600 → hover:border-neutral-300
```

---

## Next Steps

1. ~~Complete remaining promo-site pages~~ ✅
2. ~~Complete remaining backoffice UI components~~ ✅
3. ~~Fix AdminPageHeader centered titles~~ ✅
4. ~~Created ConfirmDialog component~~ ✅
5. ~~Migrate all window.confirm to ConfirmDialog~~ ✅ (12 files migrated)
6. ~~Standardize container padding across all pages~~ ✅ (px-4 sm:px-6 lg:px-8)
7. ~~Review dashboard pages~~ ✅ (different purposes, i18n fixed)
8. ~~Clean up App.css Vite boilerplate~~ ✅
9. ~~Fix dark mode toggle (html element)~~ ✅
10. ~~Add empty state illustrations~~ ✅

## Remaining Work

- **Portuguese strings i18n** - 40+ files still have hardcoded Portuguese strings. This is a large i18n effort that should be tracked as a separate project.

## Files using window.confirm (need migration to ConfirmDialog)

- [x] ListingsTable.tsx - DONE
- [x] ListingComplexesTable.tsx - DONE
- [x] PhotosManagement.tsx - DONE
- [x] TestimonialsManagement.tsx - DONE
- [x] AdminBlogPostsPage.tsx - DONE
- [x] AdminClubStoriesPage.tsx - DONE
- [x] AdminListingsPage.tsx - DONE (update all action)
- [x] AdminTestimonialDetailPage.tsx - DONE
- [x] AdminVariablesPage.tsx - DONE
- [x] AdminSystemSettings.tsx - DONE
- [x] SuperAdminTenantsPage.tsx - DONE (delete + rotate API key)
- [x] SuperAdminAdminsPage.tsx - DONE (delete + unconfirm)

✅ **All window.confirm migrations complete!**
