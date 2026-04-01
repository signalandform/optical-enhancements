# Optical Auto Enhancements — Next.js Mock

Full Next.js (App Router) build of the vertical mock. Includes Tailwind for styling, custom sections, and ready-to-deploy config for Vercel.

## Getting started

```bash
npm install
npm run dev
```

## Structure

```
optical-auto-next/
├─ app/
│  ├─ components/sections/*  # Hero, Services, Technology, etc.
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ public/
│  └─ images/ (add brand photography here or use remote URLs)
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ next.config.mjs
└─ package.json
```

Fonts are loaded via `next/font` (Playfair Display + Inter). Remote images reference Unsplash placeholders; replace with your own or place assets under `public/images` and update components accordingly.

Deploy to Vercel by connecting the repo and running the default Next.js build command (`npm run build`).
