# Deployment Guide

This document covers deployment instructions for the HireHub Onboarding Portal. The application is a client-only single-page application (SPA) built with Vite and React — no backend or environment variables are required.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Configuration](#build-configuration)
- [Vercel Deployment](#vercel-deployment)
  - [Option 1: GitHub Integration (Recommended)](#option-1-github-integration-recommended)
  - [Option 2: Vercel CLI](#option-2-vercel-cli)
- [SPA Rewrite Configuration](#spa-rewrite-configuration)
- [Environment Variables](#environment-variables)
- [CI/CD Notes](#cicd-notes)
- [Other Hosting Providers](#other-hosting-providers)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm v8 or higher (included with Node.js)
- A [Vercel](https://vercel.com/) account (for Vercel deployment)
- A GitHub, GitLab, or Bitbucket repository containing the project source code

---

## Build Configuration

The project uses [Vite](https://vitejs.dev/) as its build tool. The relevant build settings are:

| Setting          | Value            |
| ---------------- | ---------------- |
| Build Command    | `npm run build`  |
| Output Directory | `dist`           |
| Install Command  | `npm install`    |
| Dev Command      | `npm run dev`    |
| Framework        | Vite + React 18  |

To verify the build locally before deploying:

```bash
# Install dependencies
npm install

# Run the production build
npm run build

# Preview the production build locally
npm run preview
```

The `npm run build` command compiles the application into the `dist` directory, producing static HTML, CSS, and JavaScript files ready for deployment.

---

## Vercel Deployment

### Option 1: GitHub Integration (Recommended)

This is the recommended approach as it enables automatic deployments on every push.

1. **Push your code** to a GitHub repository.

2. **Log in** to [Vercel](https://vercel.com/) and click **"Add New Project"**.

3. **Import** your GitHub repository by selecting it from the list. Grant Vercel access to the repository if prompted.

4. **Configure the project** settings. Vercel should auto-detect the Vite framework, but verify the following:

   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Environment Variables:** No environment variables are required. Leave this section empty.

6. Click **"Deploy"** and wait for the build to complete.

7. Once deployed, Vercel will provide a production URL (e.g., `https://your-project.vercel.app`). All subsequent pushes to the main branch will trigger automatic redeployments.

#### Auto-Deploy Behavior

- **Production deployments** are triggered on pushes to the main/master branch.
- **Preview deployments** are created automatically for pull requests and non-production branches. Each preview deployment gets a unique URL for testing.

### Option 2: Vercel CLI

If you prefer deploying from the command line:

1. **Install the Vercel CLI** globally:

   ```bash
   npm install -g vercel
   ```

2. **Log in** to your Vercel account:

   ```bash
   vercel login
   ```

3. **Navigate** to the project root directory:

   ```bash
   cd hirehub-onboarding-portal
   ```

4. **Deploy** the project:

   ```bash
   # Preview deployment
   vercel

   # Production deployment
   vercel --prod
   ```

5. Follow the CLI prompts to link the project to your Vercel account. The CLI will auto-detect the Vite configuration.

---

## SPA Rewrite Configuration

Since this is a single-page application using client-side routing (React Router v6), all routes must be rewritten to serve `index.html`. This ensures that direct navigation to paths like `/apply` or `/admin` works correctly instead of returning a 404 error.

The project includes a `vercel.json` file at the repository root with the following configuration:

```json
{
  "rewrites": [
    { "source": "/:path*", "destination": "/index.html" }
  ]
}
```

**How it works:**

- Any request to a path that does not match a static file in the `dist` directory is rewritten to `/index.html`.
- React Router then reads the URL and renders the appropriate component on the client side.
- This covers all application routes: `/` (Home), `/apply` (Interest Form), and `/admin` (Admin Dashboard/Login).

> **Note:** The `vercel.json` file is automatically picked up by Vercel during deployment. No additional configuration is needed.

---

## Environment Variables

This application is entirely client-side and **does not require any environment variables** to build or run.

- There is no backend API to connect to.
- All data is persisted in the browser's `localStorage`.
- Authentication uses hardcoded demo credentials (`admin` / `admin`) stored in `sessionStorage`.

Refer to the `.env.example` file in the repository root for confirmation:

```
# HireHub Onboarding Portal - Environment Variables
# This is a client-only application with no backend dependencies.
# No environment variables are required to run this project.
```

If you extend the application in the future to include API integrations, add your variables to Vercel under **Project Settings → Environment Variables** and prefix client-side variables with `VITE_` so Vite exposes them to the browser (e.g., `VITE_API_URL`).

---

## CI/CD Notes

### Automatic Deployments with Vercel + GitHub

When using the GitHub integration, Vercel provides a fully managed CI/CD pipeline out of the box:

1. **Push to main branch** → Triggers a production deployment.
2. **Open a pull request** → Triggers a preview deployment with a unique URL.
3. **Merge the pull request** → Triggers a new production deployment.

No additional CI/CD configuration (e.g., GitHub Actions, CircleCI) is required for basic deployment workflows.

### Adding Custom CI Steps

If you want to add linting, testing, or other checks before deployment, you can:

- **Use Vercel's Build Settings:** Add pre-build commands in the Vercel dashboard under **Project Settings → General → Build & Development Settings**. For example, set the build command to:

  ```bash
  npm run lint && npm run test && npm run build
  ```

- **Use GitHub Actions:** Create a `.github/workflows/ci.yml` file to run checks on pull requests independently of Vercel:

  ```yaml
  name: CI
  on:
    pull_request:
      branches: [main]
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - uses: actions/setup-node@v4
          with:
            node-version: 18
        - run: npm install
        - run: npm run build
  ```

### Branch Deploy Configuration

By default, Vercel deploys all branches. To restrict deployments to specific branches:

1. Go to **Project Settings → Git** in the Vercel dashboard.
2. Under **Production Branch**, confirm it is set to `main` (or your preferred branch).
3. Under **Ignored Build Step**, you can add a custom script to skip builds for certain branches if needed.

---

## Other Hosting Providers

While this project is configured for Vercel, the static output can be deployed to any static hosting provider. The key requirement is configuring SPA fallback rewrites.

### Netlify

Create a `public/_redirects` file:

```
/*    /index.html   200
```

Or create a `netlify.toml` at the repository root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

GitHub Pages does not natively support SPA rewrites. A common workaround is to use a custom `404.html` that redirects to `index.html`. Consider using a package like [spa-github-pages](https://github.com/rafgraph/spa-github-pages) for this approach.

### Static Server (e.g., Nginx)

Add a fallback rule to your Nginx configuration:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## Troubleshooting

### 404 Errors on Direct Navigation

If navigating directly to `/apply` or `/admin` returns a 404 error, the SPA rewrite is not configured correctly. Ensure `vercel.json` is present at the repository root and contains the rewrite rule described above.

### Build Failures

1. Ensure you are using Node.js v16 or higher:
   ```bash
   node --version
   ```
2. Delete `node_modules` and `package-lock.json`, then reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```
3. Check the Vercel build logs under **Deployments → [Latest Deployment] → Build Logs** for specific error messages.

### Stale Data After Redeployment

Since all data is stored in the user's browser `localStorage`, redeploying the application does not affect existing data. Users will retain their submissions across deployments. To clear data, users must manually clear their browser storage or the admin must delete submissions through the dashboard.

### Cache Issues

If changes are not reflected after deployment, try:

- Hard-refreshing the browser (`Ctrl+Shift+R` or `Cmd+Shift+R`).
- Clearing the browser cache.
- Vercel automatically handles cache invalidation for new deployments, but CDN propagation may take a few moments.