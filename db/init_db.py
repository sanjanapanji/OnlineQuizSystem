import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

def init_db():
    conn = psycopg2.connect(DATABASE_URL)
    conn.autocommit = True
    cur = conn.cursor()
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    schema_path = os.path.join(base_dir, "schema.sql")
    with open(schema_path, "r") as f:
        schema = f.read()
    
    cur.execute(schema)
    print("Schema executed successfully.")
    
    cur.close()
    conn.close()

if __name__ == "__main__":
    init_db()
