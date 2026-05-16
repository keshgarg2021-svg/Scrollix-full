require('dotenv').config();
const { initDB, patchDB } = require('./database');

initDB().then(() => {
  patchDB();
  const { getDB } = require('./database');
  const db = getDB();

  // Clear old demo posts first
  db.exec2('DELETE FROM posts WHERE 1=1');
  console.log('Old posts cleared');

  const cats = db.getAll('SELECT id, slug FROM categories');
  const catMap = {};
  cats.forEach(c => catMap[c.slug] = c.id);

  const posts = [

    // ─── POST 1 ───
    {
      title: "Top 5 Free AI Tools Jo Har Indian Student Ko Use Karne Chahiye 2025 Mein",
      slug: "top-5-free-ai-tools-indian-students-2025",
      excerpt: "ChatGPT toh sab jaante hain — lekin is list mein kuch aisi free AI tools hain jo tumhara time bachayengi, assignments improve karengi, aur career mein edge dengi. Bilkul free.",
      content: `<p>2025 mein AI tools use karna optional nahi raha — ye ek skill ban gayi hai. Jo student aaj ye tools seekh leta hai, woh kal job market mein aage hoga. Aur achhi baat ye hai ki best tools free hain.</p>

<p>Maine personally ye sab tools use kiye hain aur sirf wahi list mein daal raha hoon jo genuinely kaam aate hain.</p>

<h2>1. ChatGPT (GPT-4o — Ab Free Hai)</h2>

<p>OpenAI ne 2024 ke end mein GPT-4o free users ke liye open kar diya. Ye ek massive upgrade hai. Ab free mein tum:</p>

<ul>
<li>Assignments ka rough draft bana sakte ho</li>
<li>Code debug kar sakte ho</li>
<li>Complex topics simple language mein samajh sakte ho</li>
<li>Mock interviews practice kar sakte ho</li>
</ul>

<p><strong>Student tip:</strong> Sirf answer mat maango — explain karne bol do. "Explain this like I'm a 10th standard student" — ye prompt magic karta hai.</p>

<h2>2. Google Gemini — Research Ka Best Friend</h2>

<p>Gemini ka sabse bada advantage ye hai ki ye internet se real-time information pull karta hai. ChatGPT ka knowledge cutoff hota hai, lekin Gemini aaj ki news bhi de sakta hai.</p>

<p>Plus agar Google account use karte ho toh Gemini directly Gmail, Docs, aur Drive ke saath kaam karta hai. Assignment likhni hai? Gemini tumhare Drive ke notes padh ke help karega.</p>

<p><strong>Best use case:</strong> Research papers ke liye sources dhundhna, current events pe content likhna, aur Google Workspace ke saath productivity badhana.</p>

<h2>3. Canva AI — Design Zero Se Hero</h2>

<p>Canva pehle se hi popular tha, lekin ab AI features ne ise next level pe pahuncha diya hai. Free plan mein bhi ye features milte hain:</p>

<ul>
<li><strong>Magic Write:</strong> Text type karo, paragraph generate ho jata hai</li>
<li><strong>Text to Image:</strong> Prompt se image banao presentations ke liye</li>
<li><strong>Background Remover:</strong> Kisi bhi photo ka background hatao</li>
<li><strong>Magic Resize:</strong> Ek design ko multiple formats mein convert karo</li>
</ul>

<p>College presentations, project posters, LinkedIn banners — sab Canva se ho jaata hai. Ek baar seekh lo, life bhar kaam aayega.</p>

<h2>4. Notion AI — Smart Notes Organization</h2>

<p>Notion waise bhi best note-taking app hai, lekin AI add hone ke baad ye study planner ban gaya hai.</p>

<p>Kya kar sakte ho:</p>
<ul>
<li>Long notes ka automatic summary banao</li>
<li>Action items automatically nikalo lectures se</li>
<li>Study schedule AI se banaao apni exam dates ke hisaab se</li>
<li>Kisi bhi topic pe quick flashcards generate karo</li>
</ul>

<p><strong>Free plan kaafi hai</strong> students ke liye. Education email se sign up karo — extra features milte hain.</p>

<h2>5. Perplexity AI — Google Ka Smart Version</h2>

<p>Ye tool abhi bhi bahut kam logo ko pata hai lekin ye genuinely useful hai. Perplexity ek AI-powered search engine hai jo:</p>

<ul>
<li>Sources ke saath answer deta hai — copy-paste accusation nahi aayega</li>
<li>Follow-up questions samajhta hai context ke saath</li>
<li>Academic papers search karne mein best hai</li>
<li>Completely free hai basic use ke liye</li>
</ul>

<p>Research assignment hai aur proper sources chahiye? Perplexity pe jao, Google pe nahi.</p>

<h2>Inhe Use Karna Kab Shuru Karo?</h2>

<p>Aaj. Abhi. Is article ke baad seedha ChatGPT kholo aur apne next assignment ka topic daalo. Experiment karo, galat jawab aayenge, par seekhte rahoge.</p>

<p>Ye tools tumhari mehnat replace nahi karte — ye tumhari mehnat ko zyada effective banate hain. Aur yahi difference hai un students mein jo aage jaate hain aur jo peeche reh jaate hain.</p>

<p><strong>Bonus tip:</strong> Teeno tools — ChatGPT, Gemini, aur Perplexity — ek saath use karo ek topic ke liye. Compare karo. Best answer khud clear ho jaayega.</p>`,
      category_slug: 'ai-tools',
      show_homepage: 1, is_popular: 1,
      focus_keyword: 'free AI tools for students India 2025',
      seo_title: "Top 5 Free AI Tools for Indian Students 2025 — Scrollix",
      seo_description: "ChatGPT se aage bhi bohot kuch hai. Ye 5 free AI tools Indian students ke liye game-changer hain — assignments, research, design sab cover karta hai.",
      tags: "AI Tools, Free AI, ChatGPT, Gemini, Canva, Student Life, 2025"
    },

    // ─── POST 2 ───
    {
      title: "Blogging Se 50,000 Per Month Kaise Kamayein — Complete Beginner Guide 2025",
      slug: "blogging-se-50000-per-month-beginner-guide-2025",
      excerpt: "Blogging se serious income possible hai — lekin sirf tab jab sahi strategy ho. Ye guide bilkul zero se shuru karke 6 mahine ka realistic roadmap deta hai. No shortcuts, only what actually works.",
      content: `<p>Sach bolunga — blogging se pehle mahine mein ₹50,000 nahi milenge. Lekin 6-12 mahine ki consistent mehnat ke baad ye amount realistic hai. Maine ye guide unke liye likha hai jo seriously start karna chahte hain, sirf curiosity ke liye nahi.</p>

<h2>Pehle Ye Samjho: Blogging Mein Paise Kaise Aate Hain</h2>

<p>3 main income streams hain:</p>

<ul>
<li><strong>Google AdSense:</strong> Visitors aate hain, ads dikhte hain, tum earn karte ho. Simple formula — jitna traffic, utna paisa.</li>
<li><strong>Affiliate Marketing:</strong> Tum kisi product ka link dete ho, koi kharidta hai, tum commission paate ho. Ye AdSense se jyada pay karta hai early stage mein.</li>
<li><strong>Sponsored Posts:</strong> Jab traffic badh jaaye, brands tujhe pay karenge apna product feature karne ke liye.</li>
</ul>

<p>Early stage mein <strong>affiliate marketing</strong> pe focus karo — ye bina zyada traffic ke bhi kuch income deta hai.</p>

<h2>Step 1: Sahi Niche Choose Karo</h2>

<p>Niche matlab wo specific topic jis pe tum likhoge. Galat niche = sab mehnat barbaad. Achhe niches India ke liye 2025 mein:</p>

<ul>
<li>Student life + earning tips (ye niche ek-dam untapped hai)</li>
<li>Budget tech reviews — phones, laptops under certain prices</li>
<li>Government scheme guides — crores log ye search karte hain</li>
<li>Health + fitness for Indians — desi diet, yoga, home workouts</li>
</ul>

<p>Rule ye hai: kuch aisa choose karo jisme tumhara genuine interest ho. Kyunki pehle 3 mahine mein sirf likhna hai, koi earning nahi hogi — aur sirf passion hi tumhe rokne se bachayega.</p>

<h2>Step 2: Domain aur Hosting</h2>

<p>Domain — wo tumhara address hai internet pe. Jaise scrollix.in. Cost: ₹500-1000 per year.</p>

<p>Hosting — jahan tumhari website store hogi. Beginners ke liye options:</p>

<ul>
<li><strong>Hostinger:</strong> ₹99-200/month, reliable, good support</li>
<li><strong>Cloudflare Pages:</strong> Free hai static sites ke liye</li>
<li><strong>Blogger.com:</strong> Bilkul free, custom domain connect hota hai</li>
</ul>

<p>Shuru mein Blogger ya free hosting se start karo. Jab earning shuru ho toh premium hosting lo.</p>

<h2>Step 3: Content Strategy — Ye Sabse Important Hai</h2>

<p>Har article 2 types mein se ek hona chahiye:</p>

<p><strong>Evergreen content:</strong> Wo topics jo hamesha relevant rahenge. Jaise "Best phones under 15000" — ye article aaj bhi search hoga, 2 saal baad bhi. Ye long-term traffic dete hain.</p>

<p><strong>Trending content:</strong> Aaj jo viral hai — Jio ka naya plan, koi government announcement, koi app launch. Ye short-term mein zyada traffic deta hai.</p>

<p>Ratio rakhо: 70% evergreen, 30% trending. Aur minimum 2 articles per week. Isse kam kiya toh Google notice nahi karega tumhara blog.</p>

<h2>Step 4: SEO — Google Tumhara Friend Hai</h2>

<p>SEO matlab Search Engine Optimization. Simple terms mein: ye ensure karta hai ki jab koi Google pe kuch search kare, tumhara article result mein aaye.</p>

<p>Basic SEO rules:</p>
<ul>
<li>Title mein main keyword raho — jaise "Best phones under 15000 India 2025"</li>
<li>Article mein H2, H3 headings use karo</li>
<li>Image alt text likhо</li>
<li>Article minimum 800 words ka hona chahiye</li>
<li>Internal links daalo — apne dusre articles se link karo</li>
</ul>

<h2>Step 5: AdSense ke Liye Apply Karo</h2>

<p>Google AdSense ke liye minimum requirements:</p>
<ul>
<li>20-25 quality articles published</li>
<li>Privacy Policy, About, Contact pages hone chahiye</li>
<li>Original content — copy-paste bilkul nahi</li>
<li>3-6 months purana domain (usually)</li>
</ul>

<p>Approval milne ke baad ads automatically dikhne lagte hain. India mein 1000 page views pe ₹30-80 average milta hai. Isliye traffic hi sab kuch hai.</p>

<h2>6 Month Realistic Roadmap</h2>

<ul>
<li><strong>Month 1-2:</strong> Setup + 20 articles likhо + SEO seekho</li>
<li><strong>Month 3:</strong> AdSense apply karo + affiliate links add karo</li>
<li><strong>Month 4:</strong> Traffic analysis karo, jo articles rank kar rahe hain unhe improve karo</li>
<li><strong>Month 5-6:</strong> Scale karo — zyada articles, social media se traffic lao</li>
</ul>

<p>6 mahine ke end mein agar consistently kiya toh ₹5,000-20,000/month realistic hai. ₹50,000 tak pahunchne mein 12-18 mahine lagte hain typically. Lekin ek baar wahan pahunch gaye toh ye passive income ban jaati hai.</p>

<p>Shuru karo. Perfectionism chodo. Pehla article galat hoga — theek hai. Consistency hi sab kuch hai blogging mein.</p>`,
      category_slug: 'make-money-online',
      show_homepage: 1, is_popular: 1,
      focus_keyword: 'blogging se paise kaise kamaye 2025',
      seo_title: "Blogging Se 50000 Per Month — Complete Beginner Guide 2025",
      seo_description: "Zero se blog start karke 6 mahine mein serious income kaise kamayein. AdSense, affiliate marketing aur sponsored posts ka realistic roadmap.",
      tags: "Blogging, Make Money, AdSense, Affiliate Marketing, Passive Income, 2025"
    },

    // ─── POST 3 ───
    {
      title: "BTech Students Ke Liye Top 7 Side Hustles — Zero Investment, Real Income",
      slug: "btech-students-side-hustles-zero-investment-2025",
      excerpt: "College mein pocket money se zyada earn karna chahte ho? Ye 7 side hustles actually kaam karte hain — kisi ne bhi investment nahi chahiye, sirf time aur skills chahiye jo tumhare paas already hain.",
      content: `<p>BTech mein padhte waqt paise ki problem almost sabko hoti hai. Family pe depend rehna bura lagta hai, aur part-time job ke liye time bhi nahi hota. Side hustle is dono ka solution hai — apne time pe kaam karo, apne rate pe.</p>

<p>Ye 7 options Maine research karke aur real students se baat karke compile kiye hain. Koi bhi theoretical nahi hai — sab actually kaam karta hai.</p>

<h2>1. Freelance Web Development — Sabse High Paying</h2>

<p>Agar HTML, CSS, aur thoda JavaScript aata hai — tum freelancing shuru kar sakte ho. Local businesses hamesha websites dhundhte rehte hain. Ek simple 5-page website ka rate:</p>

<ul>
<li>Local restaurant/shop website: ₹5,000 - ₹15,000</li>
<li>E-commerce basic site: ₹15,000 - ₹40,000</li>
<li>Landing page: ₹3,000 - ₹8,000</li>
</ul>

<p><strong>Kahan clients milenge:</strong> Apne area ke businesses mein seedha jao. Unka koi website nahi hai? Tum unka solution ho. Fiverr aur Internshala pe profile banao.</p>

<p><strong>Kitna time chahiye:</strong> Ek website 3-7 din mein ban jaati hai part-time mein.</p>

<h2>2. Content Writing — Har Jagah Demand Hai</h2>

<p>Acha likhna ata hai? Hindi ya English mein? Bahut saari companies hain jo regularly content writers hire karti hain — blogs, product descriptions, social media posts ke liye.</p>

<p>Rates beginners ke liye:</p>
<ul>
<li>English: ₹0.50 - ₹2 per word (500 words = ₹250-1000)</li>
<li>Hindi: ₹0.30 - ₹1 per word</li>
<li>Technical content: ₹2-5 per word (engineering background advantage)</li>
</ul>

<p>Platforms: Internshala, Pepper Content, Writopedia, LinkedIn. Ek writing sample banao pehle — portfolio hogi toh clients milenge.</p>

<h2>3. YouTube Channel — Long Term Ka Best Investment</h2>

<p>Ye ek aise side hustle hai jisme pehle 6-12 mahine koi earning nahi hogi — lekin baad mein passive income ban jaata hai.</p>

<p>BTech student ke liye video ideas:</p>
<ul>
<li>Subject tutorials — Engineering Mathematics, DBMS, OS concepts</li>
<li>Gadget unboxing aur honest reviews</li>
<li>College life vlogs — hostel life, exam prep, placement tips</li>
<li>Coding tutorials in Hindi</li>
</ul>

<p>Monetization ke liye 1000 subscribers + 4000 watch hours chahiye. Ek baar ho gaya toh ads + sponsorships dono milenge.</p>

<h2>4. Online Tutoring — Tumhari Padhai Hi Kamaye</h2>

<p>Jo subjects tumhe achhe lagte hain — unhe junior students ko padhao. Demand hamesha hoti hai. Rates:</p>

<ul>
<li>School students (8th-12th): ₹200-500 per hour</li>
<li>College juniors (1st-2nd year): ₹150-400 per hour</li>
<li>Competitive exam prep (JEE/GATE): ₹500-1500 per hour</li>
</ul>

<p>Online platforms: Vedantu, Chegg, Superprof. Ya apne college ke notice board pe poster lagao.</p>

<h2>5. Graphic Design via Canva — Creative Income</h2>

<p>Canva seekhna easy hai — ek weekend mein basics aa jaate hain. Design kar sakte ho:</p>
<ul>
<li>Social media posts for businesses</li>
<li>Logos for small startups</li>
<li>Presentation templates</li>
<li>Event posters</li>
</ul>

<p>Instagram pe portfolio page banao. Post karo apna kaam. Clients khud aayenge. Starting rate ₹500-2000 per project — experience ke saath badhta jaata hai.</p>

<h2>6. Data Entry aur Micro Tasks — Jab Kuch Nahi Chahiye</h2>

<p>Ye highest paying nahi hai, lekin sabse easy start hai. Exam season ke paas best option hai jab time kam hota hai.</p>

<ul>
<li>Amazon Mechanical Turk — small tasks, ₹50-200 per hour</li>
<li>Clickworker — data categorization tasks</li>
<li>Remotasks — AI training data work</li>
</ul>

<p>Ek din mein 2-3 ghante karke ₹300-600 easily kamaye ja sakte hain.</p>

<h2>7. Sell Your Notes aur Study Material</h2>

<p>Tumhare notes valuable hain — seriously. Ek achha notes set jo 3rd year student ne likha ho, 1st year waale ko ₹100-500 mein bik sakta hai.</p>

<p>Kaise sell karo:</p>
<ul>
<li>PDF banao apne notes ke</li>
<li>College WhatsApp groups mein share karo info</li>
<li>Telegram channel banao "XYZ College Notes" naam se</li>
<li>Instamojo ya Gumroad pe list karo</li>
</ul>

<p>Ek baar notes ready hain toh ye pure passive income hai — ek baar likhо, bar bar bikta hai.</p>

<h2>Kaunsa Start Karo?</h2>

<p>Agar technical skills achhi hain → Freelance web development ya tutoring.</p>
<p>Agar writing pasand hai → Content writing ya blog shuru karo.</p>
<p>Agar creative ho → Graphic design ya YouTube.</p>
<p>Agar abhi kuch nahi chahiye seedha → Data entry se start karo.</p>

<p>Sab se important baat: ek hi choose karo. Do-teen cheezein ek saath shuru karna common mistake hai. Ek mein master banо, income aane lage, phir diversify karo.</p>`,
      category_slug: 'student-life',
      show_homepage: 1, is_popular: 1,
      focus_keyword: 'BTech students side hustle India 2025',
      seo_title: "BTech Students Ke Liye 7 Side Hustles Zero Investment 2025",
      seo_description: "College mein zero investment se real income karne ke 7 proven methods. Web development se leke notes selling tak — sab actually kaam karte hain.",
      tags: "Side Hustle, BTech, Student Life, Freelancing, Earn Online, Zero Investment"
    },

    // ─── POST 4 ───
    {
      title: "Best Budget Phones Under ₹15,000 in India 2025 — Honest Comparison",
      slug: "best-phones-under-15000-india-2025-honest-comparison",
      excerpt: "15,000 ke budget mein Redmi, Realme, aur Samsung ke beech confusion? Humne specifications, camera, battery aur performance sab compare karke ek clear winner select kiya hai.",
      content: `<p>India ka budget phone market duniya ka sabse competitive market hai. ₹15,000 mein aaj itna milta hai jitna 5 saal pehle ₹30,000 mein milta tha. Lekin options itne zyada hain ki confusion guaranteed hai.</p>

<p>Maine 2025 ke sabse popular budget phones compare kiye hain — specifications ke baad bhi real-world performance dekhi hai. Ye honest review hai, koi sponsored content nahi.</p>

<h2>Redmi Note 13 5G — Best Overall Pick</h2>

<p><strong>Price: ₹13,999 - ₹15,999</strong></p>

<p>Ye phone iss budget mein overall winner hai. Kyon:</p>

<ul>
<li><strong>Display:</strong> 6.67 inch AMOLED, 120Hz refresh rate — ye is budget mein rare hai</li>
<li><strong>Camera:</strong> 108MP main camera — daylight photos genuinely achhi aati hain</li>
<li><strong>Battery:</strong> 5000mAh + 33W fast charging — din bhar easily chalti hai</li>
<li><strong>Performance:</strong> Snapdragon 685 — everyday tasks smooth, heavy gaming mein thodi heating</li>
</ul>

<p><strong>Kiske liye best:</strong> General user jo achha display, decent camera, aur reliable battery chahta ho.</p>

<p><strong>Weakness:</strong> Gaming performance average hai. Heavy gamers ke liye better options hain.</p>

<h2>Realme Narzo 70 Pro — Best for Gaming</h2>

<p><strong>Price: ₹14,999</strong></p>

<p>Gaming ke liye iss budget mein ye sabse acha option hai:</p>

<ul>
<li><strong>Processor:</strong> MediaTek Dimensity 7050 — gaming mein Snapdragon 685 se clearly better</li>
<li><strong>Display:</strong> 6.67 inch AMOLED, 120Hz — same class as Redmi</li>
<li><strong>Camera:</strong> 50MP Sony sensor — fewer megapixels lekin image processing better</li>
<li><strong>Battery:</strong> 5000mAh, 67W fast charging — charging speed mein Redmi se aage</li>
</ul>

<p><strong>Kiske liye best:</strong> Jo log BGMI, Free Fire, ya any heavy game regularly khelte hain.</p>

<p><strong>Weakness:</strong> Realme ka software (UI) thoda bloatware heavy hai. Settings mein jaake unnecessary apps uninstall karne padte hain.</p>

<h2>Samsung Galaxy M15 5G — Best for Brand Trust</h2>

<p><strong>Price: ₹12,999 - ₹14,999</strong></p>

<p>Samsung ka naam aata hai toh ek extra trust factor aata hai — aur ye wajah hai:</p>

<ul>
<li><strong>Software Support:</strong> 4 years OS updates + 5 years security patches guaranteed — koi bhi budget brand ye nahi deta</li>
<li><strong>Battery:</strong> 6000mAh — is list mein sabse badi battery</li>
<li><strong>Display:</strong> Super AMOLED, 90Hz — 120Hz nahi hai lekin quality excellent hai</li>
<li><strong>Build Quality:</strong> Samsung ka plastic better quality ka lagta hai compared to competitors</li>
</ul>

<p><strong>Kiske liye best:</strong> Jo phone 3-4 saal use karna chahte hain bina upgrade ke. Long term investment ke liye ye best value hai.</p>

<p><strong>Weakness:</strong> Processor (Dimensity 6100+) gaming ke liye average hai. Camera bhi competitors se slightly weak.</p>

<h2>iQOO Z9 Lite — Dark Horse</h2>

<p><strong>Price: ₹10,999 - ₹12,999</strong></p>

<p>Budget se thoda kam mein milta hai lekin performance punch karta hai:</p>

<ul>
<li>Snapdragon 4 Gen 2 processor — surprisingly fast</li>
<li>90Hz IPS LCD — AMOLED nahi hai</li>
<li>5000mAh battery</li>
</ul>

<p>Agar 11-13k mein best phone chahiye toh ye winner hai.</p>

<h2>Final Verdict — Kaun Sa Lo?</h2>

<table>
<tr><th>Use Case</th><th>Best Phone</th></tr>
<tr><td>Best Overall</td><td>Redmi Note 13 5G</td></tr>
<tr><td>Gaming</td><td>Realme Narzo 70 Pro</td></tr>
<tr><td>Long Term Use</td><td>Samsung Galaxy M15 5G</td></tr>
<tr><td>Tight Budget (11-13k)</td><td>iQOO Z9 Lite</td></tr>
</table>

<p>Mere personal recommendation: <strong>Redmi Note 13 5G</strong> — AMOLED display, 120Hz, 108MP camera, aur Snapdragon processor ek saath milna iss budget mein best deal hai.</p>

<p>Ek last tip: Amazon aur Flipkart pe sale events mein ye phones ₹1000-2000 saste milte hain. Wait kar sako toh sale ka wait karo.</p>`,
      category_slug: 'tech-gadgets',
      show_homepage: 1, is_popular: 1,
      focus_keyword: 'best phone under 15000 India 2025',
      seo_title: "Best Phones Under 15000 India 2025 — Honest Comparison",
      seo_description: "Redmi Note 13, Realme Narzo 70 Pro, Samsung Galaxy M15 — 15000 budget mein kaunsa phone best hai? Honest comparison with clear winner.",
      tags: "Budget Phone, Smartphone Review, Redmi, Realme, Samsung, Tech, 2025"
    },

    // ─── POST 5 ───
    {
      title: "Jio New Plans 2025: Kya Sach Mein Worth It Hain? Poora Breakdown",
      slug: "jio-new-plans-2025-worth-it-full-breakdown",
      excerpt: "Jio ne 2025 mein apni plans revamp ki hain. Prices badhi hain, lekin data aur benefits bhi badhe hain. Kya switch karna chahiye? Kaun sa plan best value deta hai? Poori detail yahan hai.",
      content: `<p>Jio ne ek baar phir apni plans mein changes kiye hain aur log confused hain. Pehle ki tarah 'sabse sasti' wali baat nahi rahi — ab value for money dekhna padega. Maine sabse popular plans compare ki hain taaki tumhe khud calculate na karna pade.</p>

<h2>Kya Badla Hai 2025 Mein?</h2>

<p>Jio ne teen main changes kiye hain:</p>
<ul>
<li>Base plan prices mein 10-15% increase</li>
<li>5G data allowance badha diya popular plans mein</li>
<li>OTT bundling — JioCinema Premium, aur kuch plans mein Disney+ Hotstar</li>
</ul>

<p>Price badhna surprising nahi hai — Airtel aur Vi bhi 2024 mein prices badha chuke hain. Asli sawaal ye hai ki naye prices mein value milti hai ya nahi.</p>

<h2>Plans Ka Comparison</h2>

<p><strong>₹189 Plan — Light Users Ke Liye</strong></p>
<p>1.5GB/day, unlimited calling, 28 din. Ye plan unke liye hai jo primarily calls ke liye sim use karte hain. Data kam lagta hai? Ye theek hai.</p>

<p><strong>₹299 Plan — Most Popular (Best Value)</strong></p>
<p>2GB/day, unlimited 5G data hotspot, unlimited calling, 28 din + JioCinema Basic. Ye majority users ke liye sweet spot hai. ₹10 per day se kam mein 2GB daily + unlimited 5G — ye achha deal hai.</p>

<p><strong>₹479 Plan — Heavy Users + OTT Lovers</strong></p>
<p>2.5GB/day, unlimited 5G, JioCinema Premium (₹99/month value), 84-day validity option. OTT dekhte ho? Ye plan effectively JioCinema subscription include karta hai toh net cost justify hoti hai.</p>

<p><strong>₹999 Plan — Quarterly Heavy Plan</strong></p>
<p>3GB/day, 84 days, JioCinema Premium. Heavy user jo recharge ki tension nahi chahta — ye best hai. Per day cost ₹12 se kam aati hai.</p>

<h2>Kiske Liye Kaun Sa Plan?</h2>

<ul>
<li><strong>Student in hostel:</strong> ₹299 plan — 2GB + 5G unlimited hotspot se laptop bhi chal jaayega</li>
<li><strong>Working professional:</strong> ₹479 plan — OTT included, data sufficient</li>
<li><strong>Light user (mostly calls):</strong> ₹189 plan — simple aur cheap</li>
<li><strong>Heavy binge-watcher:</strong> ₹999 quarterly — sabse economical per day</li>
</ul>

<h2>Jio vs Airtel — Kya Compare Karna Chahiye?</h2>

<p>Same budget mein Airtel thoda mehenga hai lekin network quality consistently better hai in some areas. Agar tumhare area mein Jio ka 5G coverage achha hai — Jio clearly better value deta hai. Agar Jio ka signal weak rehta hai tumhare location pe — Airtel pay karna worth it ho sakta hai.</p>

<p>Simple test: 1 week Jio use karo. Speed test karo subah, dopahar, raat. Average 20+ Mbps aa raha hai consistently? Jio rakho. Kam aa raha hai? Switch consider karo.</p>

<h2>Verdict</h2>

<p>Jio ke naye plans mein ₹299 plan sabse zyada sense banata hai majority Indian users ke liye. ₹10/day mein 2GB data + unlimited 5G hotspot + JioCinema basic — ye 2025 mein genuinely good value hai.</p>

<p>Price badhi zaroor hai compared to 2023, lekin data aur benefits bhi bade hain. Jio ne abhi bhi apna "affordable" tag maintain rakha hai competitors ke mukable mein.</p>`,
      category_slug: 'viral-news',
      show_homepage: 1, is_popular: 0,
      focus_keyword: 'Jio new plans 2025 best plan India',
      seo_title: "Jio New Plans 2025 — Kaunsa Plan Best Value Hai? Full Breakdown",
      seo_description: "Jio ne 2025 mein plans revamp ki hain. Kaun sa plan best value deta hai? ₹189 se ₹999 tak poora comparison yahan hai.",
      tags: "Jio Plans, Telecom, 5G, India News, Recharge Plan, 2025"
    },

    // ─── POST 6 ───
    {
      title: "ChatGPT vs Gemini vs Claude 2025 — Kaun Sa AI Actually Best Hai?",
      slug: "chatgpt-vs-gemini-vs-claude-best-ai-2025",
      excerpt: "Teeno bade AI tools ka honest, practical comparison. Students ke liye kaunsa best hai, professionals ke liye kaunsa, aur coding ke liye kaunsa? Clear answers bina jargon ke.",
      content: `<p>Har koi kehta hai apna AI tool best hai. Lekin honestly? Teeno — ChatGPT, Gemini, aur Claude — alag-alag cheezein best karte hain. Galat tool use karna time waste hai. Is article mein clear batata hoon ki kaunse kaam ke liye kaunsa use karo.</p>

<h2>Quick Overview — Teeno Kaun Hain?</h2>

<p><strong>ChatGPT</strong> — OpenAI ka tool, 2022 se AI revolution ka face. GPT-4o ab free mein available hai.</p>

<p><strong>Google Gemini</strong> — Google ka AI, internet se real-time information access karta hai. Google Workspace ke saath tight integration.</p>

<p><strong>Claude</strong> — Anthropic ka AI, long documents handle karne mein best, safe aur thoughtful responses ke liye jaana jaata hai.</p>

<h2>ChatGPT — Kahan Best Hai?</h2>

<p>ChatGPT abhi bhi sabse versatile tool hai. Koi bhi task do — kuch na kuch kar deta hai. Specific strengths:</p>

<ul>
<li><strong>Coding:</strong> Debug karna, code explain karna, new code likhna — ye ChatGPT ka strongest suit hai</li>
<li><strong>Creative writing:</strong> Stories, poems, marketing copy — creativity mein best</li>
<li><strong>Plugins aur tools:</strong> DALL-E image generation, web browsing, code execution — sab ek jagah</li>
<li><strong>Conversational:</strong> Back-and-forth conversation natural lagti hai</li>
</ul>

<p><strong>Weakness:</strong> Free version mein usage limits hain. Knowledge cutoff hoti hai — real-time information nahi milti without browsing mode.</p>

<p><strong>Best for:</strong> Coding, creative tasks, aur general everyday use.</p>

<h2>Google Gemini — Kahan Best Hai?</h2>

<p>Gemini ka main advantage real-time internet access hai. Aaj ki news, latest prices, current events — ye sab Gemini bata sakta hai instantly.</p>

<ul>
<li><strong>Research:</strong> Google search + AI analysis combo — academic research ke liye powerful</li>
<li><strong>Google Workspace:</strong> Gmail mein email likhwao, Docs mein summary banwao, Sheets mein formula banwao — directly</li>
<li><strong>Multimodal:</strong> Image, audio, video sab process kar sakta hai</li>
<li><strong>Real-time info:</strong> Stock prices, cricket scores, breaking news — sab milta hai</li>
</ul>

<p><strong>Weakness:</strong> Creative writing mein ChatGPT se weak. Coding bhi ChatGPT ke level ka nahi hai.</p>

<p><strong>Best for:</strong> Research, current events, aur Google Workspace users.</p>

<h2>Claude — Kahan Best Hai?</h2>

<p>Claude ko log underestimate karte hain — galat karte hain. Specific areas mein ye clearly best hai:</p>

<ul>
<li><strong>Long documents:</strong> 100+ pages ka PDF doh — summary, analysis, Q&A — sab ek shot mein</li>
<li><strong>Nuanced writing:</strong> Formal reports, essays, academic writing mein tone aur depth better hai</li>
<li><strong>Accuracy:</strong> Hallucination (galat facts banana) ChatGPT se kam hoti hai</li>
<li><strong>Instructions follow karna:</strong> Complex, multi-step instructions accurately follow karta hai</li>
</ul>

<p><strong>Weakness:</strong> Real-time internet access limited hai. Image generation nahi kar sakta.</p>

<p><strong>Best for:</strong> Long document analysis, serious writing tasks, aur accuracy-critical work.</p>

<h2>Head-to-Head Comparison</h2>

<table>
<tr><th>Task</th><th>Winner</th></tr>
<tr><td>Coding / Debugging</td><td>ChatGPT</td></tr>
<tr><td>Real-time Research</td><td>Gemini</td></tr>
<tr><td>Long Document Analysis</td><td>Claude</td></tr>
<tr><td>Creative Writing</td><td>ChatGPT</td></tr>
<tr><td>Google Workspace Integration</td><td>Gemini</td></tr>
<tr><td>Factual Accuracy</td><td>Claude</td></tr>
<tr><td>Image Generation</td><td>ChatGPT (DALL-E)</td></tr>
<tr><td>Daily General Use</td><td>ChatGPT</td></tr>
</table>

<h2>Students Ke Liye Practical Guide</h2>

<p><strong>Assignment likhna hai:</strong> Claude se outline lo, ChatGPT se expand karwao, Grammarly se polish karo.</p>

<p><strong>Research karna hai:</strong> Gemini se start karo — real-time sources milenge. Phir Claude se analysis karwao.</p>

<p><strong>Coding project hai:</strong> ChatGPT — directly. Ye is kaam mein best hai.</p>

<p><strong>News/current events samajhne hain:</strong> Gemini — real-time internet access hai.</p>

<h2>Final Verdict</h2>

<p>Ek tool choose karna galat approach hai. Teeno free hain — teeno use karo different purposes ke liye.</p>

<p>Lekin agar ek hi use karna ho toh: <strong>ChatGPT</strong> — sabse versatile, sabse capable overall, aur sabse large community hai matlab problems ke solutions already available hain.</p>

<p>2025 mein AI literacy ek skill hai. In tools ko sirf curiosity se mat use karo — strategically use karo. Jo log ye seekh lete hain aaj, woh 5 saal baad clearly aage honge.</p>`,
      category_slug: 'ai-tools',
      show_homepage: 0, is_popular: 1,
      focus_keyword: 'ChatGPT vs Gemini vs Claude best AI 2025',
      seo_title: "ChatGPT vs Gemini vs Claude 2025 — Kaun Sa Best Hai? Honest Comparison",
      seo_description: "Teeno bade AI tools ka practical comparison bina jargon ke. Students ke liye kaunsa best, coding ke liye kaunsa, research ke liye kaunsa — clear answers.",
      tags: "ChatGPT, Gemini, Claude, AI Comparison, AI Tools, 2025"
    }

  ];

  let count = 0;
  posts.forEach(p => {
    db.exec2(
      `INSERT INTO posts
       (title,slug,excerpt,content,category_id,status,show_homepage,is_popular,
        seo_title,seo_description,tags,focus_keyword,youtube_url,affiliate_products,
        created_at,updated_at)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now'),datetime('now'))`,
      [p.title, p.slug, p.excerpt, p.content,
       catMap[p.category_slug]||null,
       'active', p.show_homepage, p.is_popular,
       p.seo_title, p.seo_description, p.tags,
       p.focus_keyword, '', '[]']
    );
    count++;
    console.log(`✅ Added: ${p.title.slice(0,55)}...`);
  });

  console.log(`\n🎉 Done! ${count} real blog posts added to database.`);
  console.log('Now run: node server.js\n');
  process.exit(0);
});
