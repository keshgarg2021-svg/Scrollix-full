require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { initDB } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

const isProd = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
const BASE_URL = process.env.BASE_URL || (isProd ? 'https://scrollix.in' : `http://localhost:${PORT}`);

const FRONTEND_URL = process.env.FRONTEND_URL || BASE_URL;
const uploadsDir = process.env.UPLOADS_PATH || path.join(__dirname,'uploads');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir,{recursive:true});

app.use(cors({
  origin: isProd ? [BASE_URL, FRONTEND_URL] : '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/uploads', (req,res,next) => {
  res.setHeader('Cache-Control','public, max-age=2592000');
  next();
}, express.static(uploadsDir));



initDB().then(() => {
  const authRoutes      = require('./routes/auth');
  const postRoutes      = require('./routes/posts');
  const categoryRoutes  = require('./routes/categories');
  const analyticsRoutes = require('./routes/analytics');
  const sitemapRoute    = require('./routes/sitemap');
  const feedRoute       = require('./routes/feed');

  app.use('/api/auth',       authRoutes);
  app.use('/api/posts',      postRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/analytics',  analyticsRoutes);
  app.use('/sitemap.xml',    sitemapRoute);
  app.use('/feed.xml',       feedRoute);

  app.get('/robots.txt', (req,res) => {
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${BASE_URL}/sitemap.xml`);
  });

  app.get('/', (req,res) => res.json({message: 'Scrollix API is running'}));

  app.listen(PORT, () => {
    console.log(`\n🚀 Scrollix running at http://localhost:${PORT}`);
    console.log(`📝 Admin:   http://localhost:${PORT}/admin`);
    console.log(`🌐 Site:    http://localhost:${PORT}`);
    console.log(`🗺️  Sitemap: http://localhost:${PORT}/sitemap.xml`);
    console.log(`📡 RSS:     http://localhost:${PORT}/feed.xml\n`);
  });
}).catch(err => { console.error('Startup failed:', err); process.exit(1); });
