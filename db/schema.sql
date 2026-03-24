CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name     VARCHAR(100) NOT NULL,
    role          VARCHAR(20)  DEFAULT 'student',   -- 'student' | 'admin'
    created_at    TIMESTAMPTZ  DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  DEFAULT NOW()
);
