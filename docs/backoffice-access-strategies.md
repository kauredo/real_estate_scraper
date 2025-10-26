# Backoffice Access Strategies

## The Question

When the admin backoffice is deployed separately (e.g., `admin.yourdomain.com`), how do clients access it? Should they:
- Navigate to a completely different URL?
- Access it through their own site (e.g., `newagency.com/backoffice`)?
- Use a tenant-specific subdomain?

## Options Comparison

### Option 1: Direct URL Access (Simplest)

**Client Flow:**
```
1. Client bookmarks/visits: admin.yourdomain.com
2. Logs in with their credentials
3. Automatically scoped to their tenant based on their admin account
```

**Pros:**
- ✅ Simplest implementation
- ✅ One URL for all clients
- ✅ Easy to deploy and maintain
- ✅ Clear separation of concerns

**Cons:**
- ❌ Clients need to remember a different domain
- ❌ Less "white-labeled" feel

**Implementation:** Zero additional work needed

---

### Option 2: Redirect from Client Site (Recommended)

**Client Flow:**
```
1. Client visits: newagency.com/backoffice
2. Frontend redirects to: admin.yourdomain.com?tenant=new-agency
3. Backoffice pre-fills tenant slug (optional)
4. Client logs in
5. Automatically scoped to their tenant
```

**Pros:**
- ✅ Clients can use their own domain
- ✅ Seamless transition
- ✅ Still simple to implement
- ✅ Feels more integrated

**Cons:**
- ❌ Slight redirect delay
- ❌ URL changes after redirect (user sees admin.yourdomain.com in browser)

**Implementation:**

```typescript
// Client site: newagency.com
// frontend/src/App.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Regular routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/listings" element={<ListingsPage />} />

      {/* Backoffice redirect */}
      <Route path="/backoffice" element={<BackofficeRedirect />} />
      <Route path="/admin" element={<BackofficeRedirect />} />
    </Routes>
  );
}

function BackofficeRedirect() {
  useEffect(() => {
    // Get tenant slug from environment or config
    const tenantSlug = import.meta.env.VITE_TENANT_SLUG || 'new-agency';
    const backofficeUrl = import.meta.env.VITE_BACKOFFICE_URL || 'https://admin.yourdomain.com';

    // Redirect to backoffice with tenant hint
    window.location.href = `${backofficeUrl}?tenant=${tenantSlug}`;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Redirecting to Admin Panel...</h2>
        <div className="spinner"></div>
      </div>
    </div>
  );
}
```

**Backoffice handles tenant hint:**

```typescript
// admin-backoffice/src/pages/Login.tsx

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get tenant hint from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tenantHint = params.get('tenant');

    if (tenantHint) {
      // Store tenant hint (optional, for branding)
      localStorage.setItem('tenant_hint', tenantHint);

      // Could pre-fill domain-based email
      // e.g., tenant='new-agency' → suggest @newagency.com emails
    }
  }, []);

  const handleLogin = async () => {
    // Normal login flow
    // Admin's tenant_id determines access scope
  };

  return (
    <div className="login-page">
      <h1>Admin Login</h1>
      {/* Login form */}
    </div>
  );
}
```

**Environment variables for each client:**

```bash
# Client site .env.production
VITE_TENANT_SLUG=new-agency
VITE_BACKOFFICE_URL=https://admin.yourdomain.com
```

---

### Option 3: Iframe Embed (Not Recommended)

**Client Flow:**
```
1. Client visits: newagency.com/backoffice
2. Page loads with iframe containing admin.yourdomain.com
3. Client logs in within iframe
4. Stays on newagency.com domain (URL doesn't change)
```

**Pros:**
- ✅ Client stays on their own domain
- ✅ Feels fully integrated

**Cons:**
- ❌ Cookie/authentication issues (CORS, SameSite)
- ❌ Security concerns (clickjacking)
- ❌ Poor UX (iframe scrolling, mobile issues)
- ❌ SEO problems
- ❌ Complex implementation

**Not recommended** due to technical and security issues.

---

### Option 4: Subdomain per Tenant (Advanced)

**Client Flow:**
```
1. SGG: admin-sgg.yourdomain.com
2. New Agency: admin-newagency.yourdomain.com
3. Each subdomain is the same app, just tenant-scoped by subdomain
```

**Pros:**
- ✅ Feels very white-labeled
- ✅ Each client has "their own" admin panel
- ✅ Can customize branding per tenant
- ✅ No tenant hint needed

**Cons:**
- ❌ More complex deployment (multiple subdomains)
- ❌ SSL certificates for each subdomain
- ❌ More DNS configuration

**Implementation:**

```typescript
// admin-backoffice/src/utils/tenant.ts

function getTenantFromSubdomain(): string | null {
  const hostname = window.location.hostname;

  // admin-sgg.yourdomain.com → 'sgg'
  // admin-newagency.yourdomain.com → 'newagency'
  const match = hostname.match(/^admin-([^.]+)\./);

  return match ? match[1] : null;
}

// Use in login
async function login(email: string, password: string) {
  const tenantSlug = getTenantFromSubdomain();

  // Pass tenant slug to API for validation
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      tenant_slug: tenantSlug // Optional: for additional validation
    })
  });
}
```

**Deployment (Vercel):**

```bash
# Deploy once, multiple domains
vercel --prod

# Add domains in Vercel dashboard:
# - admin-sgg.yourdomain.com
# - admin-newagency.yourdomain.com
# - admin.yourdomain.com (fallback)
```

**DNS Configuration:**

```
admin-sgg.yourdomain.com    CNAME   cname.vercel-dns.com
admin-newagency.yourdomain.com    CNAME   cname.vercel-dns.com
admin.yourdomain.com    CNAME   cname.vercel-dns.com
```

---

### Option 5: Reverse Proxy (Advanced)

**Client Flow:**
```
1. Client visits: newagency.com/backoffice
2. Reverse proxy (nginx/Cloudflare) serves admin app
3. Appears to be on newagency.com (no URL change)
4. All requests proxied to admin.yourdomain.com
```

**Pros:**
- ✅ Seamless experience (no domain change)
- ✅ Fully white-labeled
- ✅ Can customize per client

**Cons:**
- ❌ Complex setup
- ❌ Requires proxy infrastructure
- ❌ Cookie/session complexity
- ❌ Overkill for most use cases

**Implementation (Cloudflare Workers):**

```javascript
// Cloudflare Worker for newagency.com
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // Proxy /backoffice to admin panel
  if (url.pathname.startsWith('/backoffice')) {
    const adminUrl = new URL('https://admin.yourdomain.com' + url.pathname.replace('/backoffice', ''))

    // Forward request to admin panel
    const response = await fetch(adminUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    })

    return response
  }

  // Normal handling for other routes
  return fetch(request)
}
```

---

## Recommended Solution: Option 2 (Redirect)

**Best balance of simplicity and UX**

### Implementation Summary

#### 1. Client Sites (Each Tenant Frontend)

```typescript
// frontend/src/components/BackofficeRedirect.tsx
export function BackofficeRedirect() {
  useEffect(() => {
    const tenantSlug = import.meta.env.VITE_TENANT_SLUG;
    const backofficeUrl = import.meta.env.VITE_BACKOFFICE_URL;

    // Redirect with tenant hint
    window.location.href = `${backofficeUrl}/login?tenant=${tenantSlug}`;
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="spinner mb-4"></div>
        <h2 className="text-xl">Redirecting to Admin Panel...</h2>
      </div>
    </div>
  );
}

// Add route
<Route path="/backoffice" element={<BackofficeRedirect />} />
<Route path="/admin" element={<BackofficeRedirect />} />
```

**Environment variables:**

```bash
# SGG .env.production
VITE_TENANT_SLUG=sgg
VITE_BACKOFFICE_URL=https://admin.yourdomain.com

# New Agency .env.production
VITE_TENANT_SLUG=new-agency
VITE_BACKOFFICE_URL=https://admin.yourdomain.com
```

#### 2. Admin Backoffice

```typescript
// admin-backoffice/src/pages/Login.tsx
export function LoginPage() {
  const [searchParams] = useSearchParams();
  const tenantHint = searchParams.get('tenant');

  useEffect(() => {
    if (tenantHint) {
      // Optional: Store for branding
      localStorage.setItem('tenant_hint', tenantHint);

      // Optional: Show tenant-specific branding
      document.title = `${tenantHint} - Admin Panel`;
    }
  }, [tenantHint]);

  return (
    <div className="login-page">
      {tenantHint && (
        <div className="mb-4 text-sm text-gray-600">
          Logging in as {tenantHint}
        </div>
      )}

      <h1>Admin Login</h1>
      {/* Login form */}
    </div>
  );
}
```

#### 3. Optional: Add Link in Client Site

```typescript
// frontend/src/components/Header.tsx
export function Header() {
  const navigate = useNavigate();

  return (
    <header>
      {/* Other nav items */}

      {/* Admin link (could be hidden, only shown when logged in as admin) */}
      <button
        onClick={() => navigate('/backoffice')}
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        Admin Panel
      </button>
    </header>
  );
}
```

---

## User Experience Comparison

### Scenario: Tenant admin wants to edit a listing

**Option 1 (Direct URL):**
```
1. Opens bookmark: admin.yourdomain.com
2. Logs in
3. Edits listing
```
**Clicks:** 3 | **Domain changes:** 0 (already on admin domain)

**Option 2 (Redirect - Recommended):**
```
1. Visits: newagency.com/backoffice
2. Redirected to: admin.yourdomain.com
3. Logs in
4. Edits listing
```
**Clicks:** 4 | **Domain changes:** 1 (redirect)

**Option 4 (Subdomain):**
```
1. Opens bookmark: admin-newagency.yourdomain.com
2. Logs in
3. Edits listing
```
**Clicks:** 3 | **Domain changes:** 0

---

## Migration Strategy

### Phase 1: Launch with Option 1 (Direct URL)
**Timeline: Now**
- Deploy admin backoffice to `admin.yourdomain.com`
- Provide clients with direct URL
- Simple, works immediately

### Phase 2: Add Redirect from Client Sites
**Timeline: 1-2 weeks after launch**
- Add `/backoffice` route to client sites
- Redirects to `admin.yourdomain.com?tenant=X`
- Better UX, minimal additional work

### Phase 3 (Optional): Subdomain Strategy
**Timeline: 3-6 months after launch (if needed)**
- Implement tenant-specific subdomains
- `admin-{tenant}.yourdomain.com`
- Fully white-labeled experience

---

## Security Considerations

### API Key vs Session Auth

**Public API (Client Sites):**
- Use API keys via `X-API-Key` header
- Each tenant has unique key

**Admin API (Backoffice):**
- Use JWT tokens via `Authorization: Bearer` header
- No API key needed (admin belongs to tenant)

**Why different?**
- Public sites are stateless (API key per request)
- Admin panel is stateful (login session with JWT)

### Cross-Domain Security

When using redirect (Option 2):

```typescript
// admin-backoffice/src/services/auth.ts
export async function login(email: string, password: string) {
  // No X-API-Key header needed
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // X-API-Key NOT needed - admin auth is different
    },
    credentials: 'include', // Include cookies
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  // Store JWT token
  localStorage.setItem('admin_token', data.token);
  localStorage.setItem('admin_role', data.admin.role);

  return data;
}
```

**Admin login doesn't require API key because:**
1. Admin's `tenant_id` (in database) determines their access scope
2. JWT token contains `admin_id` → lookup admin → get `tenant_id`
3. Automatic scoping to their tenant

---

## Code Changes Required

### For Option 2 (Recommended)

**Client Sites:** ~20 lines of code
```typescript
// 1 new component
// 1 route addition
// 2 env variables
```

**Admin Backoffice:** ~10 lines of code
```typescript
// Read tenant hint from URL (optional)
// Show tenant name (optional branding)
```

**Backend:** No changes needed

**Total effort:** ~30 minutes

---

## Final Recommendation

### Start with Option 2 (Redirect) because:

✅ **Simple to implement** - 30 minutes of work
✅ **Good UX** - Clients can use their domain
✅ **Flexible** - Can upgrade to Option 4 later
✅ **Secure** - No iframe/proxy complexity
✅ **Maintainable** - One admin app, one deployment

### Implementation Steps:

1. **Deploy admin backoffice** to `admin.yourdomain.com`
2. **Add redirect route** to each client site (`/backoffice`)
3. **Add environment variables** (`VITE_TENANT_SLUG`)
4. **Optional:** Handle tenant hint in admin login
5. **Done!** Clients can access via their own domain

### Client Communication:

```
Dear Client,

Your admin panel is now available at:
- Direct access: https://admin.yourdomain.com
- From your site: https://newagency.com/backoffice

Both URLs work and will redirect you to the same admin panel.
You'll be automatically scoped to your agency's data when you log in.

Login credentials:
Email: admin@newagency.com
Password: [provided separately]
```

---

## Summary

| Option | Complexity | UX | White-Label | Recommended |
|--------|-----------|-----|-------------|-------------|
| 1. Direct URL | ⭐ Easy | Good | No | For MVP |
| 2. Redirect | ⭐⭐ Easy | Better | Partial | ✅ **YES** |
| 3. Iframe | ⭐⭐⭐ Hard | Poor | Yes | ❌ No |
| 4. Subdomain | ⭐⭐⭐ Medium | Best | Yes | Future |
| 5. Proxy | ⭐⭐⭐⭐ Very Hard | Best | Yes | Overkill |

**Go with Option 2**, then optionally upgrade to Option 4 if clients demand fully white-labeled admin URLs.
