# Frontend Deployment Guide for Step-Mother

## Vercel Account Setup (Step-Mother)

### 1. Create Vercel Account

- Go to https://vercel.com
- Sign up with her email
- Upgrade to Pro plan ($20/month) for commercial use

### 2. Environment Configuration

Create `.env.production` in frontend folder:

```bash
VITE_API_URL=https://your-railway-app.railway.app
VITE_APP_ENV=production
```

### 3. Update Frontend Configuration

```javascript
// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});
```

### 4. Create API Service

```javascript
// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Add your API methods here
  async getListings() {
    return this.request("/api/listings");
  }
}

export default new ApiService();
```

### 5. Deploy to Vercel

```bash
cd frontend
npm install -g vercel
vercel --prod
```

### 6. Custom Domain Setup (Optional)

- Add custom domain in Vercel dashboard
- Update DNS records as instructed
