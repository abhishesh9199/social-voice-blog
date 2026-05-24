# Social Voice Blog - Command Reference

Quick copy-paste commands for common tasks. Use these commands in your terminal.

---

## 🎯 PHASE 1: LOCAL SETUP

### Step 1: Create Project Directory
```bash
mkdir social-voice-blog
cd social-voice-blog
```

### Step 2: Initialize and Install
```bash
npm init -y
npm install express cors dotenv mongoose bcryptjs jsonwebtoken
npm install --save-dev nodemon
```

### Step 3: Create .gitignore
```bash
# On macOS/Linux
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore

# On Windows (use notepad)
echo off
echo node_modules/ > .gitignore
echo .env >> .gitignore
echo .DS_Store >> .gitignore
echo *.log >> .gitignore
```

### Step 4: Setup Environment
```bash
# Copy template
cp .env.example .env

# Edit with your values (use your MongoDB URI)
nano .env    # macOS/Linux
notepad .env # Windows
```

### Step 5: Test Server Locally
```bash
npm start

# In another terminal, test:
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"Blog API is running"}
```

---

## 📊 PHASE 2: DATABASE SETUP

### MongoDB Atlas Online Setup
```bash
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free account
# 3. Create M0 Shared Cluster
# 4. Add database user:
#    - Username: blogadmin
#    - Password: (choose strong password)
# 5. Whitelist IPs: 0.0.0.0/0
# 6. Copy connection string to .env

# Example MONGODB_URI format:
# mongodb+srv://blogadmin:your-password@cluster0.xxxxx.mongodb.net/social-voice-blog?retryWrites=true&w=majority
```

### Test Database Connection
```bash
npm start

# Check console output:
# "MongoDB connected"

# In another terminal:
curl http://localhost:5000/api/stats
```

---

## 📝 PHASE 3: ADD INITIAL CONTENT

### Add First Blog Post
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome to Social Voice Blog",
    "excerpt": "Join us in exploring critical social issues",
    "content": "This is your first blog post. Replace this with your actual content.",
    "author": "Your Name",
    "category": "Social Issues",
    "image": "bg-gradient-to-r from-purple-500 to-pink-500"
  }'
```

### Get All Blogs
```bash
curl http://localhost:5000/api/blogs
```

### Get Single Blog
```bash
curl http://localhost:5000/api/blogs/welcome-to-social-voice-blog
```

### Add Comment to Blog
```bash
curl -X POST http://localhost:5000/api/blogs/your-blog-slug/comments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Reader Name",
    "email": "reader@example.com",
    "text": "Great article! This really helps understand the issue."
  }'
```

### Get Blog Statistics
```bash
curl http://localhost:5000/api/stats
```

---

## 🔄 PHASE 4: GIT & GITHUB

### Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Social Voice Blog"
```

### Create GitHub Repository
```bash
# Go to https://github.com/new
# Create repository named: social-voice-blog
# Then in terminal:

git remote add origin https://github.com/YOUR-USERNAME/social-voice-blog.git
git branch -M main
git push -u origin main

# After making changes:
git add .
git commit -m "Description of changes"
git push origin main
```

### View Git Status
```bash
git status
git log --oneline
```

---

## 🚀 PHASE 5: RENDER DEPLOYMENT

### Deploy to Render
```bash
# 1. Go to https://render.com
# 2. Sign up with GitHub
# 3. Click "New +" → "Web Service"
# 4. Connect your repository
# 5. Fill settings:
#    - Name: social-voice-api
#    - Environment: Node
#    - Build Command: npm install
#    - Start Command: npm start
# 6. Add Environment Variables:
#    - MONGODB_URI: (your MongoDB Atlas URI)
#    - PORT: 5000
#    - NODE_ENV: production
#    - JWT_SECRET: (a long random string)
# 7. Click Deploy

# Test deployment:
curl https://your-app-name.onrender.com/api/health
```

### Redeploy After Code Changes
```bash
# Just push to GitHub - Render auto-deploys!
git push origin main

# Check Render dashboard for deployment status
```

---

## 🌐 PHASE 6: FRONTEND SETUP (React)

### Create React App
```bash
npx create-react-app social-voice-frontend
cd social-voice-frontend
npm install lucide-react

# Copy your blog-app.jsx to src/App.jsx
# Or create new App.jsx with the component code

npm start
# Runs on http://localhost:3000
```

### Build for Production
```bash
npm run build

# Output: build/ folder ready to deploy
```

### Deploy Frontend to Vercel
```bash
# 1. Go to https://vercel.com
# 2. Import your React repository
# 3. Set environment variable:
#    REACT_APP_API_URL=https://your-api.onrender.com
# 4. Deploy

# Update API calls in code:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

## 🔗 DOMAIN SETUP (Optional)

### Buy Domain
```bash
# Go to Namecheap, GoDaddy, or similar
# Buy a domain (e.g., mysocialblog.com)
```

### Connect to Render
```bash
# 1. In Render dashboard, select your web service
# 2. Click Settings → Custom Domains
# 3. Add your domain
# 4. Copy the CNAME value Render provides
# 5. Go to your domain registrar
# 6. Add DNS record:
#    Type: CNAME
#    Name: www (or subdomain)
#    Value: your-render-url.onrender.com
# 7. Wait 5-30 minutes for DNS to propagate
```

### Test Domain
```bash
# After DNS propagates:
curl https://yourdomain.com/api/health
```

---

## 🔧 MAINTENANCE COMMANDS

### Local Development
```bash
# Start server with auto-reload
npm install -g nodemon
nodemon server.js

# Or use npm script:
npm run dev
```

### View Logs Locally
```bash
# Terminal output shows all logs while npm start is running
# Ctrl+C to stop

# For errors, check:
# 1. Console output
# 2. Browser developer console (F12)
# 3. MongoDB Atlas dashboard
```

### View Logs on Render
```bash
# 1. Go to Render dashboard
# 2. Click your Web Service
# 3. Click "Logs" tab
# 4. View real-time logs
```

### Stop Local Server
```bash
# Press Ctrl+C in terminal
```

### Restart Render Service
```bash
# 1. Render dashboard → Select service
# 2. Click "Manual Deploy" → "Deploy"
# OR
# 3. Just push code to GitHub (auto-deploys)
```

---

## 💾 BACKUP & MAINTENANCE

### Backup MongoDB Data
```bash
# 1. Go to MongoDB Atlas dashboard
# 2. Click "Backup" in left menu
# 3. Click "Download" next to latest backup
# 4. Save .zip file locally
```

### Clear MongoDB Collection (Warning: Deletes all data!)
```bash
# Via MongoDB Atlas UI:
# 1. Go to Collections tab
# 2. Select collection
# 3. Click Delete Collection
# 4. Type collection name to confirm

# This is destructive - use only if needed!
```

### Export Data
```bash
# Using mongoexport (requires MongoDB tools installed):
mongoexport --uri="your-mongodb-uri" --collection=blogs --out=blogs.json

# Or download from Atlas directly
```

---

## 🔐 SECURITY COMMANDS

### Generate Secure JWT Secret
```bash
# On macOS/Linux:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Maximum 256}))

# Copy output to JWT_SECRET in .env
```

### Check .env is Protected
```bash
# Make sure .env is in .gitignore:
cat .gitignore | grep .env

# Should output: .env
# If not, add it:
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

---

## 📋 USEFUL CURL COMMANDS

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/api/health

# Get all blogs
curl http://localhost:5000/api/blogs

# Get single blog
curl http://localhost:5000/api/blogs/your-blog-slug

# Get stats
curl http://localhost:5000/api/stats

# Create blog (requires POST)
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","excerpt":"Test excerpt","content":"Full content","author":"You"}'

# Update blog
curl -X PUT http://localhost:5000/api/blogs/your-slug \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# Delete blog
curl -X DELETE http://localhost:5000/api/blogs/your-slug

# Add comment
curl -X POST http://localhost:5000/api/blogs/your-slug/comments \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","text":"Great post!"}'
```

---

## 🐛 TROUBLESHOOTING COMMANDS

### Check Node Version
```bash
node --version
npm --version

# Should be Node 18+ for this project
```

### Check Open Ports
```bash
# macOS/Linux:
lsof -i :5000

# Windows (PowerShell):
Get-NetTCPConnection -LocalPort 5000

# If port is in use, kill process:
kill -9 <PID>  # macOS/Linux
Stop-Process -Id <PID>  # Windows
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Test Database Connection
```bash
# Edit .env with correct MongoDB URI, then:
npm start

# Check for "MongoDB connected" message
```

### View Environment Variables (Don't Print Secrets!)
```bash
# List all env vars (macOS/Linux):
env | grep -E 'NODE|PORT|MONGO'

# On Windows (PowerShell):
Get-ChildItem env: | Where-Object {$_.Name -like "*NODE*" -or $_.Name -like "*PORT*"}
```

---

## 📦 NPM USEFUL COMMANDS

### Check Outdated Packages
```bash
npm outdated
```

### Update All Packages
```bash
npm update
```

### Install Specific Version
```bash
npm install express@4.18.2
```

### Uninstall Package
```bash
npm uninstall nodemon
npm uninstall --save-dev nodemon  # for dev dependencies
```

### List Installed Packages
```bash
npm list
```

---

## 📊 MONITORING COMMANDS

### Monitor Render Service
```bash
# No direct CLI - use dashboard:
# https://dashboard.render.com/
# 1. Select your service
# 2. View "Logs"
# 3. Check resource usage
```

### Monitor MongoDB
```bash
# Via Atlas dashboard:
# https://cloud.mongodb.com/
# 1. Go to Metrics
# 2. View connection count
# 3. Check storage usage
# 4. Review backup status
```

### Test Response Time
```bash
# Using curl with timing:
curl -w "\nTotal time: %{time_total}s\n" http://localhost:5000/api/blogs
```

---

## 🔄 WORKFLOW SUMMARY

### Daily Development
```bash
# Start server
npm start

# In new terminal, work on code
# Edit files → save → test in browser

# When done:
git add .
git commit -m "Your changes"
git push origin main  # Auto-deploys!
```

### Adding New Blog
```bash
curl -X POST https://your-api.onrender.com/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Your Title",
    "excerpt":"Brief description",
    "content":"Full article content here...",
    "author":"Your Name",
    "category":"Social Issues"
  }'
```

### Backup Data
```bash
# Monthly backup via MongoDB Atlas
# 1. Go to Backup section
# 2. Download latest backup
# 3. Store safely
```

---

## 🎯 QUICK REFERENCE

| Task | Command |
|------|---------|
| Start server | `npm start` |
| Test API | `curl http://localhost:5000/api/health` |
| Add post | `curl -X POST ...` (see above) |
| Deploy | `git push origin main` |
| View logs | Check Render dashboard |
| Restart service | Render dashboard → Manual Deploy |
| Backup data | MongoDB Atlas → Backup section |
| Check status | `curl https://your-api.onrender.com/api/health` |

---

## 💡 HELPFUL TIPS

### Tip 1: Use Postman
Download Postman app to test API endpoints with a GUI instead of curl.

### Tip 2: Keep Terminal Windows Open
- Window 1: `npm start` (server)
- Window 2: Your code editor
- Window 3: curl/tests

### Tip 3: Check Logs First
When something fails, always check:
1. Console output (terminal)
2. Browser developer console (F12)
3. Render dashboard logs

### Tip 4: Commit Regularly
```bash
git add .
git commit -m "Feature description"
git push origin main
```

### Tip 5: Test Before Deploying
Always test locally first before pushing to GitHub!

---

## 📞 GET HELP

### If Commands Don't Work
1. Check file is in right directory: `pwd` / `cd`
2. Check Node.js installed: `node --version`
3. Check MongoDB URI in .env
4. Check internet connection
5. Read error messages carefully!

### Error Examples & Fixes
```bash
# "Cannot find module 'express'"
npm install

# "MongoDB connection error"
# Check MONGODB_URI in .env

# "Port 5000 in use"
# Change PORT=5001 in .env

# "Permission denied"
# Try: sudo npm start (macOS/Linux only)
```

---

**Happy Blogging!** 📝

Use these commands with confidence to build and deploy your Social Voice Blog!
