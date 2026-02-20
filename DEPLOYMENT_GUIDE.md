# Vercel Deployment Guide

Follow these steps to host MyEasyAgent on Vercel so your team can view it.

## 1. Prepare Your GitHub Repository
Ensure all latest updates are pushed to your GitHub repository. (I have already pushed the most recent changes for you).

## 2. Connect to Vercel
1.  **Sign Up/Login**: Go to [vercel.com](https://vercel.com) and sign up using your GitHub account.
2.  **Import Project**:
    *   Click **"Add New"** > **"Project"**.
    *   Find your repository (e.g., `EEPROM`) and click **"Import"**.

## 3. Configure Build Settings
Vercel usually detects Next.js settings automatically, but double-check these:
*   **Framework Preset**: Next.js
*   **Build Command**: `npm run build`
*   **Output Directory**: `.next`
*   **Install Command**: `npm install`

## 4. Deploy
1.  Click **"Deploy"**.
2.  Once finished, Vercel will provide a unique URL (e.g., `eeprom.vercel.app`) that anyone on your team can access.

## 5. Troubleshooting: "next build: command not found"
If you see the error `sh: line 1: next build: command not found`, it usually means the Vercel **Build Command** is incorrectly set.

### How to Fix:
1.  Go to your project in the **Vercel Dashboard**.
2.  Click on **Settings** > **General**.
3.  Scroll down to **Build & Development Settings**.
4.  Ensure **Build Command** is set to:
    *   `npm run build` (Preferred)
    *   **OR** toggle the "Override" switch **OFF** to let Vercel use the default setting.
5.  **CRITICAL**: Make sure there are **NO single or double quotes** around the command (e.g., do NOT use `'next build'` or `"next build"`).
6.  Click **Save** and click **Redeploy** from the "Deployments" tab.

## 6. Team Access
To let team members see deployments:
1.  In your Vercel Dashboard, go to the project **Settings** > **Members**.
2.  Invite them via email or share the deployment URL.

> [!TIP]
> Every time you push to the `main` branch from now on, Vercel will automatically redeploy the latest version.
