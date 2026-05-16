# Deployment Guide: Cloudflare Pages + Render Web Service

This guide explains how to deploy your ScrollFlix project with the frontend on Cloudflare Pages and the backend on Render.

## 1. Backend Deployment (Render)

We have configured the backend to be deployed easily to Render.

1. Push this repository to GitHub.
2. Log in to [Render.com](https://render.com) and create a new **Web Service**.
3. Select your repository.
4. Render should automatically detect the `render.yaml` configuration file and set up the service.
   - If it doesn't, select the `backend` directory as the Root Directory.
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Since Render's file system is ephemeral, we have configured a **Disk** in `render.yaml` named `scrollix-data` mounted at `/data`. This ensures that your `scrollix.db` database and uploaded images are preserved across deployments.
6. Once deployed, note down your Render URL (e.g., `https://scrollix-backend.onrender.com`).

## 2. Frontend Configuration

Before deploying the frontend, you need to point it to your newly deployed Render backend.

1. Open `frontend/js/config.js`.
2. Update the `API_BASE_URL` variable to your Render URL:
   ```javascript
   let API_BASE_URL = "https://scrollix-backend.onrender.com";
   ```
3. Commit and push this change to GitHub.

## 3. Frontend Deployment (Cloudflare Pages)

We have added a `_redirects` file to the frontend directory so that Cloudflare handles routing correctly.

1. Log in to [Cloudflare Pages](https://pages.cloudflare.com/).
2. Create a new **Pages project** and connect your GitHub repository.
3. Configure the build settings:
   - **Framework preset**: `None`
   - **Build command**: Leave empty.
   - **Build output directory**: `frontend` (Important: since your HTML files are inside the `frontend` folder, this must be set accurately).
4. Save and deploy.
5. Note down your Cloudflare Pages URL (e.g., `https://your-frontend.pages.dev`).

## 4. Finalizing Environment Variables

Go back to your **Render Web Service** dashboard -> **Environment** tab:
- Add a new environment variable `FRONTEND_URL` and set it to your Cloudflare Pages URL (e.g., `https://your-frontend.pages.dev`).
- This ensures that Cross-Origin Resource Sharing (CORS) is properly configured, allowing the frontend to securely communicate with the backend.

You are now fully deployed!
