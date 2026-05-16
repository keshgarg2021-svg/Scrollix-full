const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'scrollix.db');
let db;

async function initDB() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    db = new SQL.Database(fs.readFileSync(DB_PATH));
  } else {
    db = new SQL.Database();
  }

  function save() {
    fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  }
  db._save = save;

  db.getAll = (sql, params=[]) => {
    const stmt=db.prepare(sql); stmt.bind(params);
    const rows=[]; while(stmt.step()) rows.push(stmt.getAsObject()); stmt.free(); return rows;
  };
  db.getOne = (sql, params=[]) => db.getAll(sql,params)[0]||null;
  db.exec2 = (sql, params=[]) => {
    const stmt=db.prepare(sql); stmt.run(params); stmt.free();
    const id=db.exec('SELECT last_insert_rowid() as id')[0]?.values[0]?.[0];
    save(); return {lastInsertRowid:id};
  };

  db.run(`
    CREATE TABLE IF NOT EXISTS admin (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, status TEXT DEFAULT 'active', created_at DATETIME DEFAULT CURRENT_TIMESTAMP);
    CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, excerpt TEXT, content TEXT, thumbnail TEXT, category_id INTEGER, status TEXT DEFAULT 'draft', show_homepage INTEGER DEFAULT 0, is_popular INTEGER DEFAULT 0, views INTEGER DEFAULT 0, seo_title TEXT, seo_description TEXT, og_image TEXT, tags TEXT, youtube_url TEXT, focus_keyword TEXT, affiliate_products TEXT, featured_position TEXT DEFAULT 'none', created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (category_id) REFERENCES categories(id));
    CREATE TABLE IF NOT EXISTS page_views (id INTEGER PRIMARY KEY AUTOINCREMENT, post_id INTEGER, page TEXT, ip TEXT, user_agent TEXT, viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP);
  `);

  // Safe column additions for existing DBs
  const safeAdd = (sql) => { try { db.run(sql); save(); } catch(e) {} };
  safeAdd('ALTER TABLE posts ADD COLUMN youtube_url TEXT');
  safeAdd('ALTER TABLE posts ADD COLUMN focus_keyword TEXT');
  safeAdd('ALTER TABLE posts ADD COLUMN affiliate_products TEXT');
  safeAdd('ALTER TABLE posts ADD COLUMN featured_position TEXT DEFAULT "none"');

  // Seed admin
  const adminExists = db.getOne('SELECT id FROM admin WHERE username=?', [process.env.ADMIN_USERNAME||'admin']);
  if (!adminExists) {
    const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD||'scrollix@123', 10);
    db.exec2('INSERT INTO admin (username,password) VALUES (?,?)', [process.env.ADMIN_USERNAME||'admin', hash]);
    console.log('✅ Admin created — user: admin | pass: scrollix@123');
  }

  // Seed categories
  const catCount = db.getOne('SELECT COUNT(*) as count FROM categories');
  if (!catCount || catCount.count === 0) {
    [['Viral News','viral-news'],['Student Life','student-life'],['AI & Tools','ai-tools'],
     ['Make Money Online','make-money-online'],['Tech & Gadgets','tech-gadgets'],['Gaming','gaming']]
      .forEach(([name,slug]) => db.exec2('INSERT INTO categories (name,slug) VALUES (?,?)',[name,slug]));
    console.log('✅ Default categories seeded');
  }

  save();
  console.log('✅ Database ready');
  return db;
}

function getDB() { return db; }
function patchDB() { /* already handled in initDB */ }
function patchDB2() { /* already handled in initDB */ }

module.exports = { initDB, getDB, patchDB, patchDB2 };
