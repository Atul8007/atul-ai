# Atul Mundakkal — Developer Portfolio

Personal developer portfolio for **Atul Mundakkal** (Shopify Developer & Full-Stack Developer), designed for static hosting on **Cloudflare Pages** (Zero Budget architecture).

## Project Structure

```text
portfolio/
├── index.html         # Main HTML document
├── style.css          # Design system & styles
├── script.js           # Lightweight interactive scripts
├── assets/
│   ├── images/        # Project and profile media
│   └── icons/         # SVG icons
├── htmlviewer.html    # Interactive terminal portfolio demo
└── README.md          # Documentation & deployment guide
```

---

## Local Development

To view the site locally:

1. Open `index.html` directly in your browser, or
2. Use VS Code Live Server extension, or run a simple local HTTP server:
   ```bash
   npx serve .
   ```

---

## Cloudflare Pages Deployment Guide

Deploying to Cloudflare Pages is 100% free with automated deployment via GitHub.

### Step-by-Step Deployment Instructions

1. **GitHub Repository**:
   Ensure your code is pushed to your GitHub repository:
   `https://github.com/Atul8007/atul-web.git` (branch: `main`).

2. **Log into Cloudflare**:
   Go to [dash.cloudflare.com](https://dash.cloudflare.com) and log into your free Cloudflare account.

3. **Navigate to Workers & Pages**:
   In the left sidebar, click **Workers & Pages**.

4. **Create a Pages Project**:
   Click **Create application** → Select the **Pages** tab → Click **Connect to Git**.

5. **Connect GitHub Account**:
   Grant Cloudflare Pages permission to access your GitHub account and select the **`Atul8007/atul-web`** repository.

6. **Configure Deployment**:
   - **Project name**: `atul-web` (or custom name)
   - **Production branch**: `main`
   - **Framework preset**: `None`
   - **Build command**: *(Leave blank - pure static site)*
   - **Build output directory**: `/` or `.` *(Root directory)*

7. **Save and Deploy**:
   Click **Save and Deploy**. Cloudflare will automatically build and publish your static portfolio site within seconds.

8. **Access Your Live Site**:
   Cloudflare will provide your free deployment URL:
   `https://<project-name>.pages.dev`

---

## Optional: Custom Domain Setup

If you decide to link a custom domain in the future:
1. In Cloudflare Pages, navigate to your project → **Custom Domains**.
2. Click **Set up a custom domain** and enter your domain name.
3. If your domain's DNS is managed on Cloudflare, the CNAME record will automatically be created.

---

## Architecture Principles

- **Zero Budget**: Uses free Cloudflare Pages hosting and GitHub.
- **Static First**: Built using standard HTML5, CSS3, and Vanilla JavaScript.
- **Lightning Fast**: No framework bloat, minimal bundle size.
