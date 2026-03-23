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

---

## Upcoming Steps

> Steps will be added here as we finalize each one during the project build.
