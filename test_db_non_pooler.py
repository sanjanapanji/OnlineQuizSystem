import psycopg2
import os
from dotenv import load_dotenv

url = "postgresql://neondb_owner:npg_yQjoG5kgivx7@ep-twilight-shadow-a111n2ar.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
print(f"Testing non-pooler connection to: {url.split('@')[1] if '@' in url else 'unknown'}")

try:
    conn = psycopg2.connect(url, connect_timeout=10)
    print("Non-pooler connection successful!")
    cur = conn.cursor()
    cur.execute("SELECT 1;")
    print(f"Query successful: {cur.fetchone()}")
    cur.close()
    conn.close()
except Exception as e:
    print(f"Non-pooler connection FAILED: {e}")
