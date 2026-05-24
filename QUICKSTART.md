# Social Voice Blog - Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- MongoDB Account ([Sign up free](https://www.mongodb.com/cloud/atlas))
- Git ([Download here](https://git-scm.com/))

---

## Step 1: Clone/Download Project Files

```bash
# Clone from GitHub
git clone https://github.com/your-username/social-voice-blog.git
cd social-voice-blog

# OR download files manually and navigate to directory
cd social-voice-blog
```

---

## Step 2: Install Dependencies

```bash
npm install
```

This installs:
- Express (web framework)
- MongoDB driver
- CORS (for cross-origin requests)
- And other dependencies

---

## Step 3: Setup MongoDB Database

### Option A: MongoDB Atlas (Cloud - Recommended)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a M0 Free Cluster
4. Go to "Database Access" → Create user with password
5. Go to "Network Access" → Allow all IPs (0.0.0.0/0)
6. Click "Connect" → Copy connection string
7. Replace username and password in string

### Option B: Local MongoDB
```bash
# macOS with Homebrew
brew install mongodb-community
brew services start mongodb-community

# Windows
# Download from: https://www.mongodb.com/try/download/community

# Linux (Ubuntu)
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

---

## Step 4: Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env with your values
# For macOS/Linux
nano .env

# For Windows
notepad .env
```

Update these fields:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/social-voice-blog
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here
```

---

## Step 5: Start the Server

```bash
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected
```

✅ **Backend is running!**

---

## Step 6: Test the API

Open a new terminal and test:

```bash
# Test health check
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"Blog API is running"}
```

---

## Step 7: Add Your First Blog Post

```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome to Social Voice",
    "excerpt": "Your first blog post about social issues",
    "content": "This is the full content of your blog post...",
    "author": "Your Name",
    "category": "Social Issues",
    "image": "bg-gradient-to-r from-purple-500 to-pink-500"
  }'
```

---

## Step 8: View All Blog Posts

```bash
curl http://localhost:5000/api/blogs

# Expected: Returns array of blog posts in JSON format
```

---

## Step 9: Setup Frontend (React)

### Option A: Use the Provided React Component
1. Replace the React component file with provided `blog-app.jsx`
2. It already includes the homepage, blog listing, and individual blog views

### Option B: Create New React App
```bash
# In a separate directory
npx create-react-app social-voice-frontend
cd social-voice-frontend
npm install lucide-react

# Copy the blog-app.jsx component
# Create src/App.jsx with the content

npm start
```

The frontend will run on `http://localhost:3000`

---

## Step 10: Connect Frontend to Backend

In your React component, update the API URL:

```javascript
// At the top of your component file
const API_URL = 'http://localhost:5000/api';

// Example API call:
const fetchBlogs = async () => {
  const response = await fetch(`${API_URL}/blogs`);
  const data = await response.json();
  // Use data...
};
```

---

## Project Structure

```
social-voice-blog/
├── server.js              # Express backend
├── package.json           # Dependencies
├── .env                   # Environment variables (don't share)
├── .env.example          # Template for .env
├── .gitignore            # Git ignore rules
├── DEPLOYMENT_GUIDE.md   # Full deployment instructions
└── README.md             # This file

Frontend (separate):
├── src/
│   ├── App.jsx           # Main React component
│   └── index.js
├── public/
│   └── index.html
└── package.json
```

---

## Common Commands

```bash
# Start server
npm start

# Start with auto-reload (if nodemon installed)
npm run dev

# Stop server
Ctrl + C

# View MongoDB
# Go to MongoDB Atlas dashboard → Collections

# Clear all data (warning!)
# In MongoDB Atlas, go to Collections → Delete collection

# View logs
# Check terminal where npm start is running
```

---

## API Endpoints Reference

### Blogs
```
GET  /api/blogs              # Get all blogs
GET  /api/blogs/:slug        # Get single blog
POST /api/blogs              # Create blog (admin)
PUT  /api/blogs/:slug        # Update blog (admin)
DELETE /api/blogs/:slug      # Delete blog (admin)
```

### Comments
```
POST /api/blogs/:slug/comments    # Add comment to blog
```

### Stats
```
GET /api/stats               # Get blog statistics
```

### Health Check
```
GET /api/health              # Check if API is running
```

---

## Sample Curl Commands

### Get All Blogs
```bash
curl http://localhost:5000/api/blogs
```

### Get Single Blog
```bash
curl http://localhost:5000/api/blogs/the-silent-burden-understanding-dowry-system
```

### Create Blog
```bash
curl -X POST http://localhost:5000/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Blog Title",
    "excerpt": "Brief excerpt",
    "content": "Full content here...",
    "author": "Your Name",
    "category": "Social Issues"
  }'
```

### Add Comment
```bash
curl -X POST http://localhost:5000/api/blogs/your-blog-slug/comments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Commenter Name",
    "email": "email@example.com",
    "text": "Great article!"
  }'
```

### Get Statistics
```bash
curl http://localhost:5000/api/stats
```

---

## Troubleshooting

### ❌ "MongoDB connection error"
**Solution:**
1. Check MongoDB Atlas dashboard
2. Verify username/password in MONGODB_URI
3. Check IP whitelist (allow 0.0.0.0/0)
4. Ensure cluster is running

### ❌ "Cannot find module 'express'"
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Port 5000 already in use"
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process (macOS/Linux)
kill -9 <PID>

# Or change PORT in .env to 5001
```

### ❌ "CORS errors in browser console"
**Solution:**
Make sure frontend URL is allowed in server.js:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
```

### ❌ "Cannot POST /api/blogs"
**Solution:**
- Ensure Content-Type header is `application/json`
- Check request body is valid JSON
- Verify server is running

---

## Next Steps

1. **Customize Content**
   - Edit blog posts in MongoDB
   - Update author information
   - Add your own blog entries

2. **Deploy to Render.com**
   - Follow DEPLOYMENT_GUIDE.md
   - Push code to GitHub
   - Connect GitHub to Render

3. **Setup Domain**
   - Buy domain (Namecheap, GoDaddy, etc.)
   - Connect to Render
   - Enable HTTPS

4. **Add More Features**
   - User authentication
   - Comment moderation
   - Newsletter signup
   - Social sharing

---

## Need Help?

### Resources
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Render.com Documentation](https://render.com/docs)

### Common Issues
Check the DEPLOYMENT_GUIDE.md for detailed troubleshooting section.

### Community Help
- Stack Overflow
- MongoDB Community
- Node.js Community

---

## Security Notes

⚠️ **Important:**
1. Never commit .env to GitHub
2. Change JWT_SECRET to a unique value
3. Use strong database passwords
4. Don't share API keys or secrets
5. In production, restrict MongoDB IP whitelist

---

## Performance Tips

1. **Database Indexing**
   - MongoDB automatically indexes primary keys
   - Add custom indexes for frequently searched fields

2. **Caching**
   - Cache blog posts that rarely change
   - Use browser caching headers

3. **Image Optimization**
   - Compress images before upload
   - Use CDN for image delivery

4. **API Rate Limiting**
   - Add rate limiting to prevent abuse
   - Consider using middleware like express-rate-limit

---

## What You Can Do Now

✅ View all blog posts
✅ Read individual blog articles
✅ Search blog posts
✅ Comment on articles
✅ Track blog statistics
✅ Admin functions (create, edit, delete blogs)

---

## Getting Ready for Production

Before deploying to Render:

1. ✅ Test all endpoints locally
2. ✅ Verify MongoDB connection
3. ✅ Update environment variables
4. ✅ Test frontend-backend integration
5. ✅ Add initial blog content
6. ✅ Setup GitHub repository
7. ✅ Create Render.com account
8. ✅ Configure all secrets in Render

Follow DEPLOYMENT_GUIDE.md for step-by-step deployment instructions.

---

## License

MIT License - feel free to use for your blog!

---

**Happy Blogging! 📝**

For questions or issues, refer to the comprehensive DEPLOYMENT_GUIDE.md or check the troubleshooting section above.
