// server.js - Express Backend for Blog Platform
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-voice-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// MongoDB Schemas
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Your Name' },
  category: { type: String, default: 'Social Issues' },
  image: { type: String },
  date: { type: Date, default: Date.now },
  reads: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
  comments: [{
    name: String,
    email: String,
    text: String,
    date: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// Routes

// GET all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ date: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single blog by slug
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    // Increment reads
    blog.reads += 1;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new blog (Admin)
app.post('/api/blogs', async (req, res) => {
  try {
    const { title, excerpt, content, author, category, image } = req.body;
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newBlog = new Blog({
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      image,
      published: true
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE blog (Admin)
app.put('/api/blogs/:slug', async (req, res) => {
  try {
    const { title, excerpt, content, author, category, image } = req.body;
    
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.title = title || blog.title;
    blog.excerpt = excerpt || blog.excerpt;
    blog.content = content || blog.content;
    blog.author = author || blog.author;
    blog.category = category || blog.category;
    blog.image = image || blog.image;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE blog (Admin)
app.delete('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST comment on blog
app.post('/api/blogs/:slug/comments', async (req, res) => {
  try {
    const { name, email, text } = req.body;
    
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    blog.comments.push({
      name,
      email,
      text,
      date: new Date()
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET blog stats
app.get('/api/stats', async (req, res) => {
  try {
    const totalBlogs = await Blog.countDocuments({ published: true });
    const totalReads = await Blog.aggregate([
      { $match: { published: true } },
      { $group: { _id: null, totalReads: { $sum: '$reads' } } }
    ]);
    const totalComments = await Blog.aggregate([
      { $match: { published: true } },
      { $group: { _id: null, totalComments: { $sum: { $size: '$comments' } } } }
    ]);

    res.json({
      totalBlogs,
      totalReads: totalReads[0]?.totalReads || 0,
      totalComments: totalComments[0]?.totalComments || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Blog API is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
