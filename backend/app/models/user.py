from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserProfile(BaseModel):
    id: int
    email: str
    full_name: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserProfile
