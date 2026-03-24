from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth

app = FastAPI(title="Online Quiz System API")

# Configure CORS for local development and Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Backend is running!"}
