---
description: How to set up and manage the Neon PostgreSQL database for the Online Quiz System
---

# Database Skill (Neon PostgreSQL)

## Overview
The database layer uses **Neon** (serverless PostgreSQL) to store all quiz system data.

## Connection Setup
1. Create a Neon project at [https://neon.tech](https://neon.tech)
2. Copy the connection string from the Neon dashboard
3. Store it as `DATABASE_URL` in your environment variables

## Folder Structure
```
db/
├── schema.sql        # Full database schema
├── migrations/       # Incremental migration scripts
├── seed.sql          # Sample/test data
└── README.md         # DB-specific docs
```

## Key Tables (planned)
- `users` — user accounts and roles
- `quizzes` — quiz metadata
- `questions` — individual questions per quiz
- `options` — answer options per question
- `attempts` — user quiz attempts
- `responses` — individual answers per attempt

## Running Migrations
```bash
psql $DATABASE_URL -f db/schema.sql
psql $DATABASE_URL -f db/seed.sql
```

## Notes
- Neon auto-scales and suspends on idle — no server management needed
- Use connection pooling for production workloads
