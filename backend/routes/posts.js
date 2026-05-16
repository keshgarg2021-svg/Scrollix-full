const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getDB } = require('../database');
const auth = require('../middleware/auth');

const uploadsDir = process.env.UPLOADS_PATH || path.join(__dirname,'../uploads');

const storage = multer.diskStorage({
  destination: (req,file,cb) => cb(null, uploadsDir),
  filename: (req,file,cb) => cb(null,Date.now()+'-'+Math.round(Math.random()*1e6)+path.extname(file.originalname))
});
const upload = multer({storage,limits:{fileSize:5*1024*1024},fileFilter:(req,file,cb)=>cb(null,/jpeg|jpg|png|gif|webp/.test(path.extname(file.originalname).toLowerCase()))});

// Convert YouTube URL to embed URL
function getYoutubeEmbed(url) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

// ── ADMIN ROUTES (must be BEFORE /:slug to avoid Express wildcard conflict) ──

router.get('/admin/all', auth, (req,res) => {
  const {status,category,search,limit=20,offset=0} = req.query;
  const db = getDB();
  let where='1=1'; const params=[];
  if(status){where+=' AND p.status=?';params.push(status);}
  if(category){where+=' AND p.category_id=?';params.push(category);}
  if(search){where+=' AND p.title LIKE ?';params.push('%'+search+'%');}
  const posts = db.getAll(`SELECT p.*,c.name as category_name FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE ${where} ORDER BY p.created_at DESC LIMIT ? OFFSET ?`,[...params,parseInt(limit),parseInt(offset)]);
  const total = db.getOne(`SELECT COUNT(*) as c FROM posts p WHERE ${where}`,[...params])?.c||0;
  res.json({posts,total});
});

// Single post fetch for admin edit — avoids loading all 1000 posts
router.get('/admin/post/:id', auth, (req,res) => {
  const db = getDB();
  const post = db.getOne(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.id=?`,[req.params.id]);
  if(!post) return res.status(404).json({error:'Post not found'});
  if(post.affiliate_products){
    try{ post.affiliate_products = JSON.parse(post.affiliate_products); }catch(e){ post.affiliate_products=[]; }
  } else { post.affiliate_products = []; }
  res.json({post});
});

// ── PUBLIC ROUTES ──

router.get('/', (req,res) => {
  const {category,popular,homepage,search,limit=10,offset=0} = req.query;
  const db = getDB();
  let where = "p.status='active'"; const params=[];
  if(category){where+=' AND c.slug=?';params.push(category);}
  if(popular==='1'){where+=' AND p.is_popular=1';}
  if(homepage==='1'){where+=' AND p.show_homepage=1';}
  if(search){where+=' AND (p.title LIKE ? OR p.excerpt LIKE ?)';params.push('%'+search+'%','%'+search+'%');}
  const posts = db.getAll(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE ${where} ORDER BY p.created_at DESC LIMIT ? OFFSET ?`,[...params,parseInt(limit),parseInt(offset)]);
  // Use same WHERE + params for accurate filtered total (fixes pagination bug)
  const total = db.getOne(`SELECT COUNT(*) as c FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE ${where}`,params)?.c||0;
  res.json({posts,total});
});

router.get('/featured', (req,res) => {
  const db = getDB();

  // Hero: post with featured_position='hero', else latest active post
  let hero = db.getOne(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' AND p.featured_position='hero' ORDER BY p.created_at DESC LIMIT 1`);
  if (!hero) hero = db.getOne(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' AND p.show_homepage=1 ORDER BY p.created_at DESC LIMIT 1`);
  if (!hero) hero = db.getOne(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' ORDER BY p.created_at DESC LIMIT 1`);

  // Sidebar: posts with featured_position='sidebar', else latest homepage posts
  let sidebar = db.getAll(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' AND p.featured_position='sidebar' ORDER BY p.created_at DESC LIMIT 3`);
  if (!sidebar.length) sidebar = db.getAll(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' AND p.show_homepage=1 ORDER BY p.created_at DESC LIMIT 3 OFFSET 1`);
  if (!sidebar.length) sidebar = db.getAll(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' ORDER BY p.created_at DESC LIMIT 3 OFFSET 1`);

  // Wide featured card: post with featured_position='wide'
  let wide = db.getOne(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' AND p.featured_position='wide' ORDER BY p.created_at DESC LIMIT 1`);

  const popular = db.getAll(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' AND p.is_popular=1 ORDER BY p.views DESC LIMIT 5`);
  const recent = db.getAll(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' ORDER BY p.created_at DESC LIMIT 9`);
  const viral = db.getAll(`SELECT p.*,c.name as category_name FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.status='active' ORDER BY p.views DESC LIMIT 4`);

  res.json({hero, sidebar, wide, popular, recent, viral});
});

router.get('/:slug', (req,res) => {
  const db = getDB();
  const post = db.getOne(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.slug=? AND p.status='active'`,[req.params.slug]);
  if(!post) return res.status(404).json({error:'Post not found'});
  db.exec2('UPDATE posts SET views=views+1 WHERE id=?',[post.id]);
  // Parse affiliate products JSON
  if(post.affiliate_products) {
    try { post.affiliate_products = JSON.parse(post.affiliate_products); } catch(e){ post.affiliate_products=[]; }
  } else { post.affiliate_products = []; }
  // Add embed URL
  post.youtube_embed = getYoutubeEmbed(post.youtube_url);
  const related = db.getAll(`SELECT p.*,c.name as category_name,c.slug as category_slug FROM posts p LEFT JOIN categories c ON p.category_id=c.id WHERE p.category_id=? AND p.id!=? AND p.status='active' ORDER BY p.created_at DESC LIMIT 3`,[post.category_id,post.id]);
  res.json({post,related});
});

// ADMIN WRITE ROUTES

router.post('/admin/create', auth, upload.fields([{name:'thumbnail',maxCount:1},{name:'og_image',maxCount:1}]), (req,res) => {
  const {title,excerpt,content,category_id,status,show_homepage,is_popular,
         seo_title,seo_description,tags,youtube_url,focus_keyword,affiliate_products} = req.body;
  if(!title) return res.status(400).json({error:'Title required'});
  const slugify = require('slugify');
  const db = getDB();
  let slug = slugify(title,{lower:true,strict:true});
  if(db.getOne('SELECT id FROM posts WHERE slug=?',[slug])) slug=slug+'-'+Date.now();
  const thumbnail = req.files?.thumbnail?'/uploads/'+req.files.thumbnail[0].filename:null;
  const og_image = req.files?.og_image?'/uploads/'+req.files.og_image[0].filename:null;
  const result = db.exec2(
    `INSERT INTO posts (title,slug,excerpt,content,thumbnail,category_id,status,show_homepage,is_popular,seo_title,seo_description,og_image,tags,youtube_url,focus_keyword,affiliate_products,featured_position) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [title,slug,excerpt||'',content||'',thumbnail,category_id||null,status||'draft',
     show_homepage==='1'?1:0,is_popular==='1'?1:0,
     seo_title||title,seo_description||excerpt||'',og_image||thumbnail,tags||'',
     youtube_url||'',focus_keyword||'',affiliate_products||'[]']
  );
  res.json({id:result.lastInsertRowid,slug,message:'Post created'});
});

router.put('/admin/:id', auth, upload.fields([{name:'thumbnail',maxCount:1},{name:'og_image',maxCount:1}]), (req,res) => {
  const {title,excerpt,content,category_id,status,show_homepage,is_popular,
         seo_title,seo_description,tags,youtube_url,focus_keyword,affiliate_products} = req.body;
  const db = getDB();
  const post = db.getOne('SELECT * FROM posts WHERE id=?',[req.params.id]);
  if(!post) return res.status(404).json({error:'Post not found'});
  const thumbnail = req.files?.thumbnail?'/uploads/'+req.files.thumbnail[0].filename:post.thumbnail;
  const og_image = req.files?.og_image?'/uploads/'+req.files.og_image[0].filename:post.og_image;
  db.exec2(
    `UPDATE posts SET title=?,excerpt=?,content=?,thumbnail=?,category_id=?,status=?,show_homepage=?,is_popular=?,seo_title=?,seo_description=?,og_image=?,tags=?,youtube_url=?,focus_keyword=?,affiliate_products=?,featured_position=?,updated_at=CURRENT_TIMESTAMP WHERE id=?`,
    [title||post.title,excerpt||post.excerpt,content||post.content,thumbnail,
     category_id||post.category_id,status||post.status,
     show_homepage==='1'?1:0,is_popular==='1'?1:0,
     seo_title||post.seo_title,seo_description||post.seo_description,og_image,
     tags||post.tags,youtube_url||post.youtube_url||'',
     focus_keyword||post.focus_keyword||'',
     affiliate_products||post.affiliate_products||'[]',
     req.body.featured_position||post.featured_position||'none',
     req.params.id]
  );
  res.json({message:'Post updated'});
});

router.delete('/admin/:id', auth, (req,res) => {
  const db = getDB();
  const post = db.getOne('SELECT * FROM posts WHERE id=?',[req.params.id]);
  if(!post) return res.status(404).json({error:'Post not found'});
  // Delete thumbnail file from disk
  if(post.thumbnail && post.thumbnail.startsWith('/uploads/')){
    const fp = path.join(uploadsDir, post.thumbnail.replace('/uploads/',''));
    if(fs.existsSync(fp)) try { fs.unlinkSync(fp); } catch(e) {}
  }
  // Delete OG image file from disk
  if(post.og_image && post.og_image !== post.thumbnail && post.og_image.startsWith('/uploads/')){
    const fp = path.join(uploadsDir, post.og_image.replace('/uploads/',''));
    if(fs.existsSync(fp)) try { fs.unlinkSync(fp); } catch(e) {}
  }
  db.exec2('DELETE FROM posts WHERE id=?',[req.params.id]);
  res.json({message:'Post deleted'});
});

module.exports = router;
