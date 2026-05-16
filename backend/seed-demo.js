// Run this once to add demo posts: node seed-demo.js
require('dotenv').config();
const { initDB, patchDB } = require('./database');

initDB().then(() => {
  patchDB();
  const { getDB } = require('./database');
  const db = getDB();
  const slugify = require('slugify');

  const posts = [
    {
      title: "Top 5 Free AI Tools Har Student Ko Use Karne Chahiye 2025 Mein",
      excerpt: "ChatGPT se aage bhi bohot kuch hai. Ye 5 free AI tools tumhara time bachayenge aur kaam 10x better banayenge — bilkul free mein.",
      content: `<h2>AI Tools Jo Sach Mein Kaam Aate Hain</h2>
<p>2025 mein agar tum AI tools use nahi kar rahe, toh tum bahut peeche ho. Ye tools free hain aur student life mein game-changer ban sakte hain.</p>
<h2>1. ChatGPT (Free Version)</h2>
<p>Sabse popular AI tool. Assignments likhne mein, doubt clear karne mein, aur code debug karne mein perfect. GPT-4o free mein milta hai ab.</p>
<h2>2. Canva AI</h2>
<p>Design karna ab bohot aasaan ho gaya. Presentations, posters, thumbnails — sab kuch minutes mein. Text to image feature bhi free hai.</p>
<h2>3. Notion AI</h2>
<p>Notes organize karne ka best tool. AI se summary banao, action items nikalo, aur study schedule banaao automatically.</p>
<h2>4. Grammarly</h2>
<p>English writing perfect karne ke liye. Emails, assignments, LinkedIn posts — sab kuch professional lagega.</p>
<h2>5. Google Gemini</h2>
<p>Google ka AI tool. Gmail, Docs, Sheets sab ke saath integrate hota hai. Students ke liye bahut useful.</p>
<p>In tools ko aaj se hi use karna shuru karo — results khud dikhai denge!</p>`,
      category_slug: 'ai-tools',
      show_homepage: 1, is_popular: 1,
      seo_title: "Top 5 Free AI Tools for Students 2025 — Scrollix",
      seo_description: "ChatGPT se aage bhi bohot kuch hai. Ye 5 free AI tools student life mein game-changer hain — bilkul free mein use karo.",
      tags: "AI Tools, Free AI, Student, ChatGPT, Canva"
    },
    {
      title: "Blogging Se 50000 Per Month Kaise Kamayein — Complete Beginner Guide 2025",
      excerpt: "Zero experience se blog start karke 6 mahine mein serious income generate karne ki real-world strategy. AdSense, affiliate, aur sponsored posts.",
      content: `<h2>Kya Blogging Se Sach Mein Paise Milte Hain?</h2>
<p>Haan — lekin sach ye hai ki pehle 3-6 mahine mein income bohot kam hogi. Consistency aur sahi strategy se hi results milte hain.</p>
<h2>Step 1: Niche Choose Karo</h2>
<p>Ek specific topic choose karo jisme tumhara interest ho aur log search bhi karte hon. Student life, tech reviews, ya earning guides — ye sab achhe niches hain India mein.</p>
<h2>Step 2: Blog Setup Karo</h2>
<p>Domain lo (scrollix.in jaisa), hosting lo ya free hosting use karo, aur ek clean theme lagao. Technical cheezein 1 din mein ho jaati hain.</p>
<h2>Step 3: Content Strategy</h2>
<p>Minimum 2-3 articles per week likhो. Har article minimum 1000 words ka hona chahiye. SEO-friendly titles use karo jaise "Best phones under 15000 2025".</p>
<h2>Step 4: Monetization</h2>
<p>Google AdSense ke liye apply karo jab 20-30 articles ho jayein. Amazon Associates se affiliate links add karo product articles mein. Ye combination best hai beginner ke liye.</p>
<p>6 mahine consistent rehne ke baad results dikhne lagte hain. Ek blog jo 1000 visitors/day tak pahunche — AdSense se 3000-8000/month earn kar sakta hai India mein.</p>`,
      category_slug: 'make-money-online',
      show_homepage: 1, is_popular: 1,
      seo_title: "Blogging Se 50000 Per Month — Complete Guide 2025",
      seo_description: "Zero se blog shuru karke 6 mahine mein serious income kaise kamayein — AdSense, affiliate aur sponsored posts ka complete guide.",
      tags: "Blogging, Make Money, AdSense, Affiliate, Income"
    },
    {
      title: "BTech Students Ke Liye Top 7 Side Hustles — Zero Investment",
      excerpt: "College mein paisa kamana mushkil nahi hai agar sahi side hustle choose karo. Ye 7 ideas zero investment mein shuru ho sakte hain.",
      content: `<h2>College Mein Paise Kamao — Real Ways</h2>
<p>BTech student ho toh tumhare paas skills hain jo bahut valuable hain. Bas unhe sahi jagah use karna hai.</p>
<h2>1. Freelance Web Development</h2>
<p>Basic HTML/CSS aata hai? Local businesses ke liye websites banao. Ek website 5000-20000 mein milti hai. Fiverr aur Upwork pe profile banao.</p>
<h2>2. Content Writing</h2>
<p>Agar likhna achha lagta hai toh content writing start karo. Hindi ya English dono mein demand hai. 500 words ke 200-500 rupaye milte hain beginners ko.</p>
<h2>3. YouTube Channel</h2>
<p>Tech tutorials, study tips, ya college life vlogs — sab kuch chalega. 1000 subscribers aur 4000 watch hours ke baad monetize ho sakta hai.</p>
<h2>4. Tutoring</h2>
<p>Apne junior students ko padhao. Physics, Maths, Programming — 200-500 per hour easily milta hai offline ya online dono mein.</p>
<h2>5. Graphic Design</h2>
<p>Canva seekh lo — logos, posters, social media posts design karo. Small businesses ko hamesha designers ki zaroorat hoti hai.</p>
<h2>6. Data Entry & Micro Tasks</h2>
<p>Amazon Mechanical Turk, Clickworker — ye platforms micro tasks dete hain. Exam ke time extra kaam nahi chahiye toh ye best hai.</p>
<h2>7. Sell Notes & Study Material</h2>
<p>Apne notes PDF mein convert karo aur Telegram ya Instagram pe sell karo. Ek achha notes set 100-500 mein bikta hai easily.</p>`,
      category_slug: 'student-life',
      show_homepage: 1, is_popular: 1,
      seo_title: "BTech Students Ke Liye 7 Side Hustles Zero Investment 2025",
      seo_description: "College mein zero investment se paise kamane ke 7 real methods jo actually kaam karte hain BTech students ke liye.",
      tags: "Side Hustle, BTech, Student, Freelancing, Income"
    },
    {
      title: "Best Budget Phones Under 15000 in India 2025 — Honest Comparison",
      excerpt: "15000 ke budget mein best camera, battery aur performance wala phone kaunsa hai? Humne sab compare karke final answer diya.",
      content: `<h2>15000 Mein Best Phone 2025</h2>
<p>Budget phones ka market India mein bohot bada hai. Iss price range mein Redmi, Realme aur Samsung ke beech tough competition hai.</p>
<h2>1. Redmi Note 13 — Best Overall</h2>
<p>108MP camera, 5000mAh battery, aur 6GB RAM — ye sab 13000 mein milta hai. Performance ke liye Snapdragon 685 processor hai jo daily tasks ke liye perfect hai.</p>
<h2>2. Realme Narzo 70 — Best for Gaming</h2>
<p>Gaming ke liye Realme Narzo 70 best hai iss budget mein. 90Hz display aur MediaTek Dimensity chip gaming experience smooth banate hain.</p>
<h2>3. Samsung Galaxy M15 — Best Brand Value</h2>
<p>Samsung ka software support aur build quality is budget mein stand out karti hai. 3 saal ka OS update guarantee milti hai.</p>
<h2>Final Verdict</h2>
<p>Overall best: Redmi Note 13. Gaming ke liye: Realme Narzo 70. Brand trust ke liye: Samsung Galaxy M15.</p>`,
      category_slug: 'tech-gadgets',
      show_homepage: 1, is_popular: 0,
      seo_title: "Best Phones Under 15000 India 2025 — Honest Review",
      seo_description: "15000 ke budget mein best phone kaunsa hai 2025 mein? Redmi, Realme aur Samsung ka honest comparison.",
      tags: "Budget Phone, Smartphone, Tech, Redmi, Realme, Samsung"
    },
    {
      title: "Jio New Plan 2025: Kya Sach Mein Worth It Hai? Full Details",
      excerpt: "Jio ne nayi plans launch ki hain 2025 mein. Kya ye purani plans se better hain? Poori detail yahan hai.",
      content: `<h2>Jio Ki Naya Plans — Kya Badla?</h2>
<p>Jio ne 2025 mein apni tariff plans revamp ki hain. Naye plans mein 5G data zyada mila hai lekin price bhi badhi hai thodi.</p>
<h2>New Plans Breakdown</h2>
<p>199 wali plan mein ab 2GB/day data milta hai unlimited calling ke saath. 28 din validity hai. Ye beginners ke liye best value plan hai.</p>
<p>499 wali premium plan mein 3GB/day data hai aur Disney+ Hotstar free subscription bhi milta hai. Students ke liye ye plan best hai entertainment ke saath data ke liye.</p>
<h2>Kya Switch Karna Chahiye?</h2>
<p>Agar tum heavy data user ho toh 299-499 range ki plan best rahegi. Light users ke liye 199 wali plan kaafi hai.</p>`,
      category_slug: 'viral-news',
      show_homepage: 1, is_popular: 0,
      seo_title: "Jio New Plan 2025 — Full Details and Review",
      seo_description: "Jio ke naye 2025 plans ki poori detail. Kaunsa plan best hai aur kya switch karna chahiye?",
      tags: "Jio, Telecom, Plans, 5G, India News"
    },
    {
      title: "ChatGPT vs Gemini vs Claude — Kaun Sa Best Hai 2025 Mein?",
      excerpt: "Teen bade AI tools ka honest comparison. Kaunsa AI tool students ke liye best hai aur kaunsa professional work ke liye?",
      content: `<h2>AI Tools Ka Honest Comparison</h2>
<p>2025 mein teen AI tools dominate kar rahe hain — ChatGPT, Google Gemini, aur Claude. Sabke apne strengths hain.</p>
<h2>ChatGPT — Jack of All Trades</h2>
<p>Sabse popular, sabse versatile. Coding, writing, analysis — sab mein achha hai. Free version mein GPT-4o milta hai jo kaafi powerful hai.</p>
<h2>Google Gemini — Best for Research</h2>
<p>Google search ke saath integration iska sabse bada plus point hai. Real-time information milti hai. Google Workspace users ke liye best choice.</p>
<h2>Claude — Best for Long Writing</h2>
<p>Long form content, detailed analysis, aur nuanced conversations mein Claude best hai. Hallucination kam hoti hai compared to others.</p>
<h2>Verdict for Students</h2>
<p>Daily use ke liye ChatGPT, research ke liye Gemini, aur serious writing ke liye Claude use karo. Teeno free hain — teeno try karo!</p>`,
      category_slug: 'ai-tools',
      show_homepage: 0, is_popular: 1,
      seo_title: "ChatGPT vs Gemini vs Claude — Best AI Tool 2025",
      seo_description: "Teen bade AI tools ka honest comparison. Students ke liye kaunsa best hai — ChatGPT, Gemini ya Claude?",
      tags: "ChatGPT, Gemini, Claude, AI Comparison, 2025"
    },
  ];

  // Get category IDs
  const cats = db.getAll('SELECT id, slug FROM categories');
  const catMap = {};
  cats.forEach(c => catMap[c.slug] = c.id);

  let added = 0;
  posts.forEach(p => {
    const slug = slugify(p.title, { lower: true, strict: true });
    const existing = db.getOne('SELECT id FROM posts WHERE slug=?', [slug]);
    if (existing) { console.log('Skip (exists):', p.title.slice(0,40)); return; }
    db.exec2(
      `INSERT INTO posts (title,slug,excerpt,content,category_id,status,show_homepage,is_popular,seo_title,seo_description,tags,youtube_url,focus_keyword,affiliate_products)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [p.title, slug, p.excerpt, p.content,
       catMap[p.category_slug]||null, 'active',
       p.show_homepage, p.is_popular,
       p.seo_title, p.seo_description, p.tags,
       '', p.tags.split(',')[0].trim(), '[]']
    );
    added++;
    console.log('Added:', p.title.slice(0,50));
  });

  console.log(`\n Done! ${added} demo posts added.`);
  console.log('Now run: node server.js');
  process.exit(0);
});
