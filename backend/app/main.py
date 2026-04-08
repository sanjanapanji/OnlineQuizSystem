import os
import psycopg2
from psycopg2.extras import RealDictCursor
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
import bcrypt
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

# Removed passlib CryptContext to bypass passlib/bcrypt 4.0.0+ initialization bug

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

class UserResetPassword(BaseModel):
    email: EmailStr
    new_password: str = Field(..., min_length=6)

class ScoreCreate(BaseModel):
    quiz_id: str
    quiz_title: str
    score: int
    total: int

# Database Dependency
def get_db():
    conn = None
    try:
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
        yield conn
    finally:
        if conn:
            conn.close()

# Auth Dependency
def get_current_user(token: str, db = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

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
        
        # Bcrypt has a hard 71-byte limit. Passlib is bugged, so we use native bcrypt.
        safe_password_bytes = user.password.encode('utf-8')[:71]
        hashed = bcrypt.hashpw(safe_password_bytes, bcrypt.gensalt()).decode('utf-8')
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
        
    # Match native bcrypt truncation
    safe_password_bytes = user_credentials.password.encode('utf-8')[:71]
    if not bcrypt.checkpw(safe_password_bytes, user['password_hash'].encode('utf-8')):
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

@app.post("/api/auth/reset-password")
def reset_password(data: UserResetPassword, db = Depends(get_db)):
    print(f"RESET ATTEMPT: {data.email}")
    cursor = db.cursor()
    try:
        cursor.execute("SELECT id FROM users WHERE email = %s", (data.email,))
        if not cursor.fetchone():
            print(f"RESET FAILED: User not found {data.email}")
            raise HTTPException(status_code=404, detail="User not found")
        
        safe_password_bytes = data.new_password.encode('utf-8')[:71]
        hashed = bcrypt.hashpw(safe_password_bytes, bcrypt.gensalt()).decode('utf-8')
        
        cursor.execute(
            "UPDATE users SET password_hash = %s WHERE email = %s",
            (hashed, data.email)
        )
        db.commit()
        print(f"RESET SUCCESS: {data.email}")
        return JSONResponse(content={"status": "success", "message": "Password updated successfully"}, headers=CORS_HEADERS)
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"RESET ERROR: {e}")
        raise HTTPException(status_code=500, detail="Failed to reset password")
    finally:
        cursor.close()

@app.post("/api/scores")
def save_score(score: ScoreCreate, token: str, db = Depends(get_db)):
    user_id = get_current_user(token, db)
    cursor = db.cursor()
    try:
        cursor.execute(
            "INSERT INTO quiz_attempts (user_id, quiz_id, quiz_title, score, total) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (user_id, score.quiz_id, score.quiz_title, score.score, score.total)
        )
        new_score = cursor.fetchone()
        db.commit()
        return JSONResponse(content={"status": "success", "id": new_score['id']}, headers=CORS_HEADERS)
    except Exception as e:
        db.rollback()
        print(f"SCORE ERROR: {e}")
        raise HTTPException(status_code=500, detail="Failed to save score")
    finally:
        cursor.close()

@app.get("/api/rankings")
def get_rankings(db = Depends(get_db)):
    cursor = db.cursor()
    try:
        # Get only the HIGHEST score for each UNIQUE player (Across any topic)
        query = """
            SELECT DISTINCT ON (u.email) 
                u.full_name as name, 
                qa.quiz_title as topic, 
                qa.score, 
                qa.total, 
                qa.created_at as date
            FROM quiz_attempts qa
            JOIN users u ON qa.user_id = u.id
            ORDER BY u.email, qa.score DESC, qa.created_at DESC
            LIMIT 50
        """
        cursor.execute(query)
        rows = cursor.fetchall()
        
        # Sort by score globally (since DISTINCT ON requires ordering by the distinct key first)
        rows.sort(key=lambda x: x['score'], reverse=True)
        
        # Format dates for JSON
        for row in rows:
            row['date'] = row['date'].strftime('%Y-%m-%d')
            row['score'] = f"{row['score']}/{row['total']}"
            row['topic'] = row['topic'].split(' ')[0] # e.g. "Python Fundamentals" -> "Python"
            
        return JSONResponse(content=rows, headers=CORS_HEADERS)
    except Exception as e:
        print(f"RANKINGS ERROR: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch rankings")
    finally:
        cursor.close()
