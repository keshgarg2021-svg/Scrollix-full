const express = require('express');
const router = express.Router();
const { getDB } = require('../database');

// GET /sitemap.xml
router.get('/', (req, res) => {
  const db = getDB();
  const posts = db.getAll(`SELECT slug, updated_at, created_at FROM posts WHERE status='active' ORDER BY created_at DESC`);
  const cats = db.getAll(`SELECT slug FROM categories WHERE status='active'`);
  const isProd = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
  const base = process.env.FRONTEND_URL || process.env.BASE_URL || (isProd ? 'https://scrollix.in' : `http://${req.headers.host}`);

  const staticPages = [
    { url: '/', priority: '1.0', freq: 'daily' },
    { url: '/about.html', priority: '0.6', freq: 'monthly' },
    { url: '/contact.html', priority: '0.6', freq: 'monthly' },
    { url: '/privacy.html', priority: '0.4', freq: 'yearly' },
    { url: '/disclaimer.html', priority: '0.4', freq: 'yearly' },
  ];

  const today = new Date().toISOString().slice(0,10);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Static pages
  staticPages.forEach(p => {
    xml += `
  <url>
    <loc>${base}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`;
  });

  // Category pages
  cats.forEach(c => {
    xml += `
  <url>
    <loc>${base}/category/${c.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  // Blog posts
  posts.forEach(p => {
    const lastmod = (p.updated_at || p.created_at || today).slice(0, 10);
    xml += `
  <url>
    <loc>${base}/blog/${p.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
  });

  xml += `\n</urlset>`;
  res.set('Content-Type', 'application/xml');
  res.send(xml);
});

module.exports = router;
