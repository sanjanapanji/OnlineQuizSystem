import psycopg2
import os
from dotenv import load_dotenv

# Try loading from multiple possible locations
load_dotenv("backend/.env")
url = os.getenv("DATABASE_URL")
if not url:
    load_dotenv("db/.env", override=True)
    url = os.getenv("DATABASE_URL")

if not url:
    # Use the one from main.py if .env fails
    url = "postgresql://neondb_owner:npg_yQjoG5kgivx7@ep-twilight-shadow-a111n2ar-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

print(f"Connecting to: {url.split('@')[1] if '@' in url else 'unknown'}")

try:
    conn = psycopg2.connect(url, connect_timeout=10)
    cursor = conn.cursor()
    
    with open("db/scores_schema.sql", "r") as f:
        schema_sql = f.read()
        
    print("Running scores_schema.sql...")
    cursor.execute(schema_sql)
    conn.commit()
    print("Migration successful! quiz_attempts table created.")
    
    cursor.close()
    conn.close()
except Exception as e:
    print(f"Migration failed: {e}")
