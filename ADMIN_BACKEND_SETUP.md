# Admin Backend Setup (GitHub Pages + PHP API)

Use this when your frontend is on GitHub Pages and you want `/admin` to show inquiry list.

## 1) Host the PHP API (InfinityFree/cPanel)

Upload these files to your PHP host `public_html/api/`:

- `api/contact.php`
- `api/submissions.php`
- `api/submissions.json` (create with `[]` if missing)

> Keep `submissions.php` and `contact.php` in the same `api` folder.

## 2) Set your admin key

Edit `api/submissions.php` on the server:

```php
define('ADMIN_KEY', 'YOUR_STRONG_SECRET_KEY');
```

Use this exact key on `https://nitulpatel.github.io/admin`.

## 3) Configure frontend to use backend API

Create `.env` in project root:

```env
VITE_API_URL=https://your-backend-domain.com
```

Example:

```env
VITE_API_URL=https://nitul-portfolio-api.infinityfreeapp.com
```

## 4) Build and deploy frontend

Run in VS Code terminal (project root):

```bash
npm run build
git add .
git commit -m "Connect admin/contact to hosted PHP backend"
git push origin main
```

GitHub Actions will deploy automatically.

## 5) Verify

- Contact form saves successfully.
- Open `https://nitulpatel.github.io/admin`.
- Enter `ADMIN_KEY`.
- You should see full inquiry list and export buttons working.

