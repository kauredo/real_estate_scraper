# SEO & Meta Tags Implementation Guide

## ✅ What's Implemented

### Dynamic Meta Tags (OG Tags)
All key pages have dynamic meta tags and Open Graph tags for social media sharing:

- **HomePage**: General site information, organization schema
- **ListingDetailPage**: Property-specific meta tags with photos
- **BlogPostDetailPage**: Article meta tags with featured image
- **ListingComplexDetailPage**: Complex meta tags with photos

### Structured Data (JSON-LD)
Google-friendly structured data for rich snippets:

- **Organization Schema** (HomePage): Company information, social links
- **RealEstateListing Schema** (ListingDetailPage): Property details, price, photos
- **Article Schema** (BlogPostDetailPage): Blog content for Google Discover
- **BreadcrumbList Schema** (All detail pages): Navigation hierarchy
- **ItemList Schema** (HomePage): Collection of featured listings

## 📸 Default OG Image

### Required: Create Default OG Image

You need to create a default Open Graph image for pages without specific images.

**Location**: `/frontend/public/images/default-og-image.jpg`

**Specifications**:
- **Dimensions**: 1200 x 630 pixels (Facebook/Twitter optimal)
- **Format**: JPG or PNG
- **File size**: < 1MB
- **Content**: Should include:
  - Your logo
  - Tagline: "Sofia Galvão Group - Luxury Real Estate in Portugal"
  - Professional background image (property or office)
  - High contrast for readability

**Design Tips**:
- Keep important content in the center (some platforms crop)
- Avoid small text (won't be readable in previews)
- Use brand colors
- Test on both light and dark backgrounds

### Quick Creation Options:

1. **Canva**: Use OG Image template (1200x630)
2. **Figma**: Design custom OG image
3. **Use existing**: Take a hero image and add text overlay

## 🧪 Testing Meta Tags

### Google Rich Results Test
https://search.google.com/test/rich-results

1. Deploy your site
2. Enter a listing URL: `https://yoursite.com/comprar/property-slug`
3. Verify structured data is valid
4. Check for errors and warnings

### Facebook Sharing Debugger
https://developers.facebook.com/tools/debug/

1. Enter your URL
2. Click "Scrape Again" to refresh cache
3. Verify OG image, title, and description appear correctly
4. Check image dimensions

### Twitter Card Validator
https://cards-dev.twitter.com/validator

1. Enter your URL
2. Verify card type is "summary_large_image"
3. Check image and text display correctly

### LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/

1. Enter your URL
2. Verify professional appearance
3. Check image renders correctly

## 📊 What Gets Tracked in Search

### Rich Snippets You'll Get:

**For Listings**:
- Property photo
- Price in EUR
- Address
- Number of rooms
- Floor size
- Availability status

**For Blog Posts**:
- Featured image
- Author (organization)
- Published date
- Article description

**For Organization**:
- Company name
- Logo
- Description
- Social media links

## 🔍 Monitoring SEO Performance

### Google Search Console

After deployment:
1. Add your site to Google Search Console
2. Submit sitemap: `https://yoursite.com/api/v1/sitemap.xml`
3. Monitor:
   - Click-through rates
   - Rich result status
   - Mobile usability
   - Core Web Vitals

### Track Key Metrics:

- **Impressions**: How often you appear in search
- **CTR**: Click-through rate (should improve with rich snippets)
- **Average Position**: Aim for top 3 for property searches
- **Rich Results**: Check which pages have enhanced results

## 🚀 Next Level: Add More Structured Data

### Property Features to Add:
```typescript
// In StructuredData component, extend listing schema:
{
  "@type": "RealEstateListing",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Pool" },
    { "@type": "LocationFeatureSpecification", "name": "Garage" },
    // ... more amenities
  ],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Energy Rating", "value": "A+" }
  ]
}
```

### FAQ Schema:
Add to FAQ page for featured snippets:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our services..."
      }
    }
  ]
}
```

### Review Schema:
Add to testimonials for star ratings in search:
```json
{
  "@type": "Review",
  "author": { "@type": "Person", "name": "Client Name" },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  }
}
```

## 📱 Mobile Optimization

All meta tags are mobile-optimized:
- Responsive OG images
- Proper viewport meta tags
- Mobile-friendly structured data
- Fast loading (images lazy loaded)

## 🔒 Privacy & Compliance

- Meta tags don't collect personal data
- Structured data is public information only
- OG images hosted on your domain
- No tracking in meta tags themselves

## 🐛 Troubleshooting

### OG Image Not Showing on Social Media?

1. **Cache Issue**: Social platforms cache for 24-48 hours
   - Force refresh with platform debugging tools
   - Facebook: Use Sharing Debugger "Scrape Again"
   - Twitter: Use Card Validator

2. **Image Too Large**: Keep under 1MB
3. **Wrong Dimensions**: Must be at least 1200x630
4. **HTTPS Required**: Ensure image URLs use HTTPS
5. **CORS Issue**: Check Cloudinary settings allow external access

### Structured Data Errors?

1. **Invalid JSON**: Check API endpoint responses
2. **Missing Required Fields**: Verify all properties have data
3. **Type Mismatch**: Ensure dates are ISO format
4. **URL Format**: Must be absolute URLs (with domain)

### Meta Tags Not Updating?

1. **Browser Cache**: Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
2. **CDN Cache**: Wait for Vercel cache to clear (usually 60s)
3. **Old Build**: Verify latest deployment is live
4. **Meta Tag Priority**: Check component order (MetaTags should be early)

## 📚 Resources

- [Google Structured Data Docs](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Schema.org Real Estate](https://schema.org/RealEstateListing)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
