import os
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

# Configuration
DATABASE_URL = "postgresql://neondb_owner:npg_yQjoG5kgivx7@ep-twilight-shadow-a111n2ar-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
SECRET_KEY = "7c6f2a8b9e1d4c3a5b0f4d2e1a8c7b6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI(title="Online Quiz System - Stabilized")

# Middleware for request logging
@app.middleware("http")
async def log_requests(request, call_next):
    print(f"Incoming request: {request.method} {request.url}")
    try:
        response = await call_next(request)
        print(f"Response status: {response.status_code}")
        return response
    except Exception as e:
        print(f"ERROR: {e}")
        from fastapi.responses import JSONResponse
        return JSONResponse(status_code=500, content={"detail": str(e)})

# Permissive CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Models
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Database Dependency
def get_db():
    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        yield conn
    finally:
        if conn:
            conn.close()

# Routes
@app.get("/")
def health():
    return {"status": "ok", "version": "1.0.stabilized"}

@app.post("/api/auth/register")
def register(user: UserCreate, db = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
    if cursor.fetchone():
        cursor.close()
        raise HTTPException(status_code=400, detail="User already exists")
    
    hashed = pwd_context.hash(user.password)
    cursor.execute(
        "INSERT INTO users (email, password_hash, full_name, role) VALUES (%s, %s, %s, %s) RETURNING id, email, full_name",
        (user.email, hashed, user.full_name, 'student')
    )
    new_user = cursor.fetchone()
    db.commit()
    cursor.close()
    return new_user

@app.post("/api/auth/login")
def login(user_credentials: UserLogin, db = Depends(get_db)):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (user_credentials.email,))
    user = cursor.fetchone()
    cursor.close()

    if not user or not pwd_context.verify(user_credentials.password, user['password_hash']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    token_data = {"sub": user["email"], "id": user["id"]}
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data.update({"exp": expire})
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "full_name": user["full_name"]
        }
    }
