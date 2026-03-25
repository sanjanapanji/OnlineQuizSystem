import psycopg2
import os
from dotenv import load_dotenv

load_dotenv("backend/.env")
url = os.getenv("DATABASE_URL")
if not url:
    load_dotenv("db/.env", override=True)
    url = os.getenv("DATABASE_URL")

print(f"Testing query execution on: {url.split('@')[1] if '@' in url else 'unknown'}")

try:
    conn = psycopg2.connect(url, connect_timeout=10)
    cur = conn.cursor()
    cur.execute("SELECT 1;")
    result = cur.fetchone()
    print(f"Query successful! Result: {result}")
    
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_name = 'users';")
    table_exists = cur.fetchone()
    print(f"Table 'users' exists: {table_exists is not None}")
    
    cur.close()
    conn.close()
except Exception as e:
    print(f"FAILED: {e}")
