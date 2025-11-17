# Deploying to Vercel

This guide covers deploying your VDO.Ninja Webinar POC to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier is sufficient)
- Git installed (optional, for CLI method)

---

## Method 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Prepare Your Project

1. Create a GitHub/GitLab/Bitbucket repository
2. Push your webinar folder to the repository:

```bash
cd E:\Work\webinar
git init
git add .
git commit -m "Initial commit: VDO.Ninja Webinar POC"
git branch -M main
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select **"Import Git Repository"**
4. Choose your repository
5. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
6. Click **"Deploy"**

### Step 3: Done!

Your webinar will be live at: `https://your-project-name.vercel.app`

---

## Method 2: Deploy via Vercel CLI (Fastest)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
cd E:\Work\webinar
vercel
```

Follow the prompts:
- **Set up and deploy?** Y
- **Which scope?** (Select your account)
- **Link to existing project?** N
- **Project name?** vdo-ninja-webinar-poc (or your choice)
- **Directory?** ./ (press Enter)
- **Override settings?** N

### Step 4: Production Deploy

After the preview deployment succeeds:

```bash
vercel --prod
```

Your site is now live!

---

## Method 3: Drag & Drop (No Git Required)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Drag the entire `E:\Work\webinar` folder onto the dashboard
3. Vercel will automatically deploy it
4. Done!

---

## Post-Deployment Configuration

### Custom Domain (Optional)

1. Go to your project settings on Vercel
2. Click **"Domains"**
3. Add your custom domain
4. Update DNS records as instructed

### Environment Variables (If needed later)

1. Go to **Settings** → **Environment Variables**
2. Add any API keys or configuration

### HTTPS & Permissions

Vercel automatically provides:
- ✅ HTTPS (required for camera/microphone access)
- ✅ SSL certificate
- ✅ CDN (global edge network)
- ✅ Automatic deployments on git push

---

## Testing After Deployment

1. Visit your Vercel URL
2. Test camera/microphone permissions (HTTPS enables this)
3. Create a room and test:
   - Host broadcasting
   - Viewer watching
   - Control panel functionality
4. Test on mobile devices

---

## Troubleshooting

### Camera/Mic Not Working
- Ensure you're using HTTPS (Vercel provides this automatically)
- Check browser permissions
- Try a different browser

### 404 Errors
- Check `vercel.json` routing configuration
- Ensure all files are in the root directory

### Slow Loading
- Vercel provides automatic CDN
- Check your internet connection
- Test from different locations

---

## Vercel Deployment Benefits

✅ **Free HTTPS** - Required for WebRTC
✅ **Global CDN** - Fast worldwide
✅ **Auto SSL** - Automatic certificate renewal
✅ **Edge Network** - Low latency
✅ **CI/CD** - Auto-deploy on git push
✅ **Preview URLs** - Test before production
✅ **Analytics** - Built-in traffic insights
✅ **Zero Config** - Works out of the box

---

## Sharing with Client

Once deployed, share:
- **Live URL**: `https://your-project.vercel.app`
- **Host Link**: `https://your-project.vercel.app/host.html?room=demo`
- **Viewer Link**: `https://your-project.vercel.app/viewer.html?room=demo`
- **Control Panel**: `https://your-project.vercel.app/control.html?room=demo`

---

## Next Steps

After successful deployment:
1. ✅ Test all features on the live URL
2. ✅ Share with your client
3. ✅ Gather feedback
4. ✅ Customize branding/colors if needed
5. ✅ Set up custom domain (optional)

---

## Support

- Vercel Docs: https://vercel.com/docs
- VDO.Ninja Docs: https://docs.vdo.ninja
- Vercel Support: https://vercel.com/support

---

**Your webinar POC is now production-ready and globally accessible!** 🚀
