const express = require('express');
const router = express.Router();
const { getDB } = require('../database');
const auth = require('../middleware/auth');

router.get('/', (req,res) => {
  const db = getDB();
  const cats = db.getAll(`SELECT c.*, COUNT(p.id) as post_count FROM categories c LEFT JOIN posts p ON p.category_id=c.id AND p.status='active' WHERE c.status='active' GROUP BY c.id ORDER BY c.name`);
  res.json(cats);
});

router.get('/admin/all', auth, (req,res) => {
  const db = getDB();
  const cats = db.getAll(`SELECT c.*, COUNT(p.id) as post_count FROM categories c LEFT JOIN posts p ON p.category_id=c.id GROUP BY c.id ORDER BY c.created_at DESC`);
  res.json(cats);
});

router.post('/admin/create', auth, (req,res) => {
  const {name,status} = req.body;
  if(!name) return res.status(400).json({error:'Name required'});
  const slugify = require('slugify');
  const slug = slugify(name,{lower:true,strict:true});
  const db = getDB();
  if(db.getOne('SELECT id FROM categories WHERE slug=?',[slug])) return res.status(400).json({error:'Category already exists'});
  const result = db.exec2('INSERT INTO categories (name,slug,status) VALUES (?,?,?)',[name,slug,status||'active']);
  res.json({id:result.lastInsertRowid,message:'Category created'});
});

router.put('/admin/:id', auth, (req,res) => {
  const {name,status} = req.body;
  const db = getDB();
  const cat = db.getOne('SELECT * FROM categories WHERE id=?',[req.params.id]);
  if(!cat) return res.status(404).json({error:'Not found'});
  db.exec2('UPDATE categories SET name=?,status=? WHERE id=?',[name||cat.name,status||cat.status,req.params.id]);
  res.json({message:'Category updated'});
});

router.delete('/admin/:id', auth, (req,res) => {
  const db = getDB();
  const count = db.getOne('SELECT COUNT(*) as c FROM posts WHERE category_id=?',[req.params.id]);
  if(count&&count.c>0) return res.status(400).json({error:`Cannot delete: ${count.c} posts use this category`});
  db.exec2('DELETE FROM categories WHERE id=?',[req.params.id]);
  res.json({message:'Category deleted'});
});

module.exports = router;
