# Online Quiz System - Project Document

> **Last Updated:** 2026-03-23

## Project Overview

An online quiz system where users can take quizzes, and admins can create/manage them. Built with a modern three-tier architecture.

| Layer      | Technology         | Hosting  |
|------------|--------------------|----------|
| Frontend   | Next.js (HTML/CSS) | Vercel   |
| Backend    | FastAPI (Python)   | Render   |
| Database   | PostgreSQL         | Neon     |

---

## Project Structure

```
online quiz system/
├── db/              # Database schemas, migrations, seed scripts
├── backend/         # FastAPI application
├── frontend/        # Next.js application
└── PROJECT.md       # This file - project tracking document
```

---

## Finalized Steps

### ✅ Step 1 — Project Setup (2026-03-23)
- Created three separate folders: `db/`, `backend/`, `frontend/`
- Established project tracking document (`PROJECT.md`)
- Created skills for each section (database, backend, frontend)

### ✅ Step 2 — Neon Database Connection Verified (2026-03-23)
- API token validated against Neon API
- Created project `online-quiz-system` in `aws-ap-southeast-1` region
- Database `neondb` provisioned with PostgreSQL 17.8
- Connection tested successfully from local machine
- Connection details saved to `db/.env`

| Detail         | Value                                                                    |
|----------------|--------------------------------------------------------------------------|
| Project ID     | `noisy-mouse-84518485`                                                   |
| Region         | `aws-ap-southeast-1`                                                     |
| Database       | `neondb`                                                                 |
| User           | `neondb_owner`                                                           |
| Host           | `ep-twilight-shadow-a111n2ar.ap-southeast-1.aws.neon.tech`               |

### ✅ Step 3 — GitHub Repo & Initial Push (2026-03-23)
- Created GitHub repo [`OnlineQuizSystem`](https://github.com/sanjanapanji/OnlineQuizSystem)
- Added `.gitignore` to protect secrets (`tokens`, `.env`)
- Initialized local git, committed 8 files, pushed to `main` branch

### ✅ Step 4 — Created OnlineQuizSystem Database (2026-03-23)
- Created `OnlineQuizSystem` database via Neon API
- Connection tested: PostgreSQL 17.8, 0 public tables (fresh DB)
- Updated `db/.env` with new database connection string

---

## Upcoming Steps

> Steps will be added here as we finalize each one during the project build.

### ✅ Step 5 — Index Page + Auth Setup (2026-03-24)
- Created `users` table in Neon database for profile storage
- Built FastAPI backend with `/api/auth/register` and `/api/auth/login` paths, password hashing, and JWT tokens
- Created `render.yaml` and deployed backend to Render web service URL: `https://online-quiz-backend-mp09.onrender.com`
- Built Next.js frontend with landing page (Sign In / Sign Up buttons) using premium dark mode HTML/CSS
- Deployed frontend to Vercel URL: `https://frontend-Ykappa-ten-28.vercel.app` (now `quizmaster-premium-frontend.vercel.app`)
- Pushed architecture to GitHub repository `main` branch

### ✅ Step 6 — Registration Page (2026-03-24)
- Created `register` page with beautiful glassmorphism dark-mode UI
- Implemented client-side logic connected to the FastAPI backend API
- Handled API errors and redirections seamlessly
- Added corresponding CSS modules for responsive inputs and layout
- Deployed to Vercel successfully

### ✅ Step 7 — UI Customization (2026-03-24)
- Updated background gradients to blue and red for a more vibrant look
- Synchronized logo and title gradients with the new color palette
- Verified consistency across landing and registration pages
- Applied a specific red-to-blue linear gradient (`to right`) to the Sign-Up and Login page backgrounds for horizontal flow
- Restored the Front Page (Landing Page) background color to black with premium red/blue gradients
### ✅ Step 9 — Dashboard & Signup Fix (2026-03-25)
- Fixed the signup flow by adding diagnostic logging and ensuring correct API orientation
- Implemented the **Dashboard Page** with a premium dark theme and red/blue accents
- Updated the backend to include the `user` object in the login response for frontend state
- Successfully connected to the new Neon database pooler link
- Redeployed both Frontend (Vercel) and Backend (Render)



