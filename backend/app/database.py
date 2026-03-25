import psycopg2
from psycopg2.extras import RealDictCursor
from .config import DATABASE_URL

def get_db_connection():
    try:
        print(f"Attempting to connect to database...")
        conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor, connect_timeout=10)
        print("Database connection successful!")
        yield conn
    except Exception as e:
        print(f"Database connection FAILED: {e}")
        raise e
    finally:
        if 'conn' in locals() and conn:
            conn.close()
            print("Database connection closed.")
