import os
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

# Configuration
DATABASE_URL = "postgresql://neondb_owner:npg_yQjoG5kgivx7@ep-twilight-shadow-a111n2ar-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
SECRET_KEY = "7c6f2a8b9e1d4c3a5b0f4d2e1a8c7b6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

app = FastAPI(title="Online Quiz System - Stabilized")

# Permissive CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Global CORS Headers for Manual Use
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
}

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    print(f"GLOBAL ERROR: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
        headers=CORS_HEADERS
    )

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
        headers=CORS_HEADERS
    )

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
    return JSONResponse(content={"status": "ok", "version": "1.0.stabilized"}, headers=CORS_HEADERS)

@app.post("/api/auth/register")
def register(user: UserCreate, db = Depends(get_db)):
    print(f"REGISTER ATTEMPT: {user.email}")
    cursor = db.cursor()
    try:
        cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
        if cursor.fetchone():
            print(f"REGISTER FAILED: User exists {user.email}")
            raise HTTPException(status_code=400, detail="User already exists")
        
        # Bcrypt has a 72-byte limit. We truncate here to prevent crashes.
        safe_password = user.password[:72]
        hashed = pwd_context.hash(safe_password)
        cursor.execute(
            "INSERT INTO users (email, password_hash, full_name, role) VALUES (%s, %s, %s, %s) RETURNING id, email, full_name",
            (user.email, hashed, user.full_name, 'student')
        )
        new_user = cursor.fetchone()
        db.commit()
        print(f"REGISTER SUCCESS: {user.email}")
        return JSONResponse(content=jsonable_encoder(new_user), headers=CORS_HEADERS)
    except Exception as e:
        db.rollback()
        print(f"REGISTER ERROR: {e}")
        raise e
    finally:
        cursor.close()

@app.post("/api/auth/login")
def login(user_credentials: UserLogin, db = Depends(get_db)):
    print(f"LOGIN ATTEMPT: {user_credentials.email}")
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (user_credentials.email,))
    user = cursor.fetchone()
    cursor.close()

    if not user:
        print(f"LOGIN FAILED: User not found {user_credentials.email}")
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    # Match the 72-byte truncation from registration
    safe_password = user_credentials.password[:72]
    if not pwd_context.verify(safe_password, user['password_hash']):
        print(f"LOGIN FAILED: Multi-factor or password mismatch {user_credentials.email}")
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    token_data = {"sub": user["email"], "id": user["id"]}
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    token_data.update({"exp": expire})
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    
    print(f"LOGIN SUCCESS: {user_credentials.email}")
    return JSONResponse(content={
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "full_name": user["full_name"]
        }
    }, headers=CORS_HEADERS)
