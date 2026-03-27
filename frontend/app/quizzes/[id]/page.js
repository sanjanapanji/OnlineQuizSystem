"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { quizzes } from '../../data/quizzes';
import styles from './page.module.css';

export default function QuizTakingPage({ params }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [quiz, setQuiz] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
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

  const calculateScore = () => {
    let newScore = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) {
        newScore += 1;
      }
    });
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
                  setHasStarted(false);
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

  if (!hasStarted) {
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
          <div className={styles.startCard}>
            <div className={styles.resultIcon}>{quiz.icon}</div>
            <h1 className={styles.resultTitle}>{quiz.title}</h1>
            <p className={styles.resultText}>{quiz.description}</p>
            
            <div className={styles.quizMetaDetails}>
              <div className={styles.metaItem}>
                <strong>Questions:</strong> {quiz.questions.length}
              </div>
              <div className={styles.metaItem}>
                <strong>Format:</strong> Multiple Choice
              </div>
            </div>

            <button 
              className={styles.dashboardBtnLarge} 
              onClick={() => setHasStarted(true)}
              style={{ marginTop: '2rem' }}
            >
              Start Quiz Now
            </button>
            
            <div style={{ marginTop: '1rem' }}>
              <button 
                className={styles.retryBtn} 
                onClick={() => router.push('/quizzes')}
              >
                ← Back to Quizzes
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
                <div className={styles.radioCircle}>
                  {answers[currentIdx] === idx && <div className={styles.radioInner}></div>}
                </div>
                <div className={styles.optionLabel}>{option}</div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.navigationControls} style={{ justifyContent: 'center' }}>
          {currentIdx < quiz.questions.length - 1 ? (
            <button 
              className={`${styles.navBtn} ${styles.primaryNavBtn}`}
              disabled={!hasAnsweredCurrent}
              onClick={() => setCurrentIdx(currentIdx + 1)}
            >
              Next
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
