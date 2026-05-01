# Contact Form — PHP Backend Setup & Deployment Guide

## Architecture Overview

```
portfolio/
├── src/
│   ├── components/Contact.tsx   ← React form (updated, calls PHP)
│   └── pages/AdminPage.tsx      ← Admin dashboard (updated, calls PHP)
├── api/
│   ├── contact.php              ← POST handler — saves JSON submission
│   ├── submissions.php          ← GET handler — returns list + CSV export
│   ├── submissions.json         ← Data store (auto-created if missing)
│   └── .htaccess                ← Blocks direct browser access to .json
└── vite.config.ts               ← Dev proxy: /api/* → PHP server
```

---

## Step 1 — Set Your Admin Key

Open `api/submissions.php` and change line 12:

```php
define('ADMIN_KEY', 'change-me-to-something-secret');
//                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                   Replace with your own secret (min 16 chars)
```

---

## Step 2 — Local Development

You need two terminals:

**Terminal 1 — PHP dev server** (serves the API):
```bash
php -S localhost:8080 -t api/
```

**Terminal 2 — Vite dev server** (serves React):
```bash
npm run dev
```

Vite automatically proxies `/api/*` → `http://localhost:8080/*`
so `fetch('/api/contact.php')` works in dev without CORS issues.

---

## Step 3 — Build for Production

```bash
npm run build
```

This produces a `dist/` folder with the built React app.

---

## Step 4 — Deploy to InfinityFree

InfinityFree gives you a `public_html/` folder. Upload like this:

```
public_html/
├── index.html           ← from dist/
├── assets/              ← from dist/assets/
├── api/
│   ├── contact.php
│   ├── submissions.php
│   ├── submissions.json   ← upload as empty file: []
│   └── .htaccess
└── .htaccess              ← SPA fallback (see below)
```

### Root .htaccess (for React Router SPA)

Create `public_html/.htaccess`:
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^ index.html [QSA,L]
```

This redirects all non-file, non-API URLs to `index.html` so
React Router handles `/contact`, `/admin`, etc.

### File permissions on InfinityFree

Set these via cPanel File Manager or FTP:
```
api/submissions.json  → 644  (PHP can write, web can't read directly)
api/                  → 755
```

---

## Step 5 — Access the Admin Panel

Visit: `https://yourdomain.com/admin`

Enter the key you set in `submissions.php`.

### Export options (inside admin panel):
- **Export CSV** — downloads via PHP, opens Excel correctly (UTF-8 BOM)
- **Export JSON** — downloads client-side blob, useful for backup

---

## API Reference

### POST /api/contact.php
Saves a form submission.

**Request body (JSON):**
```json
{
  "name":    "John Doe",
  "email":   "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello..."
}
```

**Response 201:**
```json
{ "message": "Submission saved successfully", "entry": { ... } }
```

**Response 400 / 500:**
```json
{ "error": "description" }
```

---

### GET /api/submissions.php?key=YOUR_KEY
Returns all submissions (newest first).

**Response 200:**
```json
{
  "total": 3,
  "submissions": [
    {
      "name": "...", "email": "...", "subject": "...",
      "message": "...", "ip": "...", "date": "2026-04-22T10:00:00+00:00"
    }
  ]
}
```

### GET /api/submissions.php?key=YOUR_KEY&export=csv
Downloads all submissions as a CSV file.

---

## Optional: Email Notifications

Open `api/contact.php`, find the commented block near the bottom,
and uncomment it. Replace `your@email.com` with your address.

InfinityFree's `mail()` works but may be rate-limited. For reliable
delivery, consider [Formspree](https://formspree.io) as a fallback.

---

## Security Notes

- `submissions.json` is protected by `.htaccess` — no one can download
  it directly via browser.
- All input is sanitized (`htmlspecialchars`, length-limited) before save.
- Admin key is compared with `!==` (strict equality, timing-safe enough
  for a personal portfolio).
- For extra security, move `submissions.json` one folder above
  `public_html/` (InfinityFree allows this) so it's not web-accessible
  even if `.htaccess` fails.
