const express = require('express');
const router = express.Router();
const { getDB } = require('../database');
const auth = require('../middleware/auth');

// Simple in-memory rate limit store: key = "ip:page", value = timestamp
const trackRateLimit = new Map();
const TRACK_COOLDOWN_MS = 30 * 1000; // 30 seconds per IP per page

router.post('/track', (req,res) => {
  const {post_id,page} = req.body;
  const ip = (req.headers['x-forwarded-for']||req.socket.remoteAddress||'').split(',')[0].trim();
  const ua = req.headers['user-agent']||'';
  const key = `${ip}:${page||'/'}`;

  // Rate-limit: silently skip if same IP hit same page within cooldown
  const lastHit = trackRateLimit.get(key);
  const now = Date.now();
  if(lastHit && (now - lastHit) < TRACK_COOLDOWN_MS){
    return res.json({ok:true});
  }
  trackRateLimit.set(key, now);

  // Prune old entries every ~500 requests to avoid unbounded memory growth
  if(trackRateLimit.size > 500){
    const cutoff = now - TRACK_COOLDOWN_MS;
    for(const [k,v] of trackRateLimit){ if(v < cutoff) trackRateLimit.delete(k); }
  }

  const db = getDB();
  db.exec2('INSERT INTO page_views (post_id,page,ip,user_agent) VALUES (?,?,?,?)',[post_id||null,page||'/',ip,ua]);
  res.json({ok:true});
});

router.get('/dashboard', auth, (req,res) => {
  const db = getDB();
  const stats = {
    totalPosts: db.getOne('SELECT COUNT(*) as c FROM posts')?.c||0,
    publishedPosts: db.getOne("SELECT COUNT(*) as c FROM posts WHERE status='active'")?.c||0,
    draftPosts: db.getOne("SELECT COUNT(*) as c FROM posts WHERE status='draft'")?.c||0,
    totalCategories: db.getOne('SELECT COUNT(*) as c FROM categories')?.c||0,
    totalViews: db.getOne('SELECT SUM(views) as v FROM posts')?.v||0,
    todayViews: db.getOne("SELECT COUNT(*) as c FROM page_views WHERE DATE(viewed_at)=DATE('now')")?.c||0,
  };
  const weeklyViews = db.getAll(`SELECT DATE(viewed_at) as date, COUNT(*) as views FROM page_views WHERE viewed_at>=DATE('now','-7 days') GROUP BY DATE(viewed_at) ORDER BY date ASC`);
  const topPosts = db.getAll(`SELECT p.title,p.slug,p.views,c.name as category_name FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' ORDER BY p.views DESC LIMIT 5`);
  const recentPosts = db.getAll(`SELECT p.*,c.name as category_name FROM posts p LEFT JOIN categories c ON p.category_id=c.id ORDER BY p.created_at DESC LIMIT 5`);
  const categoryBreakdown = db.getAll(`SELECT c.name,COUNT(p.id) as post_count FROM categories c LEFT JOIN posts p ON p.category_id=c.id AND p.status='active' GROUP BY c.id ORDER BY post_count DESC`);
  res.json({stats,weeklyViews,topPosts,recentPosts,categoryBreakdown});
});

module.exports = router;
