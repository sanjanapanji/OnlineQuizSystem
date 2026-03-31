# 💻 QuizMaster: Deep Dive Code Explanation

This document provides a technical walkthrough of the **QuizMaster** codebase, explaining the logic and design decisions for each major component.

---

## 1. Backend: FastAPI & Security (`backend/app/main.py`)

### A. The "Zero-Failure" Authentication Logic
Instead of relying on unstable libraries, we use **Native Bcrypt** for maximum reliability.
```python
import bcrypt

def hash_password(password: str):
    # Generates a salt and hashes the password
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password, hashed_password):
    # Compares plain text against the hash
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
```
- **Why?**: This resolves the "password cannot be longer than 72 bytes" initialization crash often found in the `passlib` library.

### B. JWT Session Management
We use **PyJWT** to create stateless, secure user sessions.
```python
def create_access_token(data: dict):
    # Creates a JWT token with an expiration time
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
```
- **Login Flow**: When a user logs in, the backend verifies the hash, generates a JWT, and sends it back to the frontend.

### C. Neon PostgreSQL Connection
The backend uses a **Serverless Connection String** to connect to Neon.
- **Pooling**: We use a hardcoded pooler URL in production to ensure the database starts up instantly from a cold state.

---

## 2. Frontend: Next.js 16 & React Hooks

### A. Dynamic Quiz Taker (`app/quizzes/[id]/page.js`)
Next.js 15+ changed how route parameters are handled. They are now **Promises**.
```javascript
export default function QuizTakingPage({ params: paramsPromise }) {
  // Use React.use() to unwrap the promise for id
  const params = use(paramsPromise); 
  
  // Logic to find quiz from static data
  const foundQuiz = quizzes.find(q => q.id === params.id);
}
```
- **State Management**:
  - `answers`: An object storing `{ questionIndex: selectedOptionIndex }`.
  - `currentIdx`: Tracks which question the user is viewing.
  - `showResults`: Toggles between the quiz view and the final score screen.

### B. Result Persistence & Stats (`app/quizzes/[id]/page.js`)
When a quiz is submitted, the score is saved to the browser's local storage.
```javascript
const calculateScore = () => {
    // ... compute score ...
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.push({
      title: quiz.title,
      score: newScore,
      total: 10,
      date: new Date().toISOString()
    });
    localStorage.setItem('quizHistory', JSON.stringify(history));
};
```

### C. Dashboard Stats Logic (`app/dashboard/page.js`)
The dashboard parses the `quizHistory` from local storage on mount.
- **Average Score**: Computed by summing all correct answers and dividing by the total number of questions answered across all attempts.
- **Rank Calculation**: A simple logic tree:
  - 10+ Quizzes & 80%+ Avg = **Master**
  - 5+ Quizzes & 60%+ Avg = **Pro**
  - <2 Quizzes = **Novice**

---

## 3. Data Structure: Static Quiz Bank (`app/data/quizzes.js`)

Quizzes are stored in a predictable JSON format to ensure high speed and zero database latency during the test itself.
```javascript
{
    id: "python-basics",
    title: "Python Basics",
    questions: [
        {
          id: 1,
          question: '...',
          options: ['A', 'B', 'C', 'D'],
          answer: 2 // Index of the correct option
        }
    ]
}
```

---

## 4. Design System: CSS Modules & Glassmorphism

### A. Responsive Grid
Used in `quizzes/page.module.css` to create the quiz selection cards.
```css
.quizGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

### B. Glassmorphism for "Focus Mode"
Used in the quiz taker to make the UI feel modern and deep.
```css
.questionCard {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
}
```
- **Why?**: This adds a layered, "Premium" feel that is standard in modern high-end applications.
