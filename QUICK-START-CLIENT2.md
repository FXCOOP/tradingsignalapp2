# 🚀 Quick Start - Client 2 Deployment

## ✅ What's Been Done

1. ✓ **Repository Created**
   - Original `tradingsignalapp` cloned
   - Duplicate created as `tradingsignalapp2`
   - Pushed to: https://github.com/FXCOOP/tradingsignalapp2
   - Local path: `C:\Users\User\OneDrive\Desktop\tradingsignalapp2`

2. ✓ **Files Included**
   - All 208 files from original app
   - Complete Next.js trading signal application
   - Admin dashboard
   - API endpoints
   - Database schema files

3. ✓ **Documentation Added**
   - Comprehensive HTML deployment guide
   - Step-by-step Render setup instructions
   - Subdomain configuration guide
   - Environment variables reference

---

## 🎯 Next Steps (What YOU Need to Do)

### Step 1: Deploy to Render (15 minutes)

1. **Go to Render**
   - Visit: https://dashboard.render.com
   - Click `New +` → `Web Service`

2. **Connect Repository**
   - Select: `FXCOOP/tradingsignalapp2`
   - Click `Connect`

3. **Configure Service**
   ```
   Name: tradingsignalapp-client2
   Region: Oregon
   Branch: main
   Build Command: npm ci && npm run build
   Start Command: npm start
   Plan: Free (or Starter $7/month for always-on)
   ```

4. **Add Environment Variables** (CRITICAL!)
   ```
   NODE_ENV=production
   OPENAI_API_KEY=<your_openai_key>
   SUPABASE_URL=<your_supabase_url>
   SUPABASE_ANON_KEY=<your_supabase_anon_key>
   SUPABASE_SERVICE_ROLE_KEY=<your_supabase_service_key>
   EXNESS_AFFILIATE_ID=<client2_exness_id>
   ```

5. **Click `Create Web Service`**
   - Wait 3-5 minutes for build
   - You'll get: `https://tradingsignalapp-client2.onrender.com`

---

### Step 2: Setup Custom Subdomain (10 minutes)

1. **In Render Dashboard**
   - Go to your service → `Settings`
   - Scroll to `Custom Domains`
   - Click `Add Custom Domain`
   - Enter: `client2.yourdomain.com` (or any subdomain)

2. **Configure DNS (at your domain registrar)**
   ```
   Type: CNAME
   Name: client2
   Value: tradingsignalapp-client2.onrender.com
   TTL: 3600
   ```

3. **Wait for DNS Propagation** (15-30 minutes)
   - Test at: https://dnschecker.org

---

### Step 3: Setup Separate Database (20 minutes)

**Important:** Each client should have their own database!

1. **Create New Supabase Project**
   - Go to: https://supabase.com/dashboard
   - Click `New Project`
   - Name: `tradingsignalapp-client2`
   - Choose region: Closest to client's users

2. **Copy Database Credentials**
   - Go to: Settings → API
   - Copy:
     - Project URL
     - anon/public key
     - service_role key (secret)

3. **Update Render Environment Variables**
   - Replace old Supabase credentials with new ones
   - Service will auto-restart

4. **Run Database Migrations**
   - Use SQL files in repo:
     - `SUPABASE-COMPLETE-DATABASE-SETUP.sql`
     - Or individual migration files

---

### Step 4: Customize for Client 2 (30 minutes)

1. **Update Branding**
   - Edit: `src/app/layout.tsx`
   - Change title, description, metadata

2. **Update Exness Affiliate ID**
   - Already set in environment variables
   - Verify in Render dashboard

3. **Test Everything**
   - Visit your Render URL
   - Sign up / Login
   - Check trading signals
   - Test Exness links
   - Verify admin dashboard

---

## 📋 Environment Variables Checklist

| Variable | Required | Where to Get |
|----------|----------|--------------|
| `NODE_ENV` | ✓ | Set to `production` |
| `OPENAI_API_KEY` | ✓ | https://platform.openai.com/api-keys |
| `SUPABASE_URL` | ✓ | Supabase Dashboard → Settings → API |
| `SUPABASE_ANON_KEY` | ✓ | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | ✓ | Supabase Dashboard → Settings → API |
| `EXNESS_AFFILIATE_ID` | ✓ | Client 2's Exness account |
| `RESEND_API_KEY` | Optional | https://resend.com (for emails) |

---

## 🔧 Maintenance

### Update Code
```bash
cd C:\Users\User\OneDrive\Desktop\tradingsignalapp2
# Make changes to files
git add .
git commit -m "Your changes"
git push origin main
# Render will auto-deploy
```

### View Logs
- Render Dashboard → Your Service → `Logs` tab

### Manual Redeploy
- Render Dashboard → Your Service → `Manual Deploy`

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| Render | Free | $0/month (spins down after 15 min) |
| Render | Starter | $7/month (always on - **RECOMMENDED**) |
| Supabase | Free | $0/month (500MB DB, 2GB bandwidth) |
| OpenAI API | Pay-as-you-go | ~$10-20/month |
| **TOTAL** | | **$10-27/month** |

---

## 🆘 Troubleshooting

### Build Failed?
- Check environment variables are set
- View build logs for specific error
- Try: `Clear build cache & deploy`

### Service Won't Start?
- Verify all required env vars are set
- Check start command: `npm start`
- View runtime logs

### Database Issues?
- Verify Supabase credentials are correct
- Check database tables exist (run migrations)
- Test connection from local first

---

## 📚 Full Documentation

For detailed step-by-step instructions with screenshots and examples:
👉 **Open: `RENDER-DEPLOYMENT-CLIENT2-GUIDE.html`** (in this folder)

---

## ✅ Deployment Checklist

- [ ] Render service created and deployed
- [ ] All environment variables added
- [ ] Application is accessible
- [ ] Custom domain/subdomain configured
- [ ] DNS records updated
- [ ] Separate Supabase database created
- [ ] Database migrations run
- [ ] Exness affiliate ID updated
- [ ] Branding customized for Client 2
- [ ] All features tested
- [ ] Uptime monitoring setup (if free tier)
- [ ] Cron jobs configured for daily signals

---

## 🎉 You're Done!

Your Client 2 instance is now ready to use at:
- Render URL: `https://tradingsignalapp-client2.onrender.com`
- Custom domain: `https://client2.yourdomain.com` (after DNS setup)

**Need help?** Check the full HTML guide or contact support.
