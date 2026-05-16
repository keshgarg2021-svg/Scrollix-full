const express = require('express');
const router = express.Router();
const { getDB } = require('../database');

// GET /feed.xml — RSS Feed for Google News
router.get('/', (req, res) => {
  const db = getDB();
  const posts = db.getAll(`SELECT p.*, c.name as category_name FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' ORDER BY p.created_at DESC LIMIT 20`);
  const isProd = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
  const backendBase = process.env.BASE_URL || (isProd ? 'https://scrollix.in' : `http://${req.headers.host}`);
  const base = process.env.FRONTEND_URL || backendBase;
  const now = new Date().toUTCString();

  const escXml = s => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const stripHTML = s => String(s||'').replace(/<[^>]*>/g,'');

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>Scrollix — Viral News &amp; Student Life</title>
    <link>${base}</link>
    <description>India ka Hinglish digital magazine covering viral news, student life, AI tools and earning tips.</description>
    <language>en-in</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${base}/images/logo.png</url>
      <title>Scrollix</title>
      <link>${base}</link>
    </image>`;

  posts.forEach(p => {
    const pubDate = new Date(p.created_at).toUTCString();
    const excerpt = escXml(stripHTML(p.excerpt||'').slice(0,300));
    rss += `
    <item>
      <title>${escXml(p.title)}</title>
      <link>${base}/blog/${p.slug}</link>
      <guid isPermaLink="true">${base}/blog/${p.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${excerpt}</description>
      <category>${escXml(p.category_name||'General')}</category>
      ${p.thumbnail?`<media:content url="${backendBase}${p.thumbnail}" medium="image"/>`:''}`
    rss += `
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  res.set('Content-Type', 'application/rss+xml');
  res.send(rss);
});

module.exports = router;
