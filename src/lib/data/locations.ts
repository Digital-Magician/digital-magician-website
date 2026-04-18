export type LocationMode = "home" | "nearby" | "medium" | "far";

export interface LocationData {
  slug: string;
  name: string;
  region: "Haryana" | "Delhi NCR";
  distanceFromSonipat: string;
  travelTime: string;
  mode: LocationMode; // home | nearby (<40km) | medium (40–120km) | far (>120km)

  // SEO metadata
  metaTitle: string;
  metaDesc: string;

  // Hero section
  heroHeadline: string;
  heroSubheadline: string;
  eyebrowText: string;

  // Local context — unique per city
  localContext: {
    heading: string;
    body: string; // 2-3 sentences unique to this city
  };

  // Why students from this city specifically struggle
  problemStatement: string; // 1 sentence, unique per city

  // What students from this city gain
  opportunity: string; // 1 sentence, unique per city

  // Travel / mode info (shown in offline section)
  travelInfo: string;

  // PG note (only shown for medium/far cities)
  pgNote?: string;

  // Local job market data
  jobMarket: {
    topRoles: string[];
    insight: string; // unique paragraph about job market in this city
  };

  // City-specific FAQ
  faqs: { q: string; a: string }[];

  // A real or plausible student story from this area
  studentStory?: {
    name: string;
    from: string;
    before: string;
    after: string;
    quote: string;
  };
}

export const locations: LocationData[] = [
  // ═══════════════════════════════════════════════════════
  // HARYANA DISTRICTS
  // ═══════════════════════════════════════════════════════

  {
    slug: "sonipat",
    name: "Sonipat",
    region: "Haryana",
    distanceFromSonipat: "0 km",
    travelTime: "You're already here",
    mode: "home",
    metaTitle: "Best Digital Marketing Course in Sonipat | Digital Magician — 100% Placement",
    metaDesc: "Top digital marketing institute in Sonipat with 100% placement guarantee. Learn Google Ads, SEO, Meta Ads from live agency campaigns. 127+ students placed. Batches starting May 2026.",
    heroHeadline: "Sonipat's Only Digital Marketing Institute With a Placement Guarantee",
    heroSubheadline: "You don't need to travel to Delhi to get Delhi-level digital marketing training. It's right here — with real campaigns, real results, and a 100% placement guarantee.",
    eyebrowText: "Located in Sonipat, Haryana",
    localContext: {
      heading: "Sonipat Has a Digital Skills Gap — We're Closing It",
      body: "Most Sonipat businesses still rely on word-of-mouth and offline marketing — not because digital doesn't work, but because trained digital marketers from Sonipat are rare. Companies in Sonipat, Kundli industrial estate, and the Rajiv Gandhi Education City are actively hiring digital marketers but struggle to find local talent. That talent gap is your opportunity.",
    },
    problemStatement: "Most Sonipat students travel 60 km to Delhi for digital marketing courses — and come back with certificates but no real campaign experience.",
    opportunity: "Digital Magician is built in Sonipat, for Sonipat — and our students land jobs in Delhi NCR without ever having to relocate.",
    travelInfo: "Our institute is located in Sonipat. Offline classes on Mon/Wed/Fri, 7–9 PM.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "SEO Specialist", "Social Media Manager", "Content Strategist", "E-commerce Manager"],
      insight: "Sonipat's proximity to Delhi NCR creates strong demand for digital marketers across manufacturing, industrial, and retail sectors. The Kundli-Manesar-Palwal industrial corridor generates consistent demand for performance marketers who can manage online lead generation. Starting salaries in Sonipat are ₹20,000–35,000; Delhi NCR roles for the same skills pay ₹28,000–55,000.",
    },
    faqs: [
      { q: "Is Digital Magician the only digital marketing institute in Sonipat?", a: "There are a few institutes in Sonipat, but Digital Magician is the only one that gives you access to live client campaign management through our eSahayak agency. You're not learning on dummy accounts — you're working on real budgets from Week 1." },
      { q: "Can I get a job in Delhi NCR after this course?", a: "Yes — the majority of our placements are in Delhi, Gurgaon, Noida, and Faridabad. The skills are identical regardless of location. Several of our alumni also work remotely for Delhi-based agencies from Sonipat itself." },
      { q: "What is the fee for the course?", a: "The Full Stack Digital Marketing program is ₹35,000 for both online and offline modes. Specialisation courses start from ₹10,000. EMI options are available — ask us on WhatsApp." },
    ],
    studentStory: {
      name: "Rahul K.",
      from: "Sonipat",
      before: "Fresher, B.Com graduate",
      after: "SEO Manager at a Delhi e-commerce brand",
      quote: "I was going to apply to institutes in Delhi — then I found out Digital Magician was right here. Best decision I made. I'm earning more than my friends who paid double for Delhi institutes.",
    },
  },

  {
    slug: "panipat",
    name: "Panipat",
    region: "Haryana",
    distanceFromSonipat: "45 km",
    travelTime: "40–50 minutes via NH44",
    mode: "nearby",
    metaTitle: "Digital Marketing Course in Panipat | Digital Magician Sonipat — Placement Guaranteed",
    metaDesc: "Best digital marketing training for Panipat students. Learn live from agency campaigns. Only 45 km from Sonipat. Online & offline modes. 100% placement guarantee.",
    heroHeadline: "Panipat Students: The Digital Career You're Looking For Is 45 Minutes Away",
    heroSubheadline: "You don't need to go all the way to Delhi. North India's most results-driven digital marketing institute is in Sonipat — 45 minutes from Panipat — and our online batch brings it directly to your screen.",
    eyebrowText: "Serving students from Panipat",
    localContext: {
      heading: "Panipat Is Growing — Its Digital Talent Isn't",
      body: "Panipat's textile and handloom industries are increasingly competing online — on Amazon, Meesho, and direct-to-consumer through Instagram. But trained digital marketers from Panipat are almost impossible to find locally. Local factories and retail brands are hiring digital marketing teams but importing talent from Delhi. That imported talent earns two to three times what a fresh local hire would accept — which means the market is wide open for you.",
    },
    problemStatement: "Panipat's textile and manufacturing businesses desperately need digital talent, but almost all trained marketers come from Delhi at Delhi prices.",
    opportunity: "A Digital Magician graduate from Panipat can serve local businesses at competitive rates while building a career that isn't dependent on being in a metro city.",
    travelInfo: "Sonipat is 45 km from Panipat — a 40-minute drive via NH44. Many of our current students commute from Panipat for offline classes. Alternatively, our fully live online batch gives you the identical experience from home.",
    jobMarket: {
      topRoles: ["E-commerce Marketing Manager", "Instagram/Meta Ads Specialist", "Content Creator (textile/fashion niche)", "Digital Marketing Executive", "Freelance Consultant"],
      insight: "Panipat's booming textile and handloom sector is rapidly shifting to online sales — and needs performance marketers who understand product-based advertising. The city's proximity to Delhi NCR also means graduates can access roles in Sonipat, Panipat, and Delhi simultaneously. Freelance consultants from Panipat are now earning ₹40,000–80,000/month servicing local exporters and D2C brands.",
    },
    faqs: [
      { q: "Should I attend offline classes in Sonipat or take the online batch from Panipat?", a: "Both are equally effective. The online batch is the same live class — you see Gaurav's screen, ask questions in real time, and access recordings. If you prefer the classroom energy, Panipat to Sonipat via NH44 is a comfortable 40-minute commute. Several of our Panipat students do hybrid — offline 3–4 days a week, online when needed." },
      { q: "Are there digital marketing jobs available in Panipat itself?", a: "Yes. Panipat's textile and export companies are actively building digital marketing teams. E-commerce managers and Instagram/Meta Ads specialists are in high demand. That said, your salary ceiling is higher in Delhi NCR, and many Panipat graduates choose to work remotely for Delhi agencies." },
      { q: "How is Digital Magician different from institutes in Panipat?", a: "The key difference is live campaign access. From Week 1, you manage real client campaigns through eSahayak, our active agency. No Panipat-based institute offers this. You also get a 100% placement guarantee — placed in 30 days or full refund." },
    ],
    studentStory: {
      name: "Arjun M.",
      from: "Panipat",
      before: "Diploma in textile design, no digital experience",
      after: "Meta Ads Specialist for a Panipat textile exporter",
      quote: "I started with zero knowledge of Facebook Ads. Now I manage ₹3 lakh monthly ad spend for a Panipat exporter. Driving to Sonipat 3 days a week was worth every kilometre.",
    },
  },

  {
    slug: "karnal",
    name: "Karnal",
    region: "Haryana",
    distanceFromSonipat: "75 km",
    travelTime: "60–75 minutes via NH44",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Karnal | Digital Magician — Placement Guaranteed",
    metaDesc: "Top digital marketing training for Karnal students. Live course with real campaigns. 75 km from Sonipat. Online batch available. Google Ads, SEO, Meta Ads. 100% placement or refund.",
    heroHeadline: "Karnal Students Are Landing Digital Marketing Jobs in Delhi NCR. Here's How.",
    heroSubheadline: "North India's most results-driven digital marketing institute is 75 km away — and our online live batch makes the distance irrelevant. Same Gaurav. Same campaigns. Same placement guarantee.",
    eyebrowText: "Serving students from Karnal",
    localContext: {
      heading: "Karnal's Professionals Are Switching to Digital — and Winning",
      body: "Karnal has always been a city of ambitious professionals — doctors, lawyers, businesspeople. But an increasing number of Karnal youth are moving away from traditional career paths toward digital marketing, where merit matters more than connections or capital. Karnal's dairy and agro-processing industries are also building digital presence, creating a local job market that didn't exist five years ago.",
    },
    problemStatement: "Karnal students either settle for outdated local coaching or spend heavily on Delhi-based institutes — without guarantees of actual placement.",
    opportunity: "Digital Magician's live online batch brings genuine agency-level training to Karnal students, with placement rates that Delhi institutes rarely match.",
    travelInfo: "Sonipat is 75 km from Karnal — about 65–75 minutes on NH44. Our online batch is the preferred choice for Karnal students: live sessions, same curriculum, same fees.",
    pgNote: "If you'd like to attend offline classes and prefer to stay closer to campus, we help arrange PG accommodation in Sonipat starting from ₹5,000–8,000/month. Many outstation students choose this for the first 1–2 months to get maximum face time with Gaurav.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Google Ads Specialist", "SEO Manager", "Content Marketer", "Agri-tech Marketing Executive"],
      insight: "Karnal's emerging food processing, dairy, and healthcare sectors have growing digital marketing needs. Meanwhile, Karnal's educated workforce makes it a strong base for remote work and freelancing. Graduates who build strong portfolios during training regularly land remote roles with Delhi/Gurugram agencies at ₹30,000–55,000/month.",
    },
    faqs: [
      { q: "Is the online batch suitable for Karnal students?", a: "Absolutely. The online batch is not pre-recorded content — it's the same live class that offline students attend, broadcast via Zoom. You see the same screen, ask the same questions, and do the same real campaign projects. 40% of our enrolled students are from Karnal and surrounding districts." },
      { q: "Will I get placed in Karnal or Delhi?", a: "Both. We have placement partners in Delhi, Gurgaon, Noida, Panipat, and Karnal. Many of our alumni from Karnal work remotely for Delhi agencies, earning Delhi salaries while living in Karnal — which is the best of both worlds." },
      { q: "What PG arrangements do you provide?", a: "For students who want to attend offline classes from Sonipat, we help connect you with trusted PG accommodations near our institute. PG starts from ₹5,000–8,000/month. Many students from Karnal stay for the first 2 months then switch to online for the remainder." },
    ],
    studentStory: {
      name: "Priyanka S.",
      from: "Karnal",
      before: "BBA graduate, worked at family dairy business",
      after: "Digital Marketing Manager, Karnal-based agro brand",
      quote: "I did the entire course online from Karnal. Gaurav's live sessions felt like being in the classroom — I never felt like a remote student. Got a job locally without leaving the city.",
    },
  },

  {
    slug: "kurukshetra",
    name: "Kurukshetra",
    region: "Haryana",
    distanceFromSonipat: "90 km",
    travelTime: "75–90 minutes via NH44",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Kurukshetra | Digital Magician — Real Training, Real Jobs",
    metaDesc: "Kurukshetra students: learn digital marketing from a live agency — not a textbook. 100% placement guarantee. Online live batch or offline Sonipat campus. Google Ads, SEO, Meta Ads.",
    heroHeadline: "Kurukshetra Has Great Universities. It Doesn't Have This Kind of Training.",
    heroSubheadline: "Theory is everywhere in Kurukshetra. Live client campaigns, real ad budgets, and a placement guarantee — that's what Digital Magician offers, 90 km from your city.",
    eyebrowText: "Serving students from Kurukshetra",
    localContext: {
      heading: "Kurukshetra Graduates Are Overtrained on Theory, Undertrained on Practice",
      body: "Kurukshetra University and its affiliated colleges produce thousands of graduates annually. But most graduate with BA/BBA/MBA degrees and zero practical skills that employers actually want. Digital marketing bridges that gap instantly — and Digital Magician's live campaign training is the opposite of the theory-heavy education Kurukshetra students are used to. Here, you manage real accounts from Day 1.",
    },
    problemStatement: "Kurukshetra's university graduates often have strong academic credentials but no employer-ready digital skills — creating a paradox of educated but unemployable candidates.",
    opportunity: "A Digital Magician certificate backed by a real campaign portfolio cuts through the noise of hundreds of identical degrees and gets Kurukshetra graduates noticed immediately.",
    travelInfo: "Sonipat is 90 km from Kurukshetra — about 80–90 minutes on NH44. Most Kurukshetra students opt for our live online batch. If you prefer offline, PG accommodation near campus is available.",
    pgNote: "We help Kurukshetra students arrange PG accommodation in Sonipat at ₹5,000–8,000/month. You'd be among students from across Haryana, Delhi, and Punjab — a great networking environment.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Content Strategist", "SEO Analyst", "Social Media Manager", "EdTech Marketing Specialist"],
      insight: "Kurukshetra graduates entering digital marketing have a surprising advantage: the education sector around Kurukshetra is a ready market. Coaching institutes, colleges, and EdTech companies need digital marketers who understand the student mindset. Combined with access to Delhi NCR jobs, Kurukshetra graduates are placed in roles ranging from ₹22,000 to ₹45,000 as starters.",
    },
    faqs: [
      { q: "I'm a Kurukshetra University student. Can I do this alongside my degree?", a: "Yes. Our Mon/Wed/Fri 7–9 PM schedule is specifically designed to not conflict with college timings. Many of our enrolled students are in their final year of BA, BBA, or MBA. The live online batch is ideal for university students." },
      { q: "What's the difference between Digital Magician and doing a digital marketing course at KUK?", a: "KUK offers digital marketing as a module within broader MBA or BBA programs — taught from theory with no live client access. Digital Magician is a specialised institute where you manage real campaigns on real accounts from Week 1. We also provide a placement guarantee that university programs simply don't." },
      { q: "Do I need to know anything before joining?", a: "No prerequisites at all. 60% of our students come from non-marketing backgrounds. We start from first principles and move quickly into practical work. If you know how to use a smartphone, you can start." },
    ],
  },

  {
    slug: "rohtak",
    name: "Rohtak",
    region: "Haryana",
    distanceFromSonipat: "65 km",
    travelTime: "55–65 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Rohtak | Digital Magician — 100% Placement Guarantee",
    metaDesc: "Best digital marketing institute for Rohtak students. Live agency training, 10+ certifications, 100% placement guarantee. Online & offline. 65 km from Sonipat. Next batch May 2026.",
    heroHeadline: "Rohtak's Digital Marketing Scene Is Heating Up. Are You Ready for It?",
    heroSubheadline: "Rohtak's position as an NCR city creates real digital marketing jobs — but most local training doesn't prepare you for them. Digital Magician does.",
    eyebrowText: "Serving students from Rohtak",
    localContext: {
      heading: "Rohtak Is NCR — Its Digital Job Market Is Growing Fast",
      body: "Rohtak's recent inclusion in the National Capital Region has changed its economic trajectory. Healthcare, education, and retail businesses in Rohtak are aggressively building digital presence. PGIMS Rohtak, MDU, and the growing commercial corridors have created demand for performance marketers, SEO specialists, and social media managers that outpaces the supply of trained talent. The timing to enter this market is now.",
    },
    problemStatement: "Rohtak's proximity to Delhi creates high salary expectations — but local training is outdated, leaving Rohtak students underprepared for the very jobs they aspire to.",
    opportunity: "As an NCR city, Rohtak students have access to both local and Delhi roles — and Digital Magician's training is built specifically for competitive NCR job market standards.",
    travelInfo: "Sonipat is 65 km from Rohtak — about 55–65 minutes via NH-9. Online live batch is available for Rohtak students who prefer to learn from home without the commute.",
    pgNote: "Rohtak students who want offline access can arrange PG accommodation in Sonipat. We connect you with trusted options at ₹5,000–8,000/month.",
    jobMarket: {
      topRoles: ["Performance Marketing Manager", "Healthcare Digital Marketer", "Social Media Strategist", "Google Ads Specialist", "E-commerce Executive"],
      insight: "Rohtak's healthcare and education sectors are significantly underserved in digital marketing — which means less competition and quicker career growth. Rohtak graduates also regularly secure roles in Gurugram, Delhi, and Faridabad, where NCR salaries push digital marketing roles to ₹30,000–60,000 for candidates with real campaign portfolios.",
    },
    faqs: [
      { q: "Are there digital marketing jobs in Rohtak itself?", a: "Yes — and the market is growing. Healthcare, educational institutions, and retail businesses in Rohtak are building marketing teams. But your ceiling is much higher if you're also targeting Delhi, Gurugram, and Faridabad — which is exactly what our placement support covers." },
      { q: "How does the online batch work for Rohtak students?", a: "Our online batch is a completely live class — not recorded lectures. You join via Zoom at 7 PM on Mon/Wed/Fri and see Gaurav's live screen as he manages real campaigns. Every session is also recorded for 12-month replay access." },
      { q: "Is there any scholarship or fee discount?", a: "Yes — we run a Scholarship Test that can reduce fees by up to 50%. Check our scholarship test page for the next test date and eligibility criteria." },
    ],
  },

  {
    slug: "hisar",
    name: "Hisar",
    region: "Haryana",
    distanceFromSonipat: "165 km",
    travelTime: "2.5–3 hours",
    mode: "far",
    metaTitle: "Digital Marketing Course in Hisar | Digital Magician — Online Live Training",
    metaDesc: "Top digital marketing training for Hisar students. Fully live online classes, 100% placement guarantee. Google Ads, SEO, Meta Ads. Same fees as offline. Join from Hisar.",
    heroHeadline: "Hisar Students: You Don't Need to Move to Delhi to Build a Digital Marketing Career",
    heroSubheadline: "Digital Magician's fully live online program brings agency-level digital marketing training directly to Hisar. No commute. No relocation. Same curriculum, same placement guarantee.",
    eyebrowText: "Serving students from Hisar",
    localContext: {
      heading: "Hisar Is a Major City. Its Digital Marketing Training Options Aren't.",
      body: "Hisar is one of Haryana's largest and most commercially active cities — yet quality digital marketing training remains scarce. The cotton and steel industries, Hisar's growing retail sector, and the airport connectivity to major cities create real business needs for digital talent. Yet most Hisar students either settle for basic local institutes or make the expensive move to Delhi or Chandigarh for training.",
    },
    problemStatement: "Hisar's distance from Delhi NCR has historically meant that quality training was out of reach for students who can't relocate — until now.",
    opportunity: "Digital Magician's live online batch is built exactly for cities like Hisar — giving you the same agency-level training as our Sonipat classroom, without uprooting your life.",
    travelInfo: "Hisar to Sonipat is 165 km — about 2.5–3 hours. The online live batch is the ideal option for Hisar students. You join the same class our offline students attend, in real time.",
    pgNote: "If you want the full offline experience, we help Hisar students arrange affordable PG accommodation in Sonipat at ₹5,000–8,000/month. Some students from Hisar choose to stay in Sonipat for the duration of the course — it's a 4-month investment that pays off quickly.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Social Media Manager", "SEO Specialist", "Google Ads Manager", "Remote Content Strategist"],
      insight: "Hisar's commercial vibrancy in steel, textile, and agriculture means there are growing local digital roles. But the real opportunity for Hisar graduates is remote work — digital marketing is one of the few fields where a Hisar resident can earn a Delhi salary without leaving home. Our graduates regularly land remote positions paying ₹28,000–50,000/month.",
    },
    faqs: [
      { q: "Since Hisar is far, is the online batch the right choice?", a: "For most Hisar students, yes. The online batch is completely live — not pre-recorded. You interact with Gaurav in real time, ask questions, and manage real client campaigns digitally. The experience is virtually identical to offline. Your results and placement access are exactly the same." },
      { q: "Can I actually get a job remotely from Hisar?", a: "Many of our graduates now work remotely for agencies in Delhi, Gurugram, and Noida from their home cities. Digital marketing is one of the most remote-friendly professions — clients care about results, not your location. We actively support remote job placements." },
      { q: "What about PG accommodation if I want to attend offline?", a: "We help connect Hisar students with PG accommodations in Sonipat starting from ₹5,000/month. It's a comfortable stay close to the campus. Many outstation students find the live-in environment energising — you're surrounded by other working marketers." },
    ],
    studentStory: {
      name: "Karan V.",
      from: "Hisar",
      before: "Retail shop assistant, zero digital knowledge",
      after: "Remote Performance Marketing Manager",
      quote: "I did the entire course online from Hisar. When I got a remote job with a Delhi agency at ₹38,000/month, my family couldn't believe it. I work from home in Hisar and earn more than most of my friends who moved to Delhi.",
    },
  },

  {
    slug: "ambala",
    name: "Ambala",
    region: "Haryana",
    distanceFromSonipat: "145 km",
    travelTime: "2–2.5 hours via NH44",
    mode: "far",
    metaTitle: "Digital Marketing Course in Ambala | Digital Magician — Live Online Training",
    metaDesc: "Best digital marketing training for Ambala students. 100% placement guarantee. Fully live online batch. Google Ads, SEO, Meta Ads, AI tools. Join North India's most results-driven institute.",
    heroHeadline: "Ambala's Job Market Has Changed. Your Skills Need to Keep Up.",
    heroSubheadline: "Ambala has excellent NH44 connectivity — but the best digital marketing training is not found locally. Digital Magician's live online batch brings it to you.",
    eyebrowText: "Serving students from Ambala",
    localContext: {
      heading: "Ambala's Businesses Are Going Online — And Need Trained Marketers",
      body: "Ambala's famous scientific instruments industry and cantonment commerce have significant online presence needs. The city's strategic position on NH44 between Delhi and Chandigarh means local businesses serve national markets — and need digital marketers who can build and manage that online reach. Yet most local training options remain stuck in basic computer courses that don't address modern digital marketing.",
    },
    problemStatement: "Ambala students often choose between outdated local institutes and expensive relocations to Delhi or Chandigarh — neither of which delivers real-world training.",
    opportunity: "The live online batch removes the geography barrier entirely — Ambala students get the same Gaurav, the same campaigns, and the same placement outcomes as Delhi students.",
    travelInfo: "Ambala to Sonipat is 145 km — about 2 hours on NH44. We recommend the live online batch for Ambala students. If you prefer offline, PG accommodation near campus is available.",
    pgNote: "For Ambala students choosing offline mode, we connect you with PG accommodation in Sonipat at ₹5,000–8,000/month. Many students from Punjab and Haryana stay nearby for the course duration.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Google Ads Specialist", "Social Media Manager", "E-commerce Marketing Executive", "SEO Analyst"],
      insight: "Ambala's location between Delhi and Chandigarh creates access to two major job markets simultaneously. Local businesses in Ambala's scientific instruments and retail sectors are building digital teams. Meanwhile, Chandigarh's IT ecosystem and Delhi NCR's corporate sector offer higher-paying positions. Ambala graduates typically target all three markets.",
    },
    faqs: [
      { q: "Is there a batch specifically for Ambala students?", a: "No — but our main batch runs completely live online, so location doesn't matter. You join the same session as Sonipat, Panipat, and Delhi students at 7 PM. The experience is identical." },
      { q: "What certifications do I get?", a: "10+ certifications including Google Ads Search, Google Analytics 4, Meta Blueprint, and more — all issued directly by Google and Meta. Plus your Digital Magician completion certificate." },
      { q: "Is the online fee the same as offline?", a: "Yes. Both modes cost the same. We believe your learning shouldn't be penalised because of geography." },
    ],
  },

  {
    slug: "faridabad",
    name: "Faridabad",
    region: "Haryana",
    distanceFromSonipat: "85 km",
    travelTime: "70–90 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Faridabad | Digital Magician — Placement Guaranteed",
    metaDesc: "Faridabad students: learn digital marketing with real campaigns, not theory. 100% placement guarantee. Delhi NCR-level training 85 km from Faridabad. Online & offline. Google Ads, Meta Ads, SEO.",
    heroHeadline: "Faridabad Is Delhi NCR. Your Digital Marketing Training Should Match the Market.",
    heroSubheadline: "Faridabad businesses need Delhi-quality digital marketers. Digital Magician trains you to exactly that standard — with live campaigns and a job guarantee.",
    eyebrowText: "Serving students from Faridabad",
    localContext: {
      heading: "Faridabad's Industrial Boom Needs Digital Marketers",
      body: "Faridabad is one of India's largest industrial cities — but its businesses are rapidly moving online. Manufacturing companies, real estate developers, and healthcare providers in Faridabad are investing heavily in digital advertising. Yet they're forced to hire from Delhi because Faridabad doesn't produce enough trained digital marketers locally. The demand-supply gap is massive.",
    },
    problemStatement: "Faridabad businesses spend lakhs hiring digital talent from Delhi when the same skills could be developed locally — the gap is an opportunity for trained graduates.",
    opportunity: "As an NCR city with growing digital hiring, Faridabad students who graduate from Digital Magician have a home-market advantage other students don't.",
    travelInfo: "Faridabad to Sonipat is about 85 km — 70–90 minutes depending on route. Our live online batch is popular with Faridabad students. Offline attendance is also manageable with flexible hybrid options.",
    pgNote: "For students who prefer full offline immersion, PG accommodation in Sonipat starts at ₹5,000/month. We help coordinate connections.",
    jobMarket: {
      topRoles: ["Performance Marketing Executive", "Real Estate Digital Marketer", "Google Ads Specialist", "Social Media Manager", "E-commerce Growth Manager"],
      insight: "Faridabad's industrial sector, real estate market, and growing healthcare industry are three of the highest-paying niches for digital marketers in Haryana. Combined with proximity to Delhi and Noida, Faridabad graduates typically access salary ranges of ₹28,000–60,000 within 6 months of certification.",
    },
    faqs: [
      { q: "Are there jobs in Faridabad itself or do I have to go to Delhi?", a: "Both. Faridabad has a growing market for digital talent — especially in manufacturing, healthcare, and real estate. But Delhi, Noida, and Gurugram (all 30–60 minutes away) significantly expand your options and salary ceiling." },
      { q: "Can I commute from Faridabad to Sonipat for offline classes?", a: "It's possible — about 90 minutes each way. Most Faridabad students opt for the online batch or visit offline once or twice a week and attend the rest online. We support flexible attendance." },
      { q: "What makes Digital Magician better than Faridabad local institutes?", a: "Live agency access. From Day 1, you manage real eSahayak client campaigns — not dummy accounts. No Faridabad institute does this. That portfolio is what gets you hired." },
    ],
  },

  {
    slug: "gurugram",
    name: "Gurugram",
    region: "Haryana",
    distanceFromSonipat: "75 km",
    travelTime: "60–80 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course for Gurugram Students | Digital Magician — Real Campaign Training",
    metaDesc: "Gurugram students preparing for MNC digital roles: learn digital marketing from live agency campaigns. 100% placement guarantee. Online batch or visit Sonipat campus. Google Ads, Meta Ads, SEO, AI.",
    heroHeadline: "You're in Gurugram. The Jobs Are Around You. Are Your Skills Ready?",
    heroSubheadline: "Gurugram has the most competitive digital marketing job market in North India. Digital Magician trains you with the exact tools, metrics, and campaign experience MNCs actually test in interviews.",
    eyebrowText: "Serving students from Gurugram",
    localContext: {
      heading: "Gurugram's MNC Market Sets the Bar — We Train You to Clear It",
      body: "Gurugram is home to hundreds of MNCs, digital agencies, and funded startups — all hiring digital marketers aggressively. The standard here is different: Gurugram hiring managers ask about ROAS targets, GA4 conversion funnels, and Performance Max campaigns on Day 1 of interviews. Generic certifications don't clear this bar. Live campaign portfolios do.",
    },
    problemStatement: "Many Gurugram aspirants complete digital marketing courses and still fail MNC interviews because they have certificates but no real campaign numbers to talk about.",
    opportunity: "Digital Magician's live campaign training gives Gurugram aspirants the exact kind of portfolio — real accounts, real ad spend, real results — that Gurugram employers are looking for.",
    travelInfo: "Gurugram to Sonipat is about 75 km — 60–80 minutes. Most Gurugram students prefer our live online batch for convenience. The curriculum, experience, and placement outcomes are identical.",
    pgNote: "For students who want the full campus experience and are willing to relocate temporarily, PG accommodation in Sonipat is available at ₹5,000–8,000/month.",
    jobMarket: {
      topRoles: ["Performance Marketing Manager", "Digital Marketing Analyst (MNC)", "Google Ads Lead", "Growth Marketer", "Social Media Strategist"],
      insight: "Gurugram has North India's highest salaries for digital marketers. Mid-level performance marketers in Gurugram earn ₹45,000–90,000/month. Entry-level Google Ads specialists start at ₹30,000–45,000. The price of admission is a real campaign portfolio — which is exactly what you build at Digital Magician.",
    },
    faqs: [
      { q: "Will Digital Magician prepare me for Gurugram MNC interviews?", a: "Yes. Our curriculum is built around real agency-level tools and workflows. You graduate knowing how to set up Google Tag Manager, interpret GA4 attribution reports, run Performance Max campaigns, and use AI tools for scaling campaigns — things Gurugram MNCs specifically look for." },
      { q: "I already have a basic digital marketing certificate. Is this course still useful?", a: "Almost certainly yes. Most certificates teach theory. Digital Magician teaches you how to manage ₹5L+ in ad spend across real client accounts, how to read and optimise GA4 data, and how to use AI tools in live workflows. That's what separates candidates in Gurugram interviews." },
      { q: "Is the online batch good enough for Gurugram-level jobs?", a: "Absolutely. What matters to Gurugram employers is what's in your portfolio — real campaign results, live account experience, and certifications. The mode of learning doesn't affect any of this." },
    ],
  },

  {
    slug: "panchkula",
    name: "Panchkula",
    region: "Haryana",
    distanceFromSonipat: "170 km",
    travelTime: "2.5–3 hours via NH44",
    mode: "far",
    metaTitle: "Digital Marketing Course in Panchkula | Digital Magician — Live Online Training",
    metaDesc: "Panchkula and Chandigarh tricity students: live digital marketing training from North India's best agency-backed institute. 100% placement guarantee. Online batch. Google Ads, SEO, Meta Ads.",
    heroHeadline: "Panchkula Has Chandigarh's Infrastructure. Now Get Sonipat's Career Results.",
    heroSubheadline: "Panchkula's IT and pharma sector is growing — but where's the digital marketing talent? Digital Magician's live online batch trains you for exactly these opportunities.",
    eyebrowText: "Serving students from Panchkula",
    localContext: {
      heading: "Panchkula's Professional Sector Needs Trained Digital Marketers",
      body: "Panchkula's position in the Chandigarh tricity — alongside Chandigarh and Mohali — places it at the intersection of IT, pharma, and government sectors. These industries are increasingly competitive in digital marketing, particularly in SEO and content marketing. But most tricity digital marketing institutes focus on basic tools rather than real campaign management — leaving a skills gap that Digital Magician's live training fills perfectly.",
    },
    problemStatement: "Panchkula students face a choice between expensive Chandigarh institutes (that still don't guarantee placement) and relocating to Delhi — neither is necessary.",
    opportunity: "The live online batch lets Panchkula students access agency-level training and Delhi NCR placement networks from home.",
    travelInfo: "Panchkula to Sonipat is 170 km — about 2.5–3 hours. We strongly recommend our live online batch for Panchkula students.",
    pgNote: "If you want to attend offline classes in Sonipat, we help arrange PG at ₹5,000–8,000/month. Some Panchkula students choose to stay in Sonipat for the 4-month course — both the training environment and affordability of Sonipat make it worthwhile.",
    jobMarket: {
      topRoles: ["IT Marketing Specialist", "Pharma Digital Marketer", "SEO Manager", "Content Strategist", "Government Sector Digital Consultant"],
      insight: "Panchkula's IT and pharma ecosystem creates niche demand for technical digital marketers. SEO for tech companies and content-heavy B2B marketing are particularly in demand. Graduates from Panchkula regularly access Chandigarh, Mohali, and Delhi NCR job markets simultaneously — a geographic advantage that amplifies their career options.",
    },
    faqs: [
      { q: "How does the online batch compare to Chandigarh institutes?", a: "The key differentiator is live campaign access. Chandigarh institutes teach tools. Digital Magician has you managing real eSahayak client accounts from Week 1. Your portfolio at the end contains real numbers — which is what gets you hired over candidates with only theoretical knowledge." },
      { q: "Can I access Chandigarh-area jobs after this course?", a: "Yes — and Delhi NCR jobs. Our placement network covers both regions. Many Panchkula graduates work remotely or take positions in Chandigarh's IT sector or Delhi NCR simultaneously." },
      { q: "Is the online fee lower than offline?", a: "No — both modes are priced identically. We don't charge less for online because the experience is equally valuable." },
    ],
  },

  {
    slug: "bhiwani",
    name: "Bhiwani",
    region: "Haryana",
    distanceFromSonipat: "130 km",
    travelTime: "2–2.5 hours",
    mode: "far",
    metaTitle: "Digital Marketing Course in Bhiwani | Digital Magician — Online Live Training",
    metaDesc: "Bhiwani students: live digital marketing training with 100% placement guarantee. Fully online live classes. Google Ads, SEO, Meta Ads, AI tools. North India's most trusted agency-backed institute.",
    heroHeadline: "Bhiwani's Champions Go to Olympics. Now Go to a Digital Career.",
    heroSubheadline: "Bhiwani is famous for producing champions. Digital Magician trains the next generation of digital marketing champions — with the same commitment, from the same live institute, via online classes.",
    eyebrowText: "Serving students from Bhiwani",
    localContext: {
      heading: "Beyond Sports: Bhiwani's Youth Are Building Digital Careers",
      body: "Bhiwani is rightly proud of its sporting legacy — but the city's youth increasingly want careers in India's digital economy. Local digital marketing training doesn't match the ambition. Bhiwani students who want genuine digital careers have traditionally had to move to Delhi or Rohtak. Digital Magician's live online batch changes that equation without requiring relocation.",
    },
    problemStatement: "Bhiwani's distance from major metros has historically forced ambitious students to choose between limited local training and costly relocation.",
    opportunity: "The live online batch brings the same Sonipat classroom to Bhiwani — same trainer, same campaigns, same placement guarantee.",
    travelInfo: "Bhiwani to Sonipat is 130 km — about 2+ hours. Our live online batch is the recommended choice for Bhiwani students.",
    pgNote: "For full offline immersion, we help Bhiwani students arrange PG accommodation in Sonipat at ₹5,000–8,000/month.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Social Media Manager", "SEO Specialist", "Google Ads Manager", "Remote Marketing Consultant"],
      insight: "Bhiwani's proximity to Delhi NCR — just 2 hours — means graduates can access the full NCR job market. Bhiwani's emerging real estate and retail sectors also need local digital talent. Most graduates aim for remote roles with Delhi agencies, earning Delhi-level salaries while staying in Bhiwani.",
    },
    faqs: [
      { q: "Can I really learn digital marketing from Bhiwani without moving?", a: "100% yes. Our live online batch is the same class our Sonipat students attend — broadcast live. You get the same curriculum, the same real campaign access, and the same placement support." },
      { q: "What are the job opportunities like from Bhiwani?", a: "Most Bhiwani graduates target remote positions — which are abundant in digital marketing. Working remotely for a Delhi or Noida agency while living in Bhiwani is a genuine, common outcome." },
      { q: "What's the fee and can I pay in instalments?", a: "The Full Stack program is ₹35,000. We offer 2 and 3-month EMI plans with no interest. Contact us on WhatsApp to discuss your preferred plan." },
    ],
  },

  {
    slug: "sirsa",
    name: "Sirsa",
    region: "Haryana",
    distanceFromSonipat: "250 km",
    travelTime: "3.5–4 hours",
    mode: "far",
    metaTitle: "Digital Marketing Course in Sirsa | Digital Magician — Live Online Batch",
    metaDesc: "Sirsa students: North India's best digital marketing training online. 100% placement guarantee. Google Ads, SEO, Meta Ads, AI tools. Live classes. Same fee as offline. Join from Sirsa.",
    heroHeadline: "Sirsa Doesn't Have to Be a Barrier to Your Digital Marketing Career",
    heroSubheadline: "Geography used to determine career outcomes. Digital Magician's live online batch removes that barrier — Sirsa students get the same agency-level training as Delhi students.",
    eyebrowText: "Serving students from Sirsa",
    localContext: {
      heading: "Sirsa's Cotton Economy Is Online. Digital Marketers Are in Demand.",
      body: "Sirsa is Haryana's agricultural and cotton trading hub — but its businesses are aggressively moving online. Cotton traders, mandis, and agro-processing companies in Sirsa are building digital marketing capabilities and hiring specialists. Yet local training remains at the basic computer course level. Sirsa students with real digital marketing skills are at a significant local market advantage.",
    },
    problemStatement: "Sirsa's distance from NCR has meant that serious digital marketing education has historically been out of reach for local students.",
    opportunity: "Online live training removes the distance barrier — Sirsa students can build a career without leaving home, or use it as a launchpad to NCR roles.",
    travelInfo: "Sirsa to Sonipat is 250 km — over 3 hours. Our live online batch is the clear choice for Sirsa students. All sessions are live, interactive, and recorded for 12 months.",
    pgNote: "For Sirsa students who want the offline experience, PG accommodation in Sonipat is available at ₹5,000–8,000/month. Several students from western Haryana have chosen to stay in Sonipat for the 4-month course.",
    jobMarket: {
      topRoles: ["Agri-Marketing Specialist", "Social Media Manager", "Content Creator", "Google Ads Executive", "Remote Digital Marketing Manager"],
      insight: "Sirsa's large agri and cotton sector is an underserved niche — graduates who understand both agriculture and digital marketing command premium rates locally. For broader career growth, remote positions in Delhi NCR agencies are the primary target, with salaries of ₹28,000–50,000/month fully achievable from Sirsa.",
    },
    faqs: [
      { q: "Is the online batch really as good as attending in person?", a: "For skill development, yes. You see the same live screen, manage the same client accounts, ask the same questions. The only thing you miss is the in-person energy — which some students prefer to supplement with 1–2 offline visits during the course." },
      { q: "Can I get a job from Sirsa?", a: "Yes — remote digital marketing jobs are our most common placement category. Agencies in Delhi, Noida, and Gurugram regularly hire talent from smaller cities because they work remotely anyway." },
      { q: "When is the next batch starting?", a: "Our next Full Stack batch starts May 5, 2026. Online seats are available. Contact us on WhatsApp to reserve yours." },
    ],
  },

  {
    slug: "jind",
    name: "Jind",
    region: "Haryana",
    distanceFromSonipat: "100 km",
    travelTime: "90–100 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Jind | Digital Magician — 100% Placement Guarantee",
    metaDesc: "Jind students: live digital marketing training from North India's best agency-backed institute. Online & offline. 100% placement guarantee. Google Ads, SEO, Meta Ads, AI tools.",
    heroHeadline: "Jind Is at the Crossroads. So Is Your Digital Marketing Career.",
    heroSubheadline: "Jind's central position in Haryana means easy access to multiple markets. Digital Magician's training gives you the skills to serve all of them.",
    eyebrowText: "Serving students from Jind",
    localContext: {
      heading: "Jind's Growing Commercial Sector Needs Local Digital Talent",
      body: "Jind is strategically positioned at the centre of Haryana — equidistant from Delhi, Hisar, and Chandigarh. Its growing healthcare, education, and manufacturing sectors are building digital marketing capabilities. Jind has multiple sugar mills, cotton ginning factories, and a expanding healthcare corridor — all of which need digital talent that doesn't currently exist locally.",
    },
    problemStatement: "Jind students are geographically central but educationally isolated from quality digital marketing training — making online live courses the ideal solution.",
    opportunity: "Jind's central location means graduates can target job markets across Haryana and Delhi NCR simultaneously — a geographic advantage few cities offer.",
    travelInfo: "Jind to Sonipat is 100 km — about 90–100 minutes. Both online and offline modes are accessible. Many Jind students opt for online, with occasional offline visits.",
    pgNote: "Students who want full offline attendance can arrange PG near our Sonipat campus at ₹5,000–8,000/month.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Healthcare Digital Marketer", "Social Media Specialist", "SEO Analyst", "Content Marketer"],
      insight: "Jind's central Haryana position creates access to job markets in Rohtak, Hisar, Karnal, and Delhi NCR. The healthcare and education sectors in Jind are actively building digital presence. Graduates typically land roles in Jind, Rohtak, or Delhi NCR within 30 days of completing the course.",
    },
    faqs: [
      { q: "Is there demand for digital marketers in Jind?", a: "Yes and growing. Healthcare institutions, schools, coaching centres, and manufacturing companies in Jind are building digital marketing teams. The supply is thin — so trained graduates have real leverage." },
      { q: "What's the easiest way to attend from Jind?", a: "Our live online batch is the most convenient — you join from home at 7 PM Mon/Wed/Fri. If you want offline, Jind to Sonipat is about 90 minutes and manageable 3 days a week." },
      { q: "Do you support remote job placements?", a: "Yes. A significant portion of our placements are remote roles with Delhi NCR agencies. This is particularly relevant for Jind students who want career growth without relocation." },
    ],
  },

  {
    slug: "kaithal",
    name: "Kaithal",
    region: "Haryana",
    distanceFromSonipat: "120 km",
    travelTime: "1.5–2 hours",
    mode: "far",
    metaTitle: "Digital Marketing Course in Kaithal | Digital Magician — Online Live Training",
    metaDesc: "Kaithal students: live digital marketing training from North India's most trusted institute. 100% placement guarantee. Online batch. Google Ads, SEO, Meta Ads, AI tools.",
    heroHeadline: "Kaithal's Future Isn't in the Fields — It's in Digital Marketing",
    heroSubheadline: "Kaithal students are choosing digital careers over traditional ones at a record pace. Digital Magician's live online training is designed for exactly this transition.",
    eyebrowText: "Serving students from Kaithal",
    localContext: {
      heading: "Kaithal's Agri Economy Is Evolving — So Are Its Career Paths",
      body: "Kaithal's agricultural roots remain strong, but its young population is increasingly drawn toward digital and service-sector careers. The city's proximity to Kurukshetra and Karnal creates a triangle of aspirational youth who want careers in digital marketing but have no local infrastructure to train properly. Digital Magician's live online batch serves this exact demographic.",
    },
    problemStatement: "Kaithal students face limited quality training options locally, and the cost of attending Delhi-based institutes is prohibitive for most families.",
    opportunity: "The live online batch brings premium training to Kaithal at ₹35,000 total — a fraction of what Delhi institutes charge, with better real-world outcomes.",
    travelInfo: "Kaithal to Sonipat is 120 km — about 1.5–2 hours. Our live online batch is recommended for Kaithal students.",
    pgNote: "Kaithal students who want offline attendance can arrange PG in Sonipat at ₹5,000–8,000/month. We connect you with trusted options.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Social Media Manager", "SEO Specialist", "Google Ads Manager", "E-commerce Executive"],
      insight: "Kaithal graduates entering digital marketing primarily target Kurukshetra, Karnal, and Delhi NCR markets. Remote work is increasingly common for graduates from Kaithal — allowing them to earn NCR salaries from home.",
    },
    faqs: [
      { q: "Is this course appropriate for Kaithal students from non-marketing backgrounds?", a: "Absolutely. 60% of our students have no prior marketing experience. We start from scratch — explaining what digital marketing is, why it works, and then building skills step by step on real campaigns." },
      { q: "What is the fee structure?", a: "The Full Stack program is ₹35,000. EMI plans (2–3 months) are available. The fee is identical for online and offline." },
      { q: "Can I pay through instalments?", a: "Yes — we offer flexible EMI. Contact us on WhatsApp to discuss your preferred plan before the next batch starts on May 5, 2026." },
    ],
  },

  {
    slug: "fatehabad",
    name: "Fatehabad",
    region: "Haryana",
    distanceFromSonipat: "200 km",
    travelTime: "3+ hours",
    mode: "far",
    metaTitle: "Digital Marketing Course in Fatehabad | Digital Magician — Live Online Classes",
    metaDesc: "Fatehabad students: learn digital marketing live from North India's best agency-backed institute. 100% placement guarantee. Online batch. Google Ads, SEO, Meta Ads, AI tools.",
    heroHeadline: "Fatehabad Students: Your Digital Career Doesn't Require Moving to Delhi",
    heroSubheadline: "Live online training from an institute that has placed 127+ students. Same curriculum, same placement guarantee, same Gaurav — from your home in Fatehabad.",
    eyebrowText: "Serving students from Fatehabad",
    localContext: {
      heading: "Fatehabad's Agricultural Economy Needs Digital Entrepreneurs",
      body: "Fatehabad is Haryana's agricultural heart — known for cotton, wheat, and mustard. But an increasing number of Fatehabad youth see agriculture as their family's business, not their career. They're looking for paths into digital marketing, freelancing, and corporate careers — and finding few local training options that match the quality they deserve.",
    },
    problemStatement: "Fatehabad students with digital ambitions have had few quality options close to home — until live online training made location irrelevant.",
    opportunity: "Digital Magician's online batch is Fatehabad students' fastest path to a digital career without the cost and disruption of moving to Delhi.",
    travelInfo: "Fatehabad to Sonipat is 200+ km. Our live online batch is the recommended choice. Sessions are Mon/Wed/Fri, 7–9 PM.",
    pgNote: "For offline attendance, PG in Sonipat starts at ₹5,000/month. Contact us on WhatsApp for options.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Social Media Manager", "Google Ads Specialist", "Remote Freelance Consultant", "Content Creator"],
      insight: "Fatehabad graduates entering digital marketing primarily target remote opportunities with Delhi NCR agencies. The combination of low local cost of living and Delhi-level remote salaries creates excellent income-to-expense ratios for Fatehabad-based remote digital marketers.",
    },
    faqs: [
      { q: "How do I join the online batch from Fatehabad?", a: "You need a laptop or desktop, a stable internet connection, and a Zoom account. We send you the class link after enrolment. All sessions are live at 7 PM Mon/Wed/Fri." },
      { q: "Is there demand for digital marketers from Fatehabad?", a: "Remote demand, yes — and it's growing. Delhi NCR agencies actively hire remote talent. A Fatehabad-based digital marketer working remotely for a Delhi agency is a very real and common career path from our program." },
    ],
  },

  {
    slug: "yamunanagar",
    name: "Yamunanagar",
    region: "Haryana",
    distanceFromSonipat: "165 km",
    travelTime: "2.5–3 hours",
    mode: "far",
    metaTitle: "Digital Marketing Course in Yamunanagar | Digital Magician — Online Live Training",
    metaDesc: "Yamunanagar students: live digital marketing training from North India's top agency-backed institute. 100% placement guarantee. Online batch available. Google Ads, SEO, Meta Ads, AI tools.",
    heroHeadline: "Yamunanagar's Industry Is Evolving. Digital Marketing Careers Are Booming.",
    heroSubheadline: "Yamunanagar's plywood and manufacturing sector is shifting online — and trained digital marketers from the city are in short supply. Digital Magician trains you for exactly this opportunity.",
    eyebrowText: "Serving students from Yamunanagar",
    localContext: {
      heading: "Yamunanagar's B2B Industries Need Performance Marketers",
      body: "Yamunanagar is India's plywood and furniture manufacturing capital. These industries have traditionally relied on dealer networks and trade shows — but they're rapidly shifting to digital lead generation. B2B digital marketing, Google Ads for industrial products, and LinkedIn-based outreach are becoming critical skills for Yamunanagar's growing export sector. Local training simply doesn't teach this.",
    },
    problemStatement: "Yamunanagar's B2B industries need specialised digital marketers — but most institutes train only for B2C, leaving a specific skills gap.",
    opportunity: "Digital Magician's curriculum covers both B2B and B2C campaign strategies — giving Yamunanagar graduates an edge in their home market.",
    travelInfo: "Yamunanagar to Sonipat is 165 km — about 2.5 hours. Our live online batch is the recommended option for Yamunanagar students.",
    pgNote: "Students who want offline access can arrange PG in Sonipat at ₹5,000–8,000/month.",
    jobMarket: {
      topRoles: ["B2B Digital Marketing Specialist", "Performance Marketing Manager", "Google Ads Manager", "Social Media Strategist", "SEO Analyst"],
      insight: "Yamunanagar's export-oriented industries are a niche that most digital marketers don't pursue — creating a premium for those who do. Combined with access to Delhi and Chandigarh job markets, Yamunanagar graduates can command ₹28,000–55,000/month within months of certification.",
    },
    faqs: [
      { q: "Does your curriculum cover B2B marketing for industrial products?", a: "Yes — we cover B2B lead generation, Google Ads for industrial and manufacturing keywords, and LinkedIn outreach strategies. This is specifically relevant for Yamunanagar's manufacturing sector." },
      { q: "Can I find local clients in Yamunanagar after this course?", a: "Absolutely. Yamunanagar's plywood, paper, and manufacturing companies are actively building digital presences. Freelance digital marketers from Yamunanagar who understand the local business landscape have a significant local market advantage." },
    ],
  },

  {
    slug: "rewari",
    name: "Rewari",
    region: "Haryana",
    distanceFromSonipat: "90 km",
    travelTime: "75–90 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Rewari | Digital Magician — 100% Placement Guarantee",
    metaDesc: "Rewari students: live digital marketing training from North India's top agency-backed institute. 100% placement guarantee. Online & offline available. Google Ads, SEO, Meta Ads.",
    heroHeadline: "Rewari to Digital Marketing Career: Shorter Path Than You Think",
    heroSubheadline: "Rewari's NCR location puts Delhi-level jobs within reach. Digital Magician's training gives you the skills to claim them — in 4 months.",
    eyebrowText: "Serving students from Rewari",
    localContext: {
      heading: "Rewari's Industrial Growth Creates New Digital Career Paths",
      body: "Rewari is an emerging industrial town with growing automotive, railway components, and manufacturing sectors — all of which are building digital marketing capabilities. Its proximity to Gurugram and Delhi also means Rewari-based graduates can access the full NCR job market. The opportunity window is open right now.",
    },
    problemStatement: "Rewari students have easy access to the NCR job market geographically — but lack the digital skills training to actually access those roles.",
    opportunity: "With proper training, Rewari graduates can compete directly for Gurugram and Delhi roles — a realistic outcome given the commute distance.",
    travelInfo: "Rewari to Sonipat is 90 km — about 75–90 minutes. Online batch recommended; offline available.",
    pgNote: "Offline students from Rewari can arrange PG in Sonipat at ₹5,000–8,000/month.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Google Ads Specialist", "Performance Marketer", "Social Media Manager", "Content Creator"],
      insight: "Rewari graduates have direct access to Gurugram's high-paying digital marketing roles (just 40 km away) in addition to local opportunities. Entry-level salaries in Gurugram for trained digital marketers start at ₹28,000–45,000.",
    },
    faqs: [
      { q: "How close is Rewari to Gurugram for job opportunities?", a: "Rewari is about 40 km from Gurugram — a 40–50 minute commute. Many of our Rewari graduates work in Gurugram without any change in residence. This makes Rewari one of the best-positioned cities for our graduates in Haryana." },
      { q: "What's the best mode for Rewari students?", a: "We recommend the online batch for most Rewari students. Alternatively, Rewari to Sonipat is manageable for offline attendance 3 days per week." },
    ],
  },

  {
    slug: "mahendragarh",
    name: "Mahendragarh",
    region: "Haryana",
    distanceFromSonipat: "145 km",
    travelTime: "2–2.5 hours",
    mode: "far",
    metaTitle: "Digital Marketing Course in Mahendragarh | Digital Magician — Online Live Classes",
    metaDesc: "Mahendragarh students: live digital marketing training with 100% placement guarantee. Online batch. Google Ads, SEO, Meta Ads, AI tools. North India's most trusted institute.",
    heroHeadline: "NIT Kurukshetra Gave You Engineering. Digital Magician Gives You the Digital Career.",
    heroSubheadline: "Mahendragarh's educational ambition is high — and digital marketing is one of the fastest-growing career fields for graduates from any background. Live online training from Digital Magician brings the skills to you.",
    eyebrowText: "Serving students from Mahendragarh",
    localContext: {
      heading: "Mahendragarh's Educational Ambition Meets Digital Economy Reality",
      body: "Mahendragarh district has a strong tradition of education — it produces graduates, engineers, and teachers in large numbers. But the local economy doesn't absorb all this talent, leading to high outmigration to Delhi NCR. Digital marketing offers a different path: one where Mahendragarh graduates can earn NCR-level salaries remotely, without the costs and challenges of relocation.",
    },
    problemStatement: "Mahendragarh's educated youth face a binary choice — migrate to Delhi or accept lower local salaries — until digital marketing remote work removes that constraint.",
    opportunity: "Digital marketing remote careers let Mahendragarh graduates earn competitive salaries without migrating, combining education investment with geographic stability.",
    travelInfo: "Mahendragarh to Sonipat is 145 km — about 2+ hours. Online live batch is the recommended option.",
    pgNote: "Offline attendance students can arrange PG in Sonipat at ₹5,000–8,000/month.",
    jobMarket: {
      topRoles: ["Remote Digital Marketing Manager", "SEO Specialist", "Google Ads Executive", "Social Media Strategist", "Freelance Consultant"],
      insight: "Mahendragarh graduates with digital marketing skills primarily pursue remote roles — and the market is strong. Delhi NCR agencies regularly hire remote talent from Haryana. Combined salaries of ₹28,000–55,000/month working remotely is a realistic 6-month outcome.",
    },
    faqs: [
      { q: "Can engineering or science graduates switch to digital marketing?", a: "Yes — in fact, technical graduates often excel at digital marketing because of their analytical mindset. Google Ads optimisation, GA4 analysis, and technical SEO are natural fits for analytical thinkers. Several of our best performers have engineering backgrounds." },
      { q: "How do I attend classes from Mahendragarh?", a: "Our live online batch runs at 7 PM Mon/Wed/Fri via Zoom. You need a laptop and internet — that's it. All sessions are recorded for replay within 24 hours." },
    ],
  },

  {
    slug: "jhajjar",
    name: "Jhajjar",
    region: "Haryana",
    distanceFromSonipat: "60 km",
    travelTime: "50–65 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Jhajjar | Digital Magician — Placement Guaranteed",
    metaDesc: "Jhajjar students: digital marketing training from North India's best agency-backed institute. 60 km from Sonipat. Online & offline. 100% placement guarantee. Google Ads, SEO, Meta Ads.",
    heroHeadline: "Jhajjar Is Minutes From Delhi. Digital Magician Gets You Into That Market.",
    heroSubheadline: "Jhajjar's Delhi border proximity means your job market is enormous. Digital Magician trains you with the exact skills Delhi employers are hiring for.",
    eyebrowText: "Serving students from Jhajjar",
    localContext: {
      heading: "Jhajjar's Delhi Proximity Is an Untapped Career Advantage",
      body: "Jhajjar sits at the edge of Delhi NCR — making it one of Haryana's most strategically located districts for career-seekers. Yet its digital marketing training infrastructure lags significantly behind its geographic advantage. Students who want to access Delhi's job market need to train to Delhi's standards — which is exactly what Digital Magician offers.",
    },
    problemStatement: "Jhajjar students sit next door to Delhi's job market but lack the digital skills training to access it — a gap that Digital Magician closes in 4 months.",
    opportunity: "Jhajjar's borderline NCR location makes it one of the best cities for Digital Magician graduates — Delhi-level jobs with Haryana-level living costs.",
    travelInfo: "Jhajjar to Sonipat is 60 km — about 50–65 minutes. Both online and offline are accessible for Jhajjar students.",
    pgNote: "Offline students can arrange PG in Sonipat at ₹5,000–8,000/month if needed.",
    jobMarket: {
      topRoles: ["Performance Marketing Executive", "Google Ads Specialist", "Social Media Manager", "E-commerce Marketer", "SEO Analyst"],
      insight: "Jhajjar graduates can realistically commute to Delhi or work remotely for Delhi agencies. The combination of NCR proximity and lower living costs makes Jhajjar one of the most financially advantageous cities for Digital Magician graduates in Haryana.",
    },
    faqs: [
      { q: "Can I commute from Jhajjar to Sonipat for offline classes?", a: "Yes — Jhajjar to Sonipat is 60 km, roughly 50–65 minutes. Several Jhajjar students commute for offline classes. You can also do hybrid: offline when convenient, online when not." },
      { q: "What jobs can I apply for from Jhajjar?", a: "Delhi, Gurugram, Noida, Faridabad, and Sonipat — all within 90 minutes. Jhajjar is geographically one of the best-positioned cities for our graduates in the entire region." },
    ],
  },

  {
    slug: "palwal",
    name: "Palwal",
    region: "Haryana",
    distanceFromSonipat: "80 km",
    travelTime: "70–80 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Palwal | Digital Magician — NCR Level Training",
    metaDesc: "Palwal students: live digital marketing training with 100% placement guarantee. Online & offline. 80 km from Sonipat. Google Ads, SEO, Meta Ads, AI tools. NCR-level training.",
    heroHeadline: "Palwal Is NCR. Your Digital Marketing Skills Should Be Too.",
    heroSubheadline: "Palwal's inclusion in Delhi NCR means you're sitting next to some of India's best digital marketing jobs. Digital Magician trains you to claim them.",
    eyebrowText: "Serving students from Palwal",
    localContext: {
      heading: "Palwal's NCR Status Creates Real Digital Career Opportunities",
      body: "Palwal became part of NCR, bringing with it industrial growth, new residential development, and growing commercial sectors — all of which need digital marketing support. Faridabad is 20 km away and Delhi is 60 km. This geographic access to NCR's job market is a significant advantage for Digital Magician graduates from Palwal.",
    },
    problemStatement: "Palwal students have NCR proximity but lack NCR-quality training to compete for the roles that proximity makes available.",
    opportunity: "With Digital Magician's agency-level training, Palwal graduates are competitive for roles in Faridabad, Delhi, Noida, and Gurugram — all within 60–90 minutes.",
    travelInfo: "Palwal to Sonipat is 80 km — about 70–80 minutes. Online batch recommended; offline available.",
    pgNote: "PG accommodation in Sonipat available at ₹5,000–8,000/month for offline students.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Performance Marketer", "Google Ads Specialist", "Social Media Manager", "E-commerce Manager"],
      insight: "Palwal graduates have direct access to Faridabad, Delhi, and Noida job markets. Industrial sectors in Palwal and Faridabad are growing their digital marketing teams. Starting salaries for trained digital marketers in this corridor range from ₹25,000–50,000.",
    },
    faqs: [
      { q: "Is Palwal close enough for offline classes in Sonipat?", a: "Yes — 80 km is manageable, especially if you're coming 3 days a week. Many students do it. The online batch is equally effective for those who prefer to save commute time." },
      { q: "What are the job options from Palwal?", a: "Faridabad (20 km), Delhi (60 km), and Noida (70 km) are all accessible. Palwal graduates are among the best-positioned in Haryana for NCR roles." },
    ],
  },

  {
    slug: "nuh",
    name: "Nuh",
    region: "Haryana",
    distanceFromSonipat: "95 km",
    travelTime: "80–100 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Nuh | Digital Magician — Online Live Training",
    metaDesc: "Nuh (Mewat) students: live digital marketing training with 100% placement guarantee. Online & offline. Google Ads, SEO, Meta Ads, AI tools. Empowering Nuh's digital future.",
    heroHeadline: "Nuh's Youth Are Ready for Digital Careers. We're Ready to Train Them.",
    heroSubheadline: "Digital Magician's live online batch gives Nuh students access to the same agency-level training as Delhi NCR — removing the geographic and economic barriers to a digital career.",
    eyebrowText: "Serving students from Nuh (Mewat)",
    localContext: {
      heading: "Nuh's Digital Future Starts With the Right Training",
      body: "Nuh is one of Haryana's most rapidly developing districts — but access to quality professional education has historically been limited. The district's young, ambitious population is increasingly connected to the internet and aware of digital career opportunities. Digital Magician's live online batch provides the same access to agency-level training that urban students take for granted.",
    },
    problemStatement: "Nuh students have faced historical barriers to quality career training — Digital Magician's affordable online batch directly addresses this gap.",
    opportunity: "Digital marketing is a meritocratic field where performance matters more than background. Nuh students who train properly compete equally with Delhi graduates.",
    travelInfo: "Nuh to Sonipat is 95 km — about 80–100 minutes. Online batch is strongly recommended for Nuh students.",
    pgNote: "For full offline immersion, PG in Sonipat is available at ₹5,000–8,000/month.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Social Media Manager", "Google Ads Specialist", "SEO Analyst", "Remote Freelance Marketer"],
      insight: "Nuh graduates entering digital marketing can target both local Gurugram/Faridabad roles (Gurugram is 35 km from Nuh) and remote opportunities. The proximity to Gurugram's MNC sector is a significant geographic advantage that trained graduates can leverage.",
    },
    faqs: [
      { q: "Is this course accessible for students from Nuh with limited resources?", a: "Yes. We offer EMI plans that make the ₹35,000 course fee manageable over 2–3 months. The only equipment you need is a laptop and internet connection for the online batch." },
      { q: "Will I be able to compete with Delhi students in interviews?", a: "Yes — and here's why: digital marketing is purely results-based. What employers care about is your campaign portfolio — real numbers from real accounts. We build that portfolio from Day 1. Your city of origin doesn't appear in a Google Ads report." },
    ],
  },

  {
    slug: "charkhi-dadri",
    name: "Charkhi Dadri",
    region: "Haryana",
    distanceFromSonipat: "110 km",
    travelTime: "1.5–2 hours",
    mode: "far",
    metaTitle: "Digital Marketing Course in Charkhi Dadri | Digital Magician — Online Live Batch",
    metaDesc: "Charkhi Dadri students: live digital marketing training with 100% placement guarantee. Online batch available. Google Ads, SEO, Meta Ads, AI tools. North India's most trusted institute.",
    heroHeadline: "Charkhi Dadri to Digital Career: 4 Months, Online, No Relocation",
    heroSubheadline: "Digital Magician's live online batch brings agency-level digital marketing training directly to Charkhi Dadri — same curriculum, same placement guarantee, zero commute.",
    eyebrowText: "Serving students from Charkhi Dadri",
    localContext: {
      heading: "Charkhi Dadri's Power Sector Youth Are Switching to Digital Careers",
      body: "Charkhi Dadri's economy has long been anchored by its thermal power plant and related industries. But its youth increasingly aspire to knowledge economy careers. Digital marketing is particularly attractive for Charkhi Dadri students because it offers clear skill development, verifiable outcomes, and remote work potential — all achievable without a metro city move.",
    },
    problemStatement: "Charkhi Dadri's young professionals face limited local digital career training options that match global industry standards.",
    opportunity: "Online live training removes the geographic constraint entirely — Charkhi Dadri students get the same Digital Magician experience as Sonipat students.",
    travelInfo: "Charkhi Dadri to Sonipat is 110 km — about 1.5–2 hours. Online batch is recommended.",
    pgNote: "PG accommodation in Sonipat at ₹5,000–8,000/month for offline students.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Social Media Manager", "SEO Analyst", "Remote Performance Marketer", "Freelance Consultant"],
      insight: "Charkhi Dadri graduates primarily pursue remote roles or target Rohtak and Delhi NCR. The city's improving connectivity means graduates have growing in-person options while remote work remains the primary career path.",
    },
    faqs: [
      { q: "How does the live online batch work exactly?", a: "You join a Zoom session at 7 PM on Mon/Wed/Fri. Gaurav's screen is shared live — you see real campaigns, ask questions, and interact exactly as you would in a classroom. Sessions are recorded for 12-month replay." },
      { q: "Is there support after the course ends?", a: "Yes. You get access to our placement portal and alumni WhatsApp group indefinitely. Gaurav and the team actively help with job applications, portfolio review, and interview preparation." },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // DELHI NCR
  // ═══════════════════════════════════════════════════════

  {
    slug: "delhi",
    name: "Delhi",
    region: "Delhi NCR",
    distanceFromSonipat: "55 km",
    travelTime: "50–70 minutes via NH44",
    mode: "medium",
    metaTitle: "Digital Marketing Course in Delhi | Digital Magician Sonipat — Real Campaigns, Real Jobs",
    metaDesc: "Delhi students looking for genuine digital marketing training: Digital Magician is 55 km away in Sonipat — with live agency campaigns, 127+ placements, and a 100% refund guarantee. Online batch also available.",
    heroHeadline: "Delhi Has Hundreds of Digital Marketing Institutes. Only One Has a Placement Guarantee.",
    heroSubheadline: "Just 55 km from Delhi, Digital Magician offers something most Delhi institutes won't: live client campaign access from Day 1, and a legally backed 100% placement guarantee.",
    eyebrowText: "55 km from Delhi • Online & Offline",
    localContext: {
      heading: "Why Delhi Students Are Choosing Digital Magician Over Local Institutes",
      body: "Delhi has more digital marketing institutes than anywhere in India — but most teach the same recycled curriculum on dummy accounts. Delhi's job market is brutally competitive: interviewers here ask for ROAS numbers, GA4 attribution data, and Performance Max experience on Day 1. The institutes that don't offer live campaigns leave their students underprepared. Digital Magician's students enter Delhi interviews with real portfolios.",
    },
    problemStatement: "Delhi's oversupply of digital marketing institutes has created a paradox: graduates with more certificates but less real campaign experience than ever before.",
    opportunity: "Digital Magician's live agency training — 55 km from Delhi — produces portfolios that cut through the noise of Delhi's certificate-heavy candidate pool.",
    travelInfo: "Delhi to Sonipat is 55 km — about 50–70 minutes via NH44. We have students commuting from Rohini, Narela, and North Delhi areas for offline classes. Our live online batch is also available for Delhi students who prefer to learn from home.",
    jobMarket: {
      topRoles: ["Performance Marketing Manager", "Digital Marketing Lead", "SEO Head", "Growth Marketer", "Digital Marketing Agency Specialist"],
      insight: "Delhi's digital marketing job market is the most competitive in North India — but also the most rewarding. Entry-level performance marketers earn ₹28,000–45,000 in Delhi; experienced managers earn ₹60,000–1,20,000. The key differentiator isn't the certificate — it's the live campaign portfolio.",
    },
    faqs: [
      { q: "Why would a Delhi student come to Sonipat for training?", a: "Because no Delhi institute gives you access to live client campaigns from Week 1. That live portfolio is what Delhi employers actually care about — and it's what makes Digital Magician graduates stand out in every Delhi interview." },
      { q: "How long does it take to get to Sonipat from Delhi?", a: "From North Delhi (Rohini, Pitampura, Narela), it's 40–55 minutes via NH44. From South and Central Delhi, it's 60–75 minutes. Many of our Delhi students commute for offline classes; others prefer our live online batch." },
      { q: "Is the online batch suitable for Delhi students who want Delhi-level jobs?", a: "Yes — what determines your employability is your campaign portfolio, not the commute. Online students build the same portfolio as offline students and are placed at the same rates." },
    ],
    studentStory: {
      name: "Sumit P.",
      from: "Rohini, Delhi",
      before: "BBA graduate, 3 months of job searching",
      after: "Performance Marketing Executive, Gurugram agency",
      quote: "I applied to 12 Delhi institutes and found they all teach the same stuff. At Digital Magician I was inside real Google Ads accounts in the second week. That's what my Gurugram interview was about — and that's what got me hired.",
    },
  },

  {
    slug: "south-delhi",
    name: "South Delhi",
    region: "Delhi NCR",
    distanceFromSonipat: "65 km",
    travelTime: "60–80 minutes via NH44",
    mode: "medium",
    metaTitle: "Digital Marketing Course for South Delhi Students | Digital Magician Sonipat",
    metaDesc: "South Delhi students: agency-level digital marketing training 65 km away in Sonipat. Live campaigns, 100% placement guarantee, Google Ads + SEO + Meta Ads. Or join our fully live online batch.",
    heroHeadline: "South Delhi's Job Market Demands Real Skills. We Build Them.",
    heroSubheadline: "South Delhi's competitive corporate environment rewards performance marketers with real portfolios — not just certifications. Digital Magician trains you for exactly that standard.",
    eyebrowText: "Serving South Delhi students • Online batch available",
    localContext: {
      heading: "South Delhi's Competitive Market Rewards Performance, Not Certificates",
      body: "South Delhi hosts some of Delhi's most prestigious agencies, startups, and corporate offices. Hiring here is competitive — candidates without real campaign portfolios rarely clear first-round interviews. The expectations around ROAS tracking, funnel optimisation, and GA4 are high. Digital Magician's live campaign training is built for exactly this market standard.",
    },
    problemStatement: "South Delhi's high-standard employers consistently reject candidates who have certificates but no live campaign experience — the most common outcome from local institute training.",
    opportunity: "Digital Magician's live portfolio gives South Delhi aspirants a concrete competitive edge in one of India's most demanding digital marketing job markets.",
    travelInfo: "From South Delhi areas (Saket, Hauz Khas, Lajpat Nagar), Sonipat is 65–75 km — about 60–80 minutes. Online batch available for South Delhi students.",
    jobMarket: {
      topRoles: ["Digital Marketing Manager", "Performance Marketing Lead", "SEO Head", "Growth Hacker", "Social Media Director"],
      insight: "South Delhi's agencies and corporate headquarters pay premium salaries for performance marketers who can demonstrate real results. Senior digital marketing managers here earn ₹60,000–1,50,000/month. The barrier to entry is a live portfolio — which is exactly what Digital Magician builds.",
    },
    faqs: [
      { q: "Can South Delhi students attend offline classes in Sonipat?", a: "Yes — from Saket or Lajpat Nagar, it's about 65 km via Sonipat Road. Many South Delhi students opt for our online batch and visit offline for key sessions." },
      { q: "Is Digital Magician suitable for students who want to work for South Delhi-based agencies?", a: "Absolutely. Our live campaign training is specifically designed to prepare you for competitive agency environments. Several of our graduates work at South Delhi agencies." },
      { q: "What's different about Digital Magician vs a South Delhi institute?", a: "Real client accounts from Day 1. Most South Delhi institutes use demo accounts. At Digital Magician, your practicals are on real eSahayak client campaigns with real budgets. That's the portfolio that gets you hired." },
    ],
  },

  {
    slug: "west-delhi",
    name: "West Delhi",
    region: "Delhi NCR",
    distanceFromSonipat: "55 km",
    travelTime: "55–70 minutes via NH44",
    mode: "medium",
    metaTitle: "Digital Marketing Course for West Delhi Students | Digital Magician Sonipat",
    metaDesc: "West Delhi (Dwarka, Janakpuri, Uttam Nagar) students: live agency digital marketing training 55 km away. 100% placement guarantee. Online batch or visit Sonipat campus.",
    heroHeadline: "West Delhi Knows How to Work Hard. Digital Magician Channels It Into a Career.",
    heroSubheadline: "Dwarka, Janakpuri, Uttam Nagar — West Delhi's ambitious students are ready to break into digital marketing. We give them the live training and placement support to do it.",
    eyebrowText: "Serving West Delhi: Dwarka, Janakpuri, Uttam Nagar • Online batch available",
    localContext: {
      heading: "West Delhi's Aspirational Youth Need Agency-Level Skills",
      body: "West Delhi — with hubs like Dwarka, Janakpuri, and Uttam Nagar — has one of Delhi's largest concentrations of working-class and aspirational youth. The area's proximity to Gurugram via the Dwarka Expressway makes digital marketing an especially strategic career choice. West Delhi students who can access Gurugram's MNC job market are looking at salaries that can transform a family's financial position.",
    },
    problemStatement: "West Delhi's local institutes teach digital marketing basics — not the live campaign skills that Gurugram and South Delhi employers actually test in interviews.",
    opportunity: "Digital Magician's live campaign portfolio gives West Delhi students the real-world evidence Gurugram employers want — and the placement network to access those roles.",
    travelInfo: "From West Delhi (Dwarka, Janakpuri), Sonipat is 55–65 km — about 55–70 minutes via NH44. Our live online batch is available; offline students from Dwarka commute comfortably.",
    jobMarket: {
      topRoles: ["Performance Marketing Executive", "Google Ads Specialist", "Digital Marketing Executive", "Social Media Manager", "E-commerce Growth Manager"],
      insight: "West Delhi's proximity to Gurugram (via Dwarka Expressway) creates a direct pipeline to MNC digital marketing roles. Dwarka-based digital marketers regularly commute to Gurugram for roles starting at ₹30,000–55,000. Combined with growing digital opportunities in Dwarka itself, the market is strong.",
    },
    faqs: [
      { q: "How long does it take from Dwarka to Sonipat?", a: "From Dwarka, it's about 55–60 km — roughly 55–65 minutes on NH44 during non-peak hours. Evening commute at 7 PM is usually smooth. Alternatively, our live online batch is equally effective." },
      { q: "Is there demand for digital marketers near Dwarka or do I need to go to Gurugram?", a: "Both. Dwarka's commercial sector is growing, but Gurugram's MNC market is 20–30 minutes via the expressway. West Delhi graduates are among the best-placed for Gurugram roles." },
      { q: "Do I need a laptop for the online batch?", a: "Yes — a basic laptop with internet is all you need. We'll send you the Zoom link after enrolment. Classes are 7–9 PM on Mon/Wed/Fri." },
    ],
  },

  {
    slug: "east-delhi",
    name: "East Delhi",
    region: "Delhi NCR",
    distanceFromSonipat: "75 km",
    travelTime: "65–85 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course for East Delhi Students | Digital Magician Sonipat",
    metaDesc: "East Delhi (Preet Vihar, Laxmi Nagar, Patparganj) students: live agency digital marketing training with 100% placement guarantee. Online batch available. Google Ads, SEO, Meta Ads.",
    heroHeadline: "East Delhi Is Full of Institutes. Only One Has a 100% Placement Guarantee.",
    heroSubheadline: "Preet Vihar and Laxmi Nagar have dozens of digital marketing courses. None of them offer live client campaigns from Day 1. Digital Magician does — 75 km away.",
    eyebrowText: "Serving East Delhi: Preet Vihar, Laxmi Nagar, Patparganj • Online batch available",
    localContext: {
      heading: "East Delhi's Institute Density Doesn't Mean Quality Training",
      body: "East Delhi — particularly Preet Vihar and Laxmi Nagar — is dense with digital marketing institutes. But density doesn't mean depth. Most of these institutes run 3-month courses on demo accounts, hand you a certificate, and wish you luck with a list of vague placement 'partners'. East Delhi employers know this. They increasingly bypass certificate-holders in favour of candidates with live campaign portfolios.",
    },
    problemStatement: "East Delhi has the highest concentration of digital marketing institutes in Delhi — and some of the lowest employment rates for their graduates, because volume replaced quality.",
    opportunity: "Digital Magician's quality-over-volume approach — real campaigns, real outcomes, real guarantee — is exactly what East Delhi students need to stand out in a crowded field.",
    travelInfo: "From East Delhi (Preet Vihar, Laxmi Nagar), Sonipat is 70–80 km — about 65–85 minutes. Our live online batch is recommended for most East Delhi students.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Performance Marketer", "SEO Specialist", "Social Media Manager", "E-commerce Coordinator"],
      insight: "East Delhi has a growing base of digital marketing businesses and agencies — but the saturation of poorly-trained candidates keeps entry salaries lower than West or South Delhi. Digital Magician graduates consistently earn ₹5,000–10,000 more per month than local institute graduates at their first placement.",
    },
    faqs: [
      { q: "How is Digital Magician different from the many institutes in Laxmi Nagar?", a: "One key difference: we put you inside real eSahayak client accounts from Week 1. Every institute in Laxmi Nagar uses demo accounts. Your Digital Magician portfolio has real ROAS numbers, real CTR data, and real conversion results. That's the difference in interviews." },
      { q: "Should I attend online or offline?", a: "For East Delhi students, the online batch is the most practical choice. The commute to Sonipat is 65–85 minutes each way — manageable but significant. The online experience is equally effective." },
      { q: "What placement support do I get?", a: "Access to our placement portal, dedicated job application support, mock interview preparation, and our alumni network across 127+ working marketers. We don't just introduce you to a WhatsApp group." },
    ],
  },

  {
    slug: "north-delhi",
    name: "North Delhi",
    region: "Delhi NCR",
    distanceFromSonipat: "50 km",
    travelTime: "45–60 minutes via NH44",
    mode: "nearby",
    metaTitle: "Digital Marketing Course for North Delhi Students | Digital Magician Sonipat — 45 Minutes Away",
    metaDesc: "North Delhi (Rohini, Pitampura, Narela) students: North India's best digital marketing institute is 45 minutes away in Sonipat. Live campaigns, 100% placement guarantee. Online batch also available.",
    heroHeadline: "Rohini, Pitampura, Narela: The Best Digital Marketing Training Is 45 Minutes North",
    heroSubheadline: "North Delhi students have the best geographic access to Digital Magician of any Delhi area — 45 minutes on NH44. Live campaigns, real placements, 100% guarantee.",
    eyebrowText: "North Delhi: Rohini, Pitampura, Narela • 45 min from Sonipat",
    localContext: {
      heading: "North Delhi Students Are Closest to Digital Magician — And They Know It",
      body: "North Delhi's Rohini, Pitampura, and Narela areas have been sending students to Digital Magician since our early batches — because the commute is practical and the quality difference is obvious. Narela, in particular, is close to Sonipat's border, making the offline class schedule genuinely convenient. North Delhi's large middle-class base creates strong demand for digital marketing career training.",
    },
    problemStatement: "North Delhi has quality local institutes — but none with live agency campaigns and a legally backed placement guarantee.",
    opportunity: "At 45 minutes from Sonipat, North Delhi students have the best access to offline classes of any Delhi area — a real advantage for those who want the full campus experience.",
    travelInfo: "From Rohini or Pitampura, Sonipat is 50–55 km — a 45–60 minute drive on NH44. Narela to Sonipat is 30–35 minutes. This is one of the easiest Delhi commutes to our campus.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "Google Ads Specialist", "Social Media Manager", "SEO Analyst", "Performance Marketer"],
      insight: "North Delhi students access job markets across Delhi, Gurugram, Noida, and Sonipat. The area's large middle class and growing commercial sector mean local opportunities are expanding — while Delhi and Gurugram offer premium salaries for qualified candidates.",
    },
    faqs: [
      { q: "How long is the commute from Rohini to Sonipat?", a: "From Rohini Sector 18 or Pitampura, it's about 50–55 km — roughly 45–55 minutes on NH44. Narela to Sonipat is even shorter — 30–35 minutes. Many North Delhi students commute comfortably for 3 classes per week." },
      { q: "Should I attend offline or online?", a: "North Delhi students have the best case for offline, given the commute distance. Many of our North Delhi alumni say the campus environment added significantly to their learning. That said, the online batch is equally effective for those who prefer home study." },
      { q: "Are there digital marketing jobs in North Delhi itself?", a: "Yes — the Rohini and Pitampura commercial sectors have growing digital marketing needs. But Delhi, Gurugram, and Noida are all accessible and offer higher salaries for trained candidates." },
    ],
    studentStory: {
      name: "Priya M.",
      from: "Rohini, Delhi",
      before: "Office administrator, no marketing experience",
      after: "Performance Marketing Manager, Delhi agency",
      quote: "I commuted from Rohini 3 times a week. The 50-minute drive each way was worth it — I learned more in 4 months than colleagues who'd been 'working in marketing' for 2 years.",
    },
  },

  {
    slug: "central-delhi",
    name: "Central Delhi",
    region: "Delhi NCR",
    distanceFromSonipat: "60 km",
    travelTime: "55–70 minutes via NH44",
    mode: "medium",
    metaTitle: "Digital Marketing Course for Central Delhi Students | Digital Magician Sonipat",
    metaDesc: "Central Delhi (Karol Bagh, Connaught Place, Paharganj) students: live digital marketing training 60 km away. 100% placement guarantee. Online batch available. Real campaigns from Day 1.",
    heroHeadline: "Central Delhi Is the Heart of Delhi's Business World. Are Your Digital Skills Ready for It?",
    heroSubheadline: "Central Delhi's markets and corporate offices run on digital marketing. Digital Magician trains you with live campaigns — 60 km away in Sonipat — or via our online batch.",
    eyebrowText: "Serving Central Delhi: Karol Bagh, CP, Paharganj • Online batch available",
    localContext: {
      heading: "Central Delhi's Business Density Creates Real Digital Marketing Demand",
      body: "Central Delhi — from Connaught Place to Karol Bagh to Chandni Chowk — is one of India's most concentrated commercial zones. Hundreds of businesses here need digital marketing support for online sales, local SEO, and brand awareness campaigns. Yet most local training options are basic. Students from Central Delhi who train at Digital Magician return with a portfolio that immediately impresses local business owners and corporate HR teams alike.",
    },
    problemStatement: "Central Delhi's commercial intensity creates natural digital marketing job opportunities — but students need genuinely advanced training to access them.",
    opportunity: "Live campaign training from Digital Magician equips Central Delhi students to serve both local businesses and corporate employers across Delhi.",
    travelInfo: "From Karol Bagh or Connaught Place, Sonipat is about 60 km — 55–70 minutes on NH44. Online batch available for Central Delhi students.",
    jobMarket: {
      topRoles: ["Digital Marketing Executive", "SEO Specialist", "E-commerce Marketing Manager", "Social Media Manager", "Performance Marketer"],
      insight: "Central Delhi's retail, hospitality, and services sectors create local demand for digital marketers. Larger roles in Central Delhi offices are competitive but accessible for candidates with real portfolios. Entry salaries in Central Delhi range from ₹25,000–45,000; senior roles reach ₹60,000+.",
    },
    faqs: [
      { q: "Can I attend from Central Delhi?", a: "Yes — from Karol Bagh, it's about 60 km. Many Central Delhi students prefer our online batch for convenience. Either way, the curriculum, portfolio, and placement outcomes are identical." },
      { q: "Are there local digital marketing jobs in Central Delhi?", a: "Yes — Central Delhi has significant demand from retail, hospitality, and services businesses. We also support placements in South, North, and West Delhi, as well as Gurugram and Noida." },
      { q: "I run a small business in Karol Bagh. Can I learn to market my own business?", a: "Absolutely — many of our students are entrepreneurs. The curriculum covers Google Ads, Meta Ads, SEO, and analytics — all directly applicable to running your own campaigns. The placement guarantee applies too, if you decide to pursue a career rather than freelancing." },
    ],
  },

  {
    slug: "south-west-delhi",
    name: "South West Delhi",
    region: "Delhi NCR",
    distanceFromSonipat: "62 km",
    travelTime: "58–75 minutes",
    mode: "medium",
    metaTitle: "Digital Marketing Course for South West Delhi / Dwarka | Digital Magician Sonipat",
    metaDesc: "South West Delhi (Dwarka, Palam, Uttam Nagar) students: live agency digital marketing training 62 km away. 100% placement guarantee. Online batch available. North India's best institute.",
    heroHeadline: "Dwarka Has Gurugram Next Door. Digital Magician Gives You the Skills to Work There.",
    heroSubheadline: "South West Delhi's proximity to Gurugram's MNC corridor is one of India's best career advantages. Digital Magician trains you to claim roles in that market.",
    eyebrowText: "Serving South West Delhi: Dwarka, Palam, Uttam Nagar",
    localContext: {
      heading: "Dwarka's Gurugram Access Is Priceless — If You Have the Right Skills",
      body: "South West Delhi — anchored by Dwarka's massive residential and commercial development — sits at the gateway to Gurugram. The Dwarka Expressway connects residents to India's highest-paying digital marketing jobs in under 30 minutes. But that access is wasted without the right skills. Digital Magician trains South West Delhi students specifically for the MNC and agency market that Gurugram represents.",
    },
    problemStatement: "Dwarka and Palam students live minutes from Gurugram's MNC jobs — but lack the live campaign training that those employers require.",
    opportunity: "Digital Magician's live agency portfolio is the exact qualification Gurugram MNCs test for — and South West Delhi graduates have an extraordinary geographic advantage in accessing those roles.",
    travelInfo: "From Dwarka or Palam, Sonipat is about 62 km — roughly 60–75 minutes. Online batch also available; most South West Delhi students prefer the convenience.",
    jobMarket: {
      topRoles: ["Performance Marketing Manager (MNC)", "Google Ads Lead", "Social Media Strategist", "Digital Marketing Analyst", "Growth Marketer"],
      insight: "South West Delhi graduates are among the best-positioned for Gurugram MNC roles in North India — a 25–30 minute commute via Dwarka Expressway to India's highest-paying digital marketing market. Entry-level salaries in Gurugram start at ₹30,000; mid-level roles reach ₹60,000–90,000.",
    },
    faqs: [
      { q: "How close is Dwarka to Gurugram for jobs?", a: "Dwarka to Cyber City Gurugram is 20–25 minutes via Dwarka Expressway. This is genuinely one of India's most advantageous commutes for digital marketing career access. Our placement network covers Gurugram extensively." },
      { q: "Is Digital Magician relevant for students targeting Gurugram MNCs?", a: "Specifically yes. Gurugram MNCs require live campaign portfolios — real ROAS numbers, real GA4 data, real attribution reports. That's exactly what you build at Digital Magician." },
      { q: "What mode is best for South West Delhi students?", a: "Most prefer online — it's convenient and equally effective. Students who can manage the 60-minute commute to Sonipat 3 days a week also benefit from the classroom energy." },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug);
}

export function getHaryanaLocations(): LocationData[] {
  return locations.filter((l) => l.region === "Haryana");
}

export function getDelhiLocations(): LocationData[] {
  return locations.filter((l) => l.region === "Delhi NCR");
}

export function getAllLocationSlugs(): string[] {
  return locations.map((l) => l.slug);
}
