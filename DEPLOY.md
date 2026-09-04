# Deployment Guide

The app deploys in three free pieces:

| Piece            | Host             | What it is                    |
| ---------------- | ---------------- | ----------------------------- |
| Database         | MongoDB Atlas    | Free cloud MongoDB (M0)       |
| Backend API      | Render           | Express server (`/api/...`)   |
| Frontend         | Vercel           | React (Vite) static site      |

Do them **in this order** (each step gives you a value the next one needs).

---

## 1. Database — MongoDB Atlas (free, ~5 min)

1. Go to <https://www.mongodb.com/cloud/atlas/register> and sign up (no card needed).
2. **Create a cluster** → pick **M0 (Free)** → any provider/region → **Create**.
3. **Database Access** (left sidebar) → **Add New Database User**:
   - Username: `oneifi` (or anything), set a password → **copy the password somewhere**.
   - Built-in role: **Read and write to any database** → **Add User**.
4. **Network Access** (left sidebar) → **Add IP Address** → **Allow Access from Anywhere**
   (`0.0.0.0/0`) → **Confirm**. (Render's IP isn't fixed, so this is required.)
5. **Clusters** → **Connect** → **Drivers** → copy the connection string. It looks like:

   ```
   mongodb+srv://oneifi:<db_password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. Replace `<db_password>` with the password from step 3, and add a database name
   (`1fi`) right before the `?`:

   ```
   mongodb+srv://oneifi:YOURPASSWORD@cluster0.xxxxx.mongodb.net/1fi?retryWrites=true&w=majority
   ```

   **Keep this final string** — it's your `MONGODB_URI`.

---

## 2. Backend API — Render (free)

1. Go to <https://render.com> → sign up with GitHub.
2. **New +** → **Blueprint** → connect and select the **`Manvi0408/1FI`** repo.
   Render reads [`render.yaml`](render.yaml) and proposes a service named **`1fi-api`** → **Apply**.
3. Open the **`1fi-api`** service → **Environment** tab → confirm/add:
   - `MONGODB_URI` = the Atlas string from step 1.6
   - `NODE_ENV` = `production`
4. **Save** → it redeploys. When it's live you'll get a URL like:

   ```
   https://1fi-api.onrender.com
   ```

5. Test it in your browser:
   - <https://1fi-api.onrender.com/api/health> → `{"status":"ok",...}`
   - <https://1fi-api.onrender.com/api/products> → JSON list of products

   > On first request after idle, Render's free tier takes ~30s to wake up. Normal.

**Copy your API URL** — the frontend needs it next.

---

## 3. Frontend — Vercel (free)

1. Go to <https://vercel.com> → sign up with GitHub.
2. **Add New… → Project** → import the **`Manvi0408/1FI`** repo.
3. In the import screen:
   - **Root Directory** → click **Edit** → choose **`frontend`**.
   - Framework Preset: **Vite** (auto-detected).
   - **Environment Variables** → add:
     - Name: `VITE_API_BASE`
     - Value: your Render URL **without a trailing slash**, e.g. `https://1fi-api.onrender.com`
4. **Deploy**. You'll get a URL like `https://1fi.vercel.app` — **that's your demo link.**

> Changed `VITE_API_BASE` later? Vite bakes env vars in at build time, so hit
> **Redeploy** on Vercel after changing it.

---

## 4. Final check

- Open your Vercel URL → products load, a product page opens at
  `/products/iphone-17-pro`, variants + EMI plans show, cart works.
- That Vercel URL is the **Deployed Demo Link** for the submission form.

## How it fits together

```
Browser ──▶ Vercel (React)  ──fetch──▶  Render (Express API)  ──▶  Atlas (MongoDB)
            VITE_API_BASE               /api/products                seeded on first boot
```

The API seeds the catalogue into Atlas automatically the first time it connects
to an empty database (see `seedIfEmpty` in `backend/server.js`).
