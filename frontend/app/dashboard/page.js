"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Stats state
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [rank, setRank] = useState('Novice');
  const [recentScores, setRecentScores] = useState([]);

  useEffect(() => {
    // Basic auth check
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
      
      // Load History Stats
      const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      setTotalQuizzes(history.length);
      
      if (history.length > 0) {
        // Calculate Average (percentage)
        const totalPoints = history.reduce((sum, item) => sum + item.score, 0);
        const totalPossible = history.reduce((sum, item) => sum + item.total, 0);
        const avg = Math.round((totalPoints / totalPossible) * 100);
        setAverageScore(avg);
        
        // Calculate Rank
        if (history.length >= 10 && avg >= 80) setRank('Master');
        else if (history.length >= 5 && avg >= 60) setRank('Pro');
        else if (history.length >= 2) setRank('Intermediate');
        else setRank('Novice');
      }

      setRecentScores(history.slice(-3).reverse());
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <Link href="/" className={styles.logo}>QuizMaster</Link>
        </div>
        <div className={styles.navRight}>
          <span className={styles.userName}>{user?.full_name}</span>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Welcome back, {user?.full_name?.split(' ')[0]}!</h1>
          <p>Ready to test your knowledge today?</p>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Quizzes Taken</h3>
            <div className={styles.statValue}>{totalQuizzes}</div>
          </div>
          <div className={styles.statCard}>
            <h3>Average Score</h3>
            <div className={styles.statValue}>{totalQuizzes > 0 ? `${averageScore}%` : 'N/A'}</div>
          </div>
          <div className={styles.statCard}>
            <h3>Rank</h3>
            <div className={styles.statValue}>{rank}</div>
          </div>
        </section>

        {recentScores.length > 0 && (
          <section className={styles.recentScoresSection}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <div className={styles.recentList}>
              {recentScores.map((scoreObj, idx) => (
                <div key={idx} className={styles.recentItem}>
                  <div className={styles.recentInfo}>
                    <h4>{scoreObj.title}</h4>
                    <span className={styles.recentDate}>
                      {new Date(scoreObj.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.recentScoreTag}>
                    {scoreObj.score} / {scoreObj.total}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={styles.actions}>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>📝</div>
            <h2>Take a Quiz</h2>
            <p>Browse available quizzes and start learning.</p>
            <Link href="/quizzes" className={styles.primaryActionBtn} style={{ display: 'inline-block', textDecoration: 'none' }}>
              Browse Quizzes
            </Link>
          </div>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>🏆</div>
            <h2>Leaderboard</h2>
            <p>See how you compare with other players.</p>
            <button className={styles.secondaryActionBtn}>View Rankings</button>
          </div>
        </section>
      </main>
    </div>
  );
}
