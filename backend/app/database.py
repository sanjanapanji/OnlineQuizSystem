import psycopg2
from psycopg2.extras import RealDictCursor
from .config import DATABASE_URL

def get_db_connection():
    conn = None
    try:
        print(f"Attempting to connect to database at {DATABASE_URL.split('@')[1] if '@' in DATABASE_URL else 'unknown'}...")
        # Add connect_timeout and options for statement_timeout
        conn = psycopg2.connect(
            DATABASE_URL, 
            cursor_factory=RealDictCursor, 
            connect_timeout=10,
            options="-c statement_timeout=15000"
        )
        print("Database connection successful!")
        yield conn
    except Exception as e:
        print(f"Database connection ERROR: {e}")
        raise e
    finally:
        if conn:
            conn.close()
            print("Database connection closed.")
