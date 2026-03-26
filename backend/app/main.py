from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth

app = FastAPI(title="Online Quiz System API")

# Configure CORS for local development and Vercel frontend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://quizmaster-premium-frontend.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running!"}
