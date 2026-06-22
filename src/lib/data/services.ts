// ── Service-course landing pages (Phase 2) ───────────────────────────────────
// Each service powers a geo-landing page at /{service.slug}/{city}
// e.g. /seo-course/sonipat. These pages target "<service> course in <city>"
// keywords and link to the matching full program page for enrollment.

export interface ServiceCourse {
  key: string; // internal id, also used in route files
  slug: string; // URL segment, e.g. "seo-course" -> /seo-course/{city}
  name: string; // "SEO Course"
  shortLabel: string; // "SEO"
  programSlug: string; // enroll target under /programs/{slug}
  icon: string;
  fee: number;
  duration: string;
  certifications: number;
  // Eyebrow + headline use {city} as a placeholder, filled per page.
  tagline: string; // 1-line value prop (no city)
  intro: string; // 2-3 sentences, may include {city}
  whatYouLearn: string[];
  tools: string[];
  roles: { role: string; salary: string }[];
  faqs: { q: string; a: string }[]; // may include {city}
}

// Cities these service pages are generated for. Each slug must exist in
// locations.ts. Curated to nearby Haryana + key Delhi NCR cities with real
// demand (rather than every district) to keep each page unique, not thin.
export const SERVICE_CITY_SLUGS = [
  "sonipat",
  "ganaur",
  "panipat",
  "karnal",
  "kurukshetra",
  "rohtak",
  "faridabad",
  "gurugram",
  "sohna",
  "panchkula",
];

export const serviceCourses: ServiceCourse[] = [
  {
    key: "seo",
    slug: "seo-course",
    name: "SEO Course",
    shortLabel: "SEO",
    programSlug: "seo-mastery",
    icon: "🔍",
    fee: 25000,
    duration: "2 Months",
    certifications: 3,
    tagline: "Rank real websites on Google — and get paid for it.",
    intro:
      "Learn search engine optimisation the way agencies actually practise it — by ranking real client websites, not memorising theory. This SEO course in {city} takes you from keyword research to technical SEO, link building, and AI-powered content, so you graduate able to deliver rankings clients pay for.",
    whatYouLearn: [
      "Keyword research and search intent mapping that finds winnable keywords",
      "On-page SEO, content optimisation, and AI-assisted writing (Surfer, NeuronWriter)",
      "Technical SEO: site architecture, Core Web Vitals, indexing, schema markup",
      "Off-page SEO and white-hat link building that survives Google updates",
      "Local SEO and Google Business Profile ranking for nearby businesses",
      "Programmatic and Generative Engine Optimisation (GEO) for the AI-search era",
    ],
    tools: ["Ahrefs", "SEMrush", "Surfer SEO", "Screaming Frog", "Google Search Console", "Google Analytics 4", "RankMath"],
    roles: [
      { role: "SEO Executive", salary: "₹22,000 – ₹38,000/mo" },
      { role: "SEO Specialist", salary: "₹38,000 – ₹60,000/mo" },
      { role: "Freelance SEO Consultant", salary: "₹40,000 – ₹1,20,000/mo" },
    ],
    faqs: [
      { q: "Do I need coding or technical skills to join the SEO course?", a: "No. We start from the fundamentals and build up to technical SEO step by step. If you can use a browser and a spreadsheet, you can do this course." },
      { q: "Will I work on real websites during the SEO course in {city}?", a: "Yes. You rank real client and project websites during the course — not dummy sites. You graduate with measurable ranking results and a portfolio you can show in interviews." },
      { q: "How long is the SEO course and what does it cost?", a: "The SEO Mastery program runs 2 months with live classes (online and offline in {city}). Fees are ₹25,000 with EMI options. The Full Stack program includes SEO plus ads, content, and AI if you want the complete skill set." },
    ],
  },
  {
    key: "google-ads",
    slug: "google-ads-course",
    name: "Google Ads Course",
    shortLabel: "Google Ads",
    programSlug: "google-ads-mastery",
    icon: "🎯",
    fee: 25000,
    duration: "2 Months",
    certifications: 2,
    tagline: "Run profitable Google Ads campaigns with real ad budgets.",
    intro:
      "Most Google Ads courses teach you the dashboard. This Google Ads course in {city} hands you real ad budgets from Week 1 — so you learn Search, Display, Shopping, YouTube, and Performance Max by managing live campaigns and hitting real ROAS targets.",
    whatYouLearn: [
      "Search campaign structure, keyword match types, and bidding strategies",
      "Display, YouTube, Shopping, and Performance Max campaigns",
      "Conversion tracking with GA4, Google Tag Manager, and enhanced conversions",
      "AI-powered bidding, audience signals, and budget optimisation",
      "Landing-page and ad-copy testing for higher Quality Score and lower CPC",
      "Reporting in Looker Studio and pitching results to clients or managers",
    ],
    tools: ["Google Ads", "Keyword Planner", "Google Analytics 4", "Google Tag Manager", "Looker Studio", "YouTube Studio"],
    roles: [
      { role: "Google Ads Specialist", salary: "₹28,000 – ₹45,000/mo" },
      { role: "PPC / Paid Search Manager", salary: "₹45,000 – ₹75,000/mo" },
      { role: "Freelance Ads Consultant", salary: "₹40,000 – ₹1,50,000/mo" },
    ],
    faqs: [
      { q: "Will I spend real money on ads during the course?", a: "You manage live campaigns on agency and project accounts with real budgets — without risking your own money. That hands-on experience is exactly what hiring managers and clients want to see." },
      { q: "Is this Google Ads course in {city} available online?", a: "Yes. You can attend live offline classes in {city} or join the same live online batch from anywhere. Both get identical content, recordings, and real-campaign access." },
      { q: "Do I get a Google certification?", a: "Yes — you prepare for and earn official Google Ads certifications (Search and more) as part of the course, plus your Digital Magician completion certificate." },
    ],
  },
  {
    key: "meta-ads",
    slug: "meta-ads-course",
    name: "Meta Ads Course",
    shortLabel: "Meta Ads",
    programSlug: "meta-ads-mastery",
    icon: "📱",
    fee: 25000,
    duration: "2 Months",
    certifications: 3,
    tagline: "Master Facebook & Instagram ads that actually convert.",
    intro:
      "Facebook and Instagram ads drive sales for businesses everywhere — if you know how to run them. This Meta Ads course in {city} teaches you the full Meta Ads Manager workflow, creative testing, the Pixel and Conversions API, and AI-powered scaling on live campaigns.",
    whatYouLearn: [
      "Meta Ads Manager: campaign, ad set, and ad structure that scales",
      "Audience research, custom and lookalike audiences, and retargeting",
      "Meta Pixel, Conversions API, and accurate event tracking",
      "Creative strategy: hooks, UGC, and AI video/image for thumb-stopping ads",
      "Budget scaling, A/B testing, and reading the metrics that matter",
      "Lead-gen and e-commerce funnels that turn clicks into customers",
    ],
    tools: ["Meta Ads Manager", "Meta Business Suite", "Events Manager", "Meta Pixel Helper", "Canva", "CapCut AI"],
    roles: [
      { role: "Meta Ads Specialist", salary: "₹22,000 – ₹40,000/mo" },
      { role: "Social / Paid Media Manager", salary: "₹40,000 – ₹70,000/mo" },
      { role: "Freelance Meta Ads Buyer", salary: "₹35,000 – ₹1,20,000/mo" },
    ],
    faqs: [
      { q: "I only know boosting posts. Is this course too advanced for me?", a: "Not at all. We start from how Meta Ads Manager actually works and take you to advanced scaling. Boosting posts is exactly the habit we replace with real campaign skills." },
      { q: "Will I learn ad creative and video, or just the dashboard?", a: "Both. Modern Meta ads win on creative, so you also learn AI-powered video and image creation, UGC scripting, and hook writing — not just targeting and budgets." },
      { q: "Can I take the Meta Ads course online from outside {city}?", a: "Yes. The live online batch covers the same curriculum and real-campaign work as the offline {city} classes, with full recordings for replay." },
    ],
  },
  {
    key: "performance-marketing",
    slug: "performance-marketing-course",
    name: "Performance Marketing Course",
    shortLabel: "Performance Marketing",
    programSlug: "performance-marketing",
    icon: "📈",
    fee: 25000,
    duration: "2 Months",
    certifications: 4,
    tagline: "Become the marketer companies pay the most for.",
    intro:
      "Performance marketers own revenue — and they are the highest-paid hires in digital marketing. This performance marketing course in {city} combines Google Ads, Meta Ads, analytics, and conversion optimisation so you can run full paid-acquisition funnels and prove ROI.",
    whatYouLearn: [
      "Full-funnel paid acquisition across Google and Meta",
      "Conversion tracking, attribution, and analytics with GA4 + GTM",
      "Landing-page and CRO testing to lower CAC and lift ROAS",
      "Budget allocation, scaling, and forecasting across channels",
      "Marketing automation and reporting dashboards",
      "Client and stakeholder reporting that wins trust and budget",
    ],
    tools: ["Google Ads", "Meta Ads Manager", "Google Analytics 4", "Google Tag Manager", "Looker Studio", "Zapier"],
    roles: [
      { role: "Performance Marketer", salary: "₹30,000 – ₹55,000/mo" },
      { role: "Performance Marketing Manager", salary: "₹55,000 – ₹1,00,000/mo" },
      { role: "Growth / Paid Media Lead", salary: "₹1,00,000 – ₹2,00,000/mo" },
    ],
    faqs: [
      { q: "What's the difference between this and a Google Ads or Meta Ads course?", a: "Performance marketing covers both platforms plus analytics, attribution, and conversion optimisation — the complete revenue-ownership skill set. The single-platform courses go deep on one channel; this one makes you a full-funnel marketer." },
      { q: "Is performance marketing a good career in {city} and Delhi NCR?", a: "It's one of the best-paid roles in the region. {city}'s proximity to Gurugram and Delhi NCR means strong demand — mid-level performance marketers there earn ₹55,000–₹1,00,000/month with a real campaign portfolio." },
      { q: "Do I need prior marketing experience?", a: "No. We start from fundamentals and build to advanced full-funnel strategy. Most students join with no paid-ads background and graduate running real campaigns." },
    ],
  },
  {
    key: "website-development",
    slug: "website-development-course",
    name: "Website Development Course",
    shortLabel: "Web Development",
    programSlug: "website-development",
    icon: "💻",
    fee: 20000,
    duration: "2 Months",
    certifications: 2,
    tagline: "Build fast, conversion-ready websites — with and without code.",
    intro:
      "Every business needs a website that loads fast and converts. This website development course in {city} teaches you to build professional, SEO-ready sites using WordPress, modern page builders, and AI tools — so you can take on clients or build for the brands you market.",
    whatYouLearn: [
      "WordPress, Elementor, and modern AI page builders (Framer AI)",
      "Responsive, conversion-focused design and UX fundamentals",
      "On-page SEO, site speed, and Core Web Vitals optimisation",
      "Landing pages and funnels that turn visitors into leads",
      "Domains, hosting, security, and site maintenance",
      "Client handover, pricing, and delivering websites as a freelancer",
    ],
    tools: ["WordPress", "Elementor", "Framer AI", "RankMath", "PageSpeed Insights", "Canva"],
    roles: [
      { role: "Web Developer / WordPress Developer", salary: "₹20,000 – ₹40,000/mo" },
      { role: "Freelance Website Builder", salary: "₹15,000 – ₹80,000/mo (per project)" },
      { role: "Web + Marketing Generalist", salary: "₹30,000 – ₹60,000/mo" },
    ],
    faqs: [
      { q: "Do I need to know how to code?", a: "No. This course focuses on no-code and low-code tools — WordPress, page builders, and AI — so you can build professional websites without writing code. It's ideal for marketers and freelancers." },
      { q: "Can I earn from freelancing after the website development course?", a: "Yes. Building websites is one of the fastest ways to start earning as a freelancer in {city}. We cover pricing, client handover, and how to land your first projects." },
      { q: "Is the website development course online or offline in {city}?", a: "Both. Attend live offline classes in {city} or the live online batch from anywhere — same curriculum, same projects, with recordings for replay." },
    ],
  },
];

export const getServiceCourse = (key: string): ServiceCourse | undefined =>
  serviceCourses.find((s) => s.key === key);

export const getServiceCourseBySlug = (slug: string): ServiceCourse | undefined =>
  serviceCourses.find((s) => s.slug === slug);
