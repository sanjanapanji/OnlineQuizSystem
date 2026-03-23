---
description: How to set up, develop, and deploy the FastAPI backend on Render
---

# Backend Skill (FastAPI on Render)

## Overview
The backend is a **Python FastAPI** application deployed to **Render**.

## Local Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Folder Structure
```
backend/
├── app/
│   ├── main.py            # FastAPI app entry point
│   ├── config.py          # Settings & env vars
│   ├── models/            # SQLAlchemy / Pydantic models
│   ├── routes/            # API route handlers
│   ├── services/          # Business logic
│   └── utils/             # Helpers
├── requirements.txt
├── .env                   # Local env vars (not committed)
└── render.yaml            # Render deployment config
```

## Key API Groups (planned)
- `/api/auth` — register, login, token refresh
- `/api/quizzes` — CRUD for quizzes
- `/api/questions` — CRUD for questions within a quiz
- `/api/attempts` — start/submit quiz attempts
- `/api/results` — view scores and history

## Deploying to Render
1. Push code to GitHub
2. Create a new **Web Service** on Render
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables (`DATABASE_URL`, `SECRET_KEY`, etc.)

## Notes
- Use `python-dotenv` for local env management
- Use `asyncpg` or `psycopg2` for Neon Postgres connectivity
