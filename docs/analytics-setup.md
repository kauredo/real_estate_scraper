# Analytics Setup Guide

## ✅ What's Already Done

The frontend already has Google Analytics and Facebook Pixel fully implemented! The Analytics component:
- Loads Google Analytics (gtag.js) dynamically
- Loads Facebook Pixel dynamically
- Tracks page views on route changes
- Includes noscript fallback for Facebook Pixel

## 🔧 Setup Instructions

### 1. Set Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

**Variable Name**: `VITE_GOOGLE_TAG_ID`
**Value**: Your Google Analytics Measurement ID (format: `G-XXXXXXXXXX`)
**Environments**: Production, Preview, Development

**Variable Name**: `VITE_FACEBOOK_PIXEL_ID`
**Value**: Your Facebook Pixel ID (numeric, e.g., `123456789012345`)
**Environments**: Production, Preview, Development

### 2. Redeploy

After adding the environment variables, trigger a new deployment:
```bash
git commit --allow-empty -m "Trigger deployment with analytics env vars"
git push
```

Or manually redeploy from Vercel dashboard.

## 📊 What Gets Tracked

### Google Analytics
- **Page Views**: Automatic on every route change
- **User Engagement**: Time on site, bounce rate, etc.
- **Traffic Sources**: Where users come from
- **Device Info**: Mobile vs desktop, browsers, etc.

### Facebook Pixel
- **Page Views**: Automatic on every route change
- **Custom Events**: Can add conversion tracking later (contact form, listing inquiries, etc.)
- **Retargeting**: Build custom audiences for Facebook Ads
- **Attribution**: Track which ads drive conversions

## 🧪 Testing

After deployment, verify analytics are working:

### Google Analytics
1. Open your site in an incognito window
2. Go to Google Analytics → Reports → Realtime
3. You should see your visit appear within 10 seconds

### Facebook Pixel
1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) Chrome extension
2. Visit your site
3. Click the extension icon - it should show your Pixel ID and PageView events

## 🎯 Next Steps

### Add Conversion Tracking
You can track specific actions by adding events to your components:

```javascript
// Track contact form submission
window.gtag?.('event', 'contact_form_submit', {
  'event_category': 'engagement',
  'event_label': 'Contact Form'
});

window.fbq?.('track', 'Contact');
```

### Common Events to Track
- Contact form submissions
- Listing inquiries (via contact form with listing ID)
- Phone clicks
- Email clicks
- Social media link clicks
- Newsletter signups
- Virtual tour views

## 📝 Notes

- **Privacy**: Make sure you have a privacy policy that mentions cookies and analytics
- **GDPR**: Consider adding a cookie consent banner if you have EU traffic
- **Performance**: Analytics scripts load asynchronously and don't block page rendering
- **Backoffice**: Analytics are NOT installed in backoffice (intentional - it's an admin tool)
