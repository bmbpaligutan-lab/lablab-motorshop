# LABLAB MOTORSHOP — GitHub Pages + Supabase

This version removes PHP/MySQL. The frontend is static HTML/CSS/JavaScript and the backend is Supabase.

## 1. Supabase
1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase_schema.sql` completely.
4. Authentication → Users → Add user:
   - Email: `admin@lablab.com`
   - Password: `admin123`
5. Run:
   ```sql
   update public.profiles set role='admin', username='admin' where email='admin@lablab.com';
   ```
6. Authentication → URL Configuration: add your GitHub Pages URL to Site URL / Redirect URLs if email confirmation or recovery is used.

## 2. Configure the website
Edit `assets/js/config.js`:
```js
export const SUPABASE_URL = 'https://YOUR-PROJECT-REF.supabase.co';
export const SUPABASE_ANON_KEY = 'YOUR-PUBLISHABLE-OR-ANON-KEY';
```
Use only the public/publishable/anon key. NEVER put a `service_role` or secret key in this repository.

## 3. GitHub Pages
Upload the CONTENTS of this folder to the root of a GitHub repository. Enable Settings → Pages → Deploy from branch → main → /(root).

Open the generated GitHub Pages URL. The login page is `auth/login.html`.

## Important
This package is a corrected GitHub Pages/Supabase foundation. The database, authentication, role routing, dashboard data, catalog, branches, stock display, bookings display, transactions display, and RLS are connected. The more advanced workflows from the old PHP server (full POS checkout, atomic stock deduction, PDF report generation, and complete admin account provisioning) should be implemented as Supabase RPC/Edge Functions before production use.
