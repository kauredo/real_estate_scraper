# MyAgentWebsite Images

## Quick Start

Simply drop your images into this folder with the correct filenames:

### Required Images:

1. **`hero-platform-screenshot.png`** (or .jpg/.webp)
   - Desktop view of agent website homepage
   - Size: 1920x1080 or 1600x900
   - Used on: Homepage hero section

2. **`sofia-galvao-website.png`** (or .jpg/.webp)
   - Screenshot of https://sofiagalvaogroup.com
   - Size: 1600x900
   - Used on: Homepage case study section

3. **`admin-dashboard.png`** (or .jpg/.webp) [Optional for now]
   - Admin dashboard interface
   - Size: 1600x900
   - Future use: Features page or about section

## Image Guidelines

### Recommended Formats:
- **WebP**: Best performance (recommended)
- **PNG**: Best quality, larger file size
- **JPG**: Good balance of quality and size

### Optimization Tips:

```bash
# Convert to WebP for best performance (requires cwebp tool)
cwebp input.png -q 85 -o output.webp

# Or use online tools:
# - https://squoosh.app/ (Google's image optimizer)
# - https://tinypng.com/ (PNG/JPG compression)
```

### Image Sizes:
- Hero images: 1920x1080 or 1600x900 (16:9 ratio)
- Case study: 1600x900 (16:9 ratio)
- Keep file sizes under 500KB for fast loading

## Folder Structure

```
/public/images/
├── README.md (this file)
├── placeholders/ (instructions for each image)
│   ├── hero-platform-screenshot.md
│   ├── sofia-galvao-website.md
│   └── admin-dashboard.md
├── hero-platform-screenshot.png (ADD THIS)
├── sofia-galvao-website.png (ADD THIS)
└── admin-dashboard.png (OPTIONAL)
```

## How It Works

The code automatically looks for images in this folder. If an image isn't found, it shows a gradient placeholder with instructions. Once you add the image with the correct filename, it will automatically appear on the site!

## Need Help?

Check the individual instruction files in the `placeholders/` folder for detailed guidance on each image.
