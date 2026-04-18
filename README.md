# Digital Magician Website

**Tech Stack:** Next.js 15 + Tailwind CSS + TypeScript + Vercel

## Quick Start (3 commands)

Open Terminal on your Mac, navigate to this folder, then:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open your browser at:
# http://localhost:3000
```

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial Digital Magician website"
git remote add origin https://github.com/YOUR_USERNAME/digital-magician.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import your GitHub repo → Deploy
```

## Folder Structure

```
src/
├── app/                    # All pages (Next.js App Router)
│   ├── page.tsx            # Homepage
│   ├── programs/           # Programs pages
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── ...
├── components/
│   ├── layout/             # Navbar, Footer, WhatsApp button
│   └── home/               # Homepage section components
└── lib/
    └── data/               # All content data (programs, testimonials)
```

## Updating Content

- **Programs:** Edit `src/lib/data/programs.ts`
- **Testimonials / Batch Dates:** Edit `src/lib/data/testimonials.ts`
- **Nav Links:** Edit `src/components/layout/Navbar.tsx`
- **Footer Links:** Edit `src/components/layout/Footer.tsx`

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Midnight Indigo | #0F0C29 | Primary background |
| Deep Indigo | #1B1464 | Secondary sections |
| Amber Gold | #F59E0B | CTAs, accents, highlights |
| Carbon | #1A1A2A | Body text on light |
| Steel Grey | #6B7280 | Captions, muted text |
