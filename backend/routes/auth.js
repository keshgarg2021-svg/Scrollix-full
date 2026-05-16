const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDB } = require('../database');
const authMw = require('../middleware/auth');

router.post('/login', (req,res) => {
  const {username,password} = req.body;
  if(!username||!password) return res.status(400).json({error:'Username and password required'});
  const db = getDB();
  const admin = db.getOne('SELECT * FROM admin WHERE username=?',[username]);
  if(!admin||!bcrypt.compareSync(password,admin.password)) return res.status(401).json({error:'Invalid credentials'});
  const token = jwt.sign({id:admin.id,username:admin.username}, process.env.JWT_SECRET||'scrollix_secret',{expiresIn:'7d'});
  res.json({token, username:admin.username});
});

router.post('/change-password', authMw, (req,res) => {
  const {currentPassword,newPassword} = req.body;
  if(!currentPassword || !newPassword) return res.status(400).json({error:'Both fields required'});
  if(newPassword.length < 8) return res.status(400).json({error:'New password must be at least 8 characters'});
  const db = getDB();
  const admin = db.getOne('SELECT * FROM admin WHERE id=?',[req.admin.id]);
  if(!bcrypt.compareSync(currentPassword,admin.password)) return res.status(400).json({error:'Current password incorrect'});
  db.exec2('UPDATE admin SET password=? WHERE id=?',[bcrypt.hashSync(newPassword,10),req.admin.id]);
  res.json({message:'Password updated'});
});

module.exports = router;
