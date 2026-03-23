---
description: How to set up, develop, and deploy the Next.js frontend on Vercel
---

# Frontend Skill (Next.js on Vercel)

## Overview
The frontend is a **Next.js** application deployed to **Vercel**. We use **plain HTML/CSS** wherever possible (minimal use of component libraries).

## Local Setup
```bash
cd frontend
npm install
npm run dev
```

## Folder Structure
```
frontend/
├── pages/               # Next.js pages (file-based routing)
│   ├── index.js         # Landing / home page
│   ├── login.js         # Login page
│   ├── register.js      # Registration page
│   ├── dashboard.js     # User dashboard
│   └── quiz/
│       ├── [id].js      # Take a quiz
│       └── results.js   # Quiz results
├── styles/              # CSS files (plain CSS, no Tailwind)
│   ├── globals.css
│   └── *.module.css     # Per-component CSS modules
├── components/          # Reusable UI components (HTML/CSS focused)
├── lib/                 # API client helpers
├── public/              # Static assets
├── next.config.js
└── package.json
```

## Design Principles
- **HTML/CSS first** — avoid heavy JS frameworks for styling
- Use CSS Modules for scoped styles
- Keep components simple and semantic
- Responsive design with media queries

## Deploying to Vercel
1. Push code to GitHub
2. Import the project in Vercel dashboard
3. Set root directory to `frontend/`
4. Add environment variables (`NEXT_PUBLIC_API_URL`, etc.)
5. Deploy

## Notes
- Use `fetch` or a lightweight HTTP client to call the backend API
- Set `NEXT_PUBLIC_API_URL` to the Render backend URL
