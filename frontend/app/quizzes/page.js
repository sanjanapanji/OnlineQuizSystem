"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { quizzes } from '../data/quizzes';
import styles from './page.module.css';

export default function QuizzesPage() {
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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading quizzes...</p>
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
          <Link href="/dashboard" className={styles.dashboardBtn}>Dashboard</Link>
          <span className={styles.userName}>{user?.full_name}</span>
        </div>
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Available Quizzes</h1>
          <p>Choose a topic below to start your test. Each test contains 10 questions.</p>
        </header>

        <section className={styles.quizGrid}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className={styles.quizCard}>
              <div className={styles.quizIcon}>{quiz.icon}</div>
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <div className={styles.quizMeta}>
                <span>10 Questions</span>
                <span>Multiple Choice</span>
              </div>
              <button 
                onClick={() => router.push(`/quizzes/${quiz.id}`)} 
                className={styles.startBtn}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
