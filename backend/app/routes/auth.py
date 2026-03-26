from fastapi import APIRouter, Depends, HTTPException, status
from psycopg2.extensions import connection
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from ..database import get_db_connection
from ..models.user import UserCreate, UserLogin, UserResponse, Token
from ..config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: connection = Depends(get_db_connection)):
    cursor = db.cursor()
    
    # Check if user exists
    cursor.execute("SELECT id FROM users WHERE email = %s", (user.email,))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="Email already registered")
        
    # Hash password and insert
    hashed_password = pwd_context.hash(user.password)
    try:
        print(f"Creating user profile for: {user.email}")
        cursor.execute(
            """
            INSERT INTO users (email, password_hash, full_name, role)
            VALUES (%s, %s, %s, %s)
            RETURNING id, email, full_name, role, created_at;
            """,
            (user.email, hashed_password, user.full_name, 'student')
        )
        new_user = cursor.fetchone()
        db.commit()
        print(f"User profile created successfully for: {user.email}")
        return new_user
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error occurred")
    finally:
        cursor.close()

@router.post("/login", response_model=Token)
def login(user_credentials: UserLogin, db: connection = Depends(get_db_connection)):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (user_credentials.email,))
    user = cursor.fetchone()
    cursor.close()

    if not user or not pwd_context.verify(user_credentials.password, user['password_hash']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = create_access_token(data={"sub": user["email"], "id": user["id"], "role": user["role"]})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user["role"]
        }
    }
