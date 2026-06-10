# Next Step Senior Consulting — live site

This folder is the complete, self-contained website. Deploy the **entire folder**.

## Files
- `index.html` — the site
- `styles.css`, `app.js` — styles & behavior
- `assets/` — logo, mark, photos
- `netlify.toml` — Netlify config (no build step)

---

## Option A — Drag & drop (fastest, recommended)
1. Go to **https://app.netlify.com/drop**
2. Drag this whole folder onto the page → it's instantly live at a `*.netlify.app` URL.
3. To update later: drag the new folder again (it replaces the old deploy).

## Option B — GitHub auto-deploy (for version control / a developer)
1. Create a new GitHub repo and upload the contents of this folder to its root.
2. In Netlify: **Add new site → Import an existing project → GitHub →** pick the repo.
3. Build command: *(leave blank)*. Publish directory: `.`  → Deploy.
4. Future edits committed to the repo auto-deploy.

---

## Connect your domain (next-step.place)
1. Netlify: **Domain settings → Add a domain →** `next-step.place`.
2. Follow Netlify's DNS instructions at Squarespace (where the domain is registered),
   or point Squarespace's nameservers to Netlify. HTTPS is automatic.

## Email notifications (contact form)
The form is named **contact** (Netlify Forms picks it up automatically).
1. Netlify: **Forms → contact → Settings → Add notification → Email notification.**
2. Add **info@next-step.place**.
3. Add a **second** email notification for **keith@next-step.place** (gets every submission too).

## Google reviews
The Families section pulls live from your Elfsight widget — it updates on its own,
no redeploy needed.
