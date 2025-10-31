# Newsletter Subscribers Management Screenshot

## File: `admin-newsletter-export.webp`

### What to Capture
Screenshot of the **Newsletter Subscriptions management page** with the export functionality visible.

### Where to Navigate
1. Log into the backoffice admin panel
2. Navigate to "Newsletter Subscriptions" or "Subscritores de Newsletter"
3. Route should be something like: `/admin/newsletter-subscriptions`

### What Should Be Visible
- Table/list of newsletter subscribers showing:
  - Subscriber name (first + last name)
  - Email address
  - Subscription date
- **Export CSV button** - THIS IS KEY!
- Number of total subscribers
- Any filtering or search options
- Clean, organized table layout

### Screenshot Settings
- **Browser**: Desktop view (at least 1440px width)
- **Format**: WebP
- **Quality**: High (aim for 200-400KB file size)
- **Aspect Ratio**: Landscape (16:10 or similar)

### What to Avoid
- Don't show real subscriber emails if sensitive
- You can blur/anonymize email addresses if needed
- Remove browser UI elements

### Code Reference
The page is at: `/backoffice/src/pages/Admin/AdminNewsletterSubscriptionsPage.tsx`

The export button code shows:
- Button text: something like "Export CSV" or "Exportar CSV"
- Exports: name, email, subscribed date
- Creates file: `newsletter_subscriptions_{timestamp}.csv`

### Tips for Best Screenshot
- Make sure there are multiple subscribers visible (at least 5-10 rows)
- **Highlight or make sure the Export button is visible** - it's the key feature
- Show the page in a professional, populated state
- If possible, capture with mouse hovering over Export button to show it's interactive

### Once Captured
1. Save as `admin-newsletter-export.webp`
2. Place in `/public/images/`
3. The image will automatically replace the gradient placeholder
