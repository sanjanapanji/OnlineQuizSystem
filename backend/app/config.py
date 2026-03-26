import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = "postgresql://neondb_owner:npg_yQjoG5kgivx7@ep-twilight-shadow-a111n2ar-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
SECRET_KEY = os.getenv("SECRET_KEY") or "7c6f2a8b9e1d4c3a5b0f4d2e1a8c7b6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
