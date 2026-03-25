"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Basic auth check
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
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
            <div className={styles.statValue}>0</div>
          </div>
          <div className={styles.statCard}>
            <h3>Average Score</h3>
            <div className={styles.statValue}>0%</div>
          </div>
          <div className={styles.statCard}>
            <h3>Rank</h3>
            <div className={styles.statValue}>Novice</div>
          </div>
        </section>

        <section className={styles.actions}>
          <div className={styles.actionCard}>
            <div className={styles.actionIcon}>📝</div>
            <h2>Take a Quiz</h2>
            <p>Browse available quizzes and start learning.</p>
            <button className={styles.primaryActionBtn}>Browse Quizzes</button>
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
