import psycopg2
import os
from dotenv import load_dotenv

load_dotenv("backend/.env")
url = os.getenv("DATABASE_URL")
if not url:
    print("DATABASE_URL not found in backend/.env. Trying db/.env...")
    load_dotenv("db/.env", override=True)
    url = os.getenv("DATABASE_URL")
print(f"Testing connection to: {url.split('@')[1] if '@' in url else 'unknown'}")

try:
    conn = psycopg2.connect(url, connect_timeout=10)
    print("Connection successful!")
    conn.close()
except Exception as e:
    print(f"Connection failed: {e}")
