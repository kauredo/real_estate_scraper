# Vercel Edge Middleware for Social Media Crawlers (Vite/SPA)

This document explains how the Edge Middleware works to provide dynamic meta tags for social media sharing in our Vite-based SPA.

## Important: No Next.js Required!

This middleware uses **standard Web APIs** (Request, Response) and works perfectly with Vite. No Next.js installation needed.

## The Problem

Single Page Applications (SPAs) like ours update meta tags using JavaScript after the page loads. However, social media crawlers (Facebook, Twitter, LinkedIn, WhatsApp) **don't execute JavaScript**. They only read the initial HTML, so they never see the dynamic meta tags.

Result: When someone shares a listing or blog post, social platforms show no preview image, title, or description.

## The Solution

Vercel Edge Middleware intercepts requests from social media crawlers **before** serving the HTML. It:

1. Detects if the request is from a crawler (via user agent)
2. Identifies the content type (listing, blog post, complex) from the URL
3. Fetches the specific content data from the Rails API
4. Generates proper meta tags with the content's title, description, and images
5. Injects these meta tags into the HTML
6. Serves the modified HTML to the crawler

Regular users and search engines are **not affected** - they get the normal fast SPA.

## Architecture

```
┌─────────────────┐
│  Social Media   │
│    Crawler      │
└────────┬────────┘
         │
         ├─ Detects User Agent
         │
         ▼
┌─────────────────┐
│     Vercel      │
│  Edge Middleware│──┐
└────────┬────────┘  │
         │           │ Fetches data
         │           │ from Rails API
         │           ▼
         │    ┌─────────────┐
         │    │   Rails API │
         │    │  (Railway)  │
         │    └─────────────┘
         │
         ├─ Injects Meta Tags
         │
         ▼
┌─────────────────┐
│  Modified HTML  │
│  with Meta Tags │
└─────────────────┘
```

## Technical Implementation

### Standard Web APIs (No Dependencies!)

The middleware uses standard Web APIs that are built into Vercel Edge Runtime:
- `Request` - Standard Web API for HTTP requests
- `Response` - Standard Web API for HTTP responses
- `fetch()` - Standard Web API for making HTTP requests
- `URL` - Standard Web API for URL parsing

**No packages to install.** Everything works out of the box with Vercel.

## Files

### `middleware.ts`
Main middleware logic using standard Web APIs that:
- Detects crawler user agents
- Parses URLs to extract content type and slug
- Fetches data from the API
- Generates and injects meta tags
- Uses `export default` function format (not Next.js specific)

### `lib/metaTagsGenerator.ts`
Helper functions to:
- Generate meta tag HTML from content data
- Handle different content types (listings, blog posts, complexes)
- Escape HTML to prevent XSS
- Format descriptions and titles properly

### `vercel.json`
Configuration for Vercel deployment including rewrites and headers.

## Supported Crawlers

The middleware detects and handles these social media crawlers:

- **Facebook** - `facebookexternalhit`
- **Twitter/X** - `Twitterbot`
- **LinkedIn** - `LinkedInBot`
- **WhatsApp** - `WhatsApp`
- **Slack** - `Slackbot`
- **Pinterest** - `Pinterest`
- **Telegram** - `TelegramBot`
- **Discord** - `Discordbot`

## Supported Content Types

### Listings
- **URL Pattern**: `/comprar/:slug` or `/buy/:slug`
- **API Endpoint**: `/api/v1/listings/:slug`
- **Meta Tags**: Title, description, first photo

### Blog Posts
- **URL Pattern**: `/blog/:slug`
- **API Endpoint**: `/api/v1/blog_posts/:slug`
- **Meta Tags**: meta_title or title, meta_description, featured image

### Listing Complexes
- **URL Pattern**: `/empreendimentos/:slug` or `/enterprises/:slug`
- **API Endpoint**: `/api/v1/listing_complexes/:slug`
- **Meta Tags**: Name, description, first photo

### Club Stories (NEW!)
- **URL Pattern**: `/clube-sgg/historias/:slug` or `/club/stories/:slug`
- **API Endpoint**: `/api/v1/club_stories/:slug`
- **Meta Tags**: Title, description, featured image

## Multilingual Support

The middleware automatically detects the language from the URL and sets the appropriate `og:locale`:

- **Portuguese** (default): URLs without `/en/` prefix → `og:locale="pt_PT"`
- **English**: URLs starting with `/en/` → `og:locale="en_US"`

**Examples:**
- `https://sofiagalvaogroup.com/comprar/villa` → Portuguese locale
- `https://sofiagalvaogroup.com/en/buy/villa` → English locale

## Environment Variables

The middleware uses these environment variables (set in Vercel):

- `VITE_API_URL` - Rails API base URL (e.g., `https://api.sofiagalvaogroup.com/api/v1`)
- `VITE_API_KEY` - Tenant API key for authentication

## Performance

- **Execution Location**: Vercel Edge Network (globally distributed)
- **Cache Duration**: 5 minutes for crawler responses
- **API Timeout**: 3 seconds
- **Impact on Regular Users**: Zero (middleware only runs for crawlers)
- **Traffic Overhead**: ~1-2% (only crawler traffic)

## Testing

### 1. Deploy to Vercel

```bash
git add .
git commit -m "Add Vercel Edge Middleware for social media crawlers"
git push
```

### 2. Test with Facebook Sharing Debugger

Visit: https://developers.facebook.com/tools/debug/

Enter URLs:
- Homepage: `https://sofiagalvaogroup.com/`
- Listing: `https://sofiagalvaogroup.com/comprar/[slug]`
- Blog: `https://sofiagalvaogroup.com/blog/[slug]`
- Complex: `https://sofiagalvaogroup.com/empreendimentos/[slug]`
- Club Story: `https://sofiagalvaogroup.com/clube-sgg/historias/[slug]`
- English listing: `https://sofiagalvaogroup.com/en/buy/[slug]`

Click "Scrape Again" to clear cache and fetch new data.

**Expected Results**:
- ✅ Proper title with listing/blog name
- ✅ Description (max 160 characters)
- ✅ Image preview (listing photo or featured image)
- ✅ No errors in the debugger

### 3. Test with Twitter Card Validator

Visit: https://cards-dev.twitter.com/validator

Paste your URLs and verify the card preview appears correctly.

### 4. Test with LinkedIn

Create a new post in LinkedIn and paste a listing URL. The preview should appear with:
- Correct title
- Description
- Image

### 5. Test Regular User Experience

Open the site in a normal browser and verify:
- No performance degradation
- React meta tags still update dynamically
- Page navigation is fast

### 6. Check Vercel Deployment Logs

In your Vercel dashboard:
1. Go to Deployments
2. Click on the latest deployment
3. Go to Functions tab
4. Look for middleware execution logs

You should see logs like:
```
[Crawler detected] facebookexternalhit/1.1 - /comprar/luxury-apartment-lisbon
[Crawler] Fetching listing data for slug: luxury-apartment-lisbon
[Crawler] Injected meta tags for listing: luxury-apartment-lisbon
```

## Debugging

### Check if Middleware is Running

Add a test header to the middleware response to verify it's executing:

```typescript
return new NextResponse(modifiedHtml, {
  headers: {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Middleware-Test': 'active', // Add this for debugging
    'Cache-Control': 'public, max-age=300, s-maxage=300',
  },
});
```

Then use `curl` to check:

```bash
curl -H "User-Agent: facebookexternalhit/1.1" \
  -I https://sofiagalvaogroup.com/comprar/some-listing | \
  grep X-Middleware-Test
```

### Test API Connectivity

The middleware needs to reach your Rails API. Test with:

```bash
curl -H "X-API-Key: YOUR_API_KEY" \
  https://api-production-329b.up.railway.app/api/v1/listings/some-slug
```

### Common Issues

**Issue**: Meta tags not appearing for crawlers
- **Check**: Middleware logs in Vercel
- **Verify**: API_KEY is set in Vercel environment variables
- **Test**: API endpoint returns valid data

**Issue**: Timeout errors
- **Check**: API response time (should be < 3 seconds)
- **Solution**: Optimize API queries or increase timeout

**Issue**: CORS errors
- **Check**: API allows requests from Vercel edge locations
- **Note**: This shouldn't be an issue as middleware runs server-side

**Issue**: Images not loading
- **Check**: Photo URLs are absolute (not relative)
- **Verify**: Images are publicly accessible

## Monitoring

Monitor middleware performance in Vercel:
- **Functions → Middleware** - Execution count and duration
- **Analytics → Edge** - Cache hit rate
- **Logs** - Crawler requests and errors

Typical metrics:
- Execution time: 100-500ms (including API fetch)
- Cache hit rate: 60-80% (after warm-up)
- Error rate: < 1%

## Future Enhancements

Possible improvements:
- Add support for more crawlers (Reddit, Discourse, etc.)
- Implement edge caching for API responses
- Add fallback images per content type
- Support for multilingual meta tags
- Add structured data injection
- Implement A/B testing for meta tag formats

## Resources

- [Vercel Edge Middleware Docs](https://vercel.com/docs/functions/edge-middleware)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Open Graph Protocol](https://ogp.me/)
