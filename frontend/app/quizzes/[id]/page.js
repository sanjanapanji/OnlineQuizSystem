"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { quizzes } from '../../data/quizzes';
import styles from './page.module.css';

export default function QuizTakingPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [quiz, setQuiz] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Basic auth check
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));

    // Find quiz
    const foundQuiz = quizzes.find(q => q.id === params.id);
    if (!foundQuiz) {
      router.push('/quizzes');
    } else {
      setQuiz(foundQuiz);
      setLoading(false);
    }
  }, [params.id, router]);

  const handleOptionSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentIdx]: optionIndex
    });
  };

  const calculateScore = async () => {
    let newScore = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        newScore += 1;
      }
    });

    const quizData = {
      quizId: quiz.id,
      title: quiz.title,
      score: newScore,
      total: quiz.questions.length,
      date: new Date().toISOString()
    };

    // 1. Save to LocalStorage History (Backup/Legacy)
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.push(quizData);
    localStorage.setItem('quizHistory', JSON.stringify(history));

    // 2. Save to Neon Database via API
    try {
      const token = localStorage.getItem('token');
      const apiUrl = "https://online-quiz-backend-mp09.onrender.com";
      
      await fetch(`${apiUrl}/api/scores?token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quiz_id: quiz.id,
          quiz_title: quiz.title,
          score: newScore,
          total: quiz.questions.length
        }),
      });
      console.log("Score saved to database successfully.");
    } catch (err) {
      console.error("Failed to save score to database:", err);
    }

    setScore(newScore);
    setShowResults(true);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading your quiz...</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.navLeft}>
            <Link href="/" className={styles.logo}>QuizMaster</Link>
          </div>
          <div className={styles.navRight}>
            <span className={styles.userName}>{user?.full_name}</span>
          </div>
        </nav>

        <main className={styles.main}>
          <div className={styles.resultsCard}>
            <div className={styles.resultIcon}>🏆</div>
            <h1 className={styles.resultTitle}>Quiz Completed!</h1>
            <p className={styles.resultText}>You have successfully finished the {quiz.title} quiz.</p>
            <div className={styles.scoreCircle}>
              <span className={styles.scoreText}>{score}</span>
              <span className={styles.scoreTotal}>/ 10</span>
            </div>

            <div className={styles.feedbackMsg}>
              {score >= 8 ? 'Excellent work!' : score >= 5 ? 'Good job, keep studying!' : 'Review the basics and try again!'}
            </div>

            <div className={styles.resultActions}>
              <button
                className={styles.retryBtn}
                onClick={() => {
                  setAnswers({});
                  setCurrentIdx(0);
                  setShowResults(false);
                }}
              >
                Retry Quiz
              </button>
              <button
                className={styles.dashboardBtnLarge}
                onClick={() => router.push('/dashboard')}
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentQ = quiz.questions[currentIdx];
  const hasAnsweredCurrent = answers[currentIdx] !== undefined;

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <span className={styles.quizTitleNav}>{quiz.icon} {quiz.title}</span>
        </div>
        <div className={styles.navRight}>
          <span className={styles.progressText}>Question {currentIdx + 1} of 10</span>
          <button onClick={() => router.push('/quizzes')} className={styles.exitBtn}>Leave Quiz</button>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${((currentIdx + 1) / 10) * 100}%` }}
          ></div>
        </div>

        <div className={styles.questionCard}>
          <h2 className={styles.questionText}>
            {currentQ.question}
          </h2>

          <div className={styles.optionsList}>
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                className={`${styles.optionBtn} ${answers[currentIdx] === idx ? styles.selectedOption : ''}`}
                onClick={() => handleOptionSelect(idx)}
              >
                <div className={styles.optionLetter}>{String.fromCharCode(65 + idx)}</div>
                <div className={styles.optionLabel}>{option}</div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.navigationControls}>
          <button
            className={`${styles.navBtn} ${styles.secondaryNavBtn}`}
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
          >
            ← Previous
          </button>

          {currentIdx < 9 ? (
            <button
              className={`${styles.navBtn} ${styles.primaryNavBtn}`}
              disabled={!hasAnsweredCurrent}
              onClick={() => setCurrentIdx(currentIdx + 1)}
            >
              Next Question →
            </button>
          ) : (
            <button
              className={`${styles.navBtn} ${styles.submitBtn}`}
              disabled={!hasAnsweredCurrent}
              onClick={calculateScore}
            >
              Submit Quiz
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
