-- Create Quiz Attempts Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    quiz_id VARCHAR(100) NOT NULL,
    quiz_title VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster leaderboard queries
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_score ON quiz_attempts (score DESC);
