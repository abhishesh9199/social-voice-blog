# Complete Deployment Guide: Social Voice Blog on Render.com

## 📋 Table of Contents
1. Prerequisites
2. Local Setup
3. Database Setup (MongoDB Atlas)
4. GitHub Repository Setup
5. Render.com Deployment
6. Post-Deployment Configuration
7. Domain Setup
8. Monitoring & Maintenance

---

## 1. Prerequisites

Before you begin, ensure you have:
- A GitHub account (free tier is fine)
- A Render.com account (free tier available)
- A MongoDB Atlas account (free tier available)
- Node.js 18.x installed locally
- Git installed on your computer
- A code editor (VS Code recommended)

---

## 2. Local Setup

### Step 2.1: Create Project Directory
```bash
mkdir social-voice-blog
cd social-voice-blog
```

### Step 2.2: Initialize Node.js Project
```bash
npm init -y
npm install express cors dotenv mongoose bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

### Step 2.3: Create Project Structure
```
social-voice-blog/
├── server.js
├── package.json
├── .env.example
├── .gitignore
├── README.md
└── public/
    └── index.html (optional - for serving React frontend)
```

### Step 2.4: Create .gitignore
```bash
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore
```

### Step 2.5: Create .env file (Local Development)
Copy .env.example to .env and update with your local MongoDB URL:
```bash
cp .env.example .env
```

### Step 2.6: Test Locally
```bash
npm start
# Server should run on http://localhost:5000
# Test: curl http://localhost:5000/api/health
```

---

## 3. Database Setup (MongoDB Atlas)

### Step 3.1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Register" and create a free account
3. Verify your email address

### Step 3.2: Create a Free Cluster
1. Click "Create" under the Clusters section
2. Select the **M0 Shared** (Free tier)
3. Choose a region closest to your users (India: Singapore or Mumbai if available)
4. Click "Create Cluster" (takes 2-3 minutes)

### Step 3.3: Add IP Address to Allow List
1. In the Security section, click "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (for development)
   - **Note:** For production, add only Render's IP addresses
4. Click "Confirm"

### Step 3.4: Create Database User
1. In Security section, click "Database Access"
2. Click "Add New Database User"
3. Create username: `blogadmin`
4. Create password: Use a strong password (save this!)
5. Set permissions: "Atlas admin"
6. Click "Create Database User"

### Step 3.5: Get Connection String
1. Click "Database" in the left menu
2. Click "Connect" on your cluster
3. Select "Drivers"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your credentials
6. Replace `myFirstDatabase` with `social-voice-blog`

Example:
```
mongodb+srv://blogadmin:password@cluster0.xxxxx.mongodb.net/social-voice-blog?retryWrites=true&w=majority
```

### Step 3.6: Update .env File
```
MONGODB_URI=mongodb+srv://blogadmin:your-password@cluster0.xxxxx.mongodb.net/social-voice-blog?retryWrites=true&w=majority
```

### Step 3.7: Test Connection
```bash
npm start
# You should see "MongoDB connected" in console
```

---

## 4. GitHub Repository Setup

### Step 4.1: Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Social Voice Blog setup"
```

### Step 4.2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `social-voice-blog`
3. Description: "A responsive blog platform focused on social issues"
4. Set to **Public** (required for free Render deployment)
5. Click "Create repository"

### Step 4.3: Push to GitHub
```bash
git remote add origin https://github.com/your-username/social-voice-blog.git
git branch -M main
git push -u origin main
```

### Step 4.4: Create Production .env Secrets
**Important:** Never push .env to GitHub!
- Your .gitignore already prevents this
- You'll add secrets directly in Render.com dashboard

---

## 5. Render.com Deployment

### Step 5.1: Create Render Account
1. Go to https://render.com
2. Click "Sign up"
3. Connect your GitHub account
4. Authorize Render

### Step 5.2: Deploy Backend Service
1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Select the `social-voice-blog` repository
5. Fill in deployment settings:
   - **Name:** `social-voice-api` (or any name)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (good for testing)

### Step 5.3: Add Environment Variables
1. In the Web Service settings, scroll to "Environment"
2. Click "Add Environment Variable"
3. Add each variable from your .env:

```
MONGODB_URI = mongodb+srv://blogadmin:your-password@...
PORT = 5000
NODE_ENV = production
JWT_SECRET = your-super-secret-key-change-this
BLOG_TITLE = Social Voice
```

**Important Variables:**
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `NODE_ENV` - Set to `production`
- All other secrets from .env.example

### Step 5.4: Deploy
1. Click "Deploy"
2. Wait for deployment to complete (2-3 minutes)
3. You'll get a public URL like: `https://social-voice-api.onrender.com`

### Step 5.5: Test Deployment
```bash
curl https://social-voice-api.onrender.com/api/health
# Should return: {"status":"OK","message":"Blog API is running"}
```

---

## 6. Deploy Frontend (React App)

### Step 6.1: Create React App (Alternative to Vite)
If you want to serve the React app from the same Render service:

1. Create a public/index.html file that references your React app bundle
2. Or deploy separately on Vercel/Netlify (recommended for React)

### Step 6.2: Deploy on Vercel (Recommended for React)
1. Go to https://vercel.com
2. Import your GitHub repository
3. Set Frontend URL environment variable in Render to point to Vercel URL

### Step 6.3: Update API Endpoints in Frontend
```javascript
// In your React component
const API_URL = 'https://social-voice-api.onrender.com/api';
```

---

## 7. Post-Deployment Configuration

### Step 7.1: Verify Services
1. Test API: `https://your-api-url.onrender.com/api/health`
2. Test Frontend: `https://your-frontend-url.vercel.app`
3. Check MongoDB: Verify data is being stored in Atlas

### Step 7.2: Add Initial Blog Posts
```bash
# Using curl to add a blog post
curl -X POST https://your-api-url.onrender.com/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Silent Burden: Understanding Dowry System",
    "excerpt": "Dowry remains one of the most persistent social evils...",
    "content": "Full article content here...",
    "author": "Your Name",
    "category": "Social Issues",
    "image": "bg-gradient-to-r from-purple-500 to-pink-500"
  }'
```

### Step 7.3: Test All Features
- [ ] Can view homepage
- [ ] Can search blogs
- [ ] Can read individual blog posts
- [ ] Read counter increments
- [ ] Comments can be posted
- [ ] Stats page loads correctly

---

## 8. Domain Setup (Optional)

### Step 8.1: Connect Custom Domain to Render
1. Buy a domain (Namecheap, GoDaddy, etc.)
2. In Render dashboard, go to your Web Service
3. Click "Settings" → "Custom Domain"
4. Enter your domain name
5. Update your domain's DNS records:
   - Type: `CNAME`
   - Name: `www` (or your subdomain)
   - Value: Your Render URL

### Step 8.2: Enable HTTPS
Render automatically provides SSL certificates for free.

---

## 9. Monitoring & Maintenance

### Step 9.1: Set Up Monitoring
1. In Render dashboard, enable "Notifications"
2. Get alerts for deployment failures
3. Monitor logs under "Logs" tab

### Step 9.2: Enable Auto-Deploy
1. Go to Web Service Settings
2. Enable "Auto-Deploy" from main branch
3. Every push to GitHub automatically deploys

### Step 9.3: Regular Backups
1. In MongoDB Atlas, go to "Backup" section
2. Enable automated daily backups
3. Download backups regularly

### Step 9.4: Monitor Database
1. Check MongoDB Atlas dashboard weekly
2. Monitor storage usage (free tier has limits)
3. Set up alerts for high usage

---

## 10. Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
1. Verify MONGODB_URI in Render environment variables
2. Check IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
3. Test connection string locally first

### Issue: "Build fails on Render"
**Solution:**
```bash
# Check build logs in Render dashboard
# Ensure all dependencies are in package.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Issue: "Free tier service spins down"
**Solution:**
- Render spins down idle services after 15 minutes
- Consider upgrading to a paid plan for production
- Or keep services active with monitoring pings

### Issue: "CORS errors in frontend"
**Solution:**
```javascript
// In server.js, update CORS:
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

---

## 11. Performance Optimization

### Database Optimization
```javascript
// Add indexes in MongoDB for faster queries
db.blogs.createIndex({ slug: 1 })
db.blogs.createIndex({ category: 1 })
db.blogs.createIndex({ date: -1 })
```

### Caching
Consider adding Redis (free tier available on Render):
```javascript
// Install: npm install redis
const redis = require('redis');
const client = redis.createClient();
```

### CDN for Assets
- Images: Use MongoDB's file storage or Cloudinary (free tier)
- Static files: Render serves them automatically

---

## 12. Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS (automatic on Render)
- [ ] Set MONGODB_URI with secure password
- [ ] Don't commit .env to GitHub
- [ ] Enable MongoDB IP whitelist for production
- [ ] Add rate limiting for API endpoints
- [ ] Validate all user inputs
- [ ] Sanitize database queries
- [ ] Regular security updates

---

## 13. Next Steps

1. **Add Admin Dashboard:** Build authentication for blog creation
2. **Email Notifications:** Send alerts for new comments
3. **SEO Optimization:** Add meta tags and sitemap
4. **Analytics:** Integrate Google Analytics
5. **Social Sharing:** Add share buttons
6. **Newsletter:** Implement email subscription
7. **Search Enhancement:** Add Algolia or Elasticsearch
8. **Backup Strategy:** Implement automated backups

---

## 14. Useful Commands

```bash
# Local development
npm start

# Deploy specific branch
git push origin feature-branch

# View Render logs
# Go to Render dashboard → Web Service → Logs

# Test API endpoint
curl https://your-api.onrender.com/api/blogs

# SSH into service (not available on free tier)
# Use for paid tiers only

# Clear MongoDB data
# In MongoDB Atlas, delete collection and recreate
```

---

## 15. Cost Estimation

| Service | Plan | Cost/Month |
|---------|------|-----------|
| Render.com | Free | $0 |
| MongoDB Atlas | Free | $0 |
| Domain (Namecheap) | .com | ~$8 |
| **Total** | | ~$8 |

**Paid Tier (recommended for production):**
- Render: $7/month (starter plan)
- MongoDB: $9/month (shared cluster)
- Total: ~$17/month

---

## 16. Support & Resources

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas Docs:** https://www.mongodb.com/docs/atlas/
- **Express.js Guide:** https://expressjs.com/
- **React Documentation:** https://react.dev/

---

## Final Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] GitHub repository pushed
- [ ] Environment variables configured in Render
- [ ] Deployment successful
- [ ] API endpoints tested
- [ ] Frontend connected to API
- [ ] Initial blog posts created
- [ ] Domain configured (optional)
- [ ] Monitoring enabled
- [ ] Backups configured

---

**Congratulations! Your Social Voice Blog is now live!**

For questions or issues, refer to the troubleshooting section or check the respective documentation links.
