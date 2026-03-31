"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function RankingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Rankings state
  const [userStats, setUserStats] = useState({ totalQuizzes: 0, averageScore: 0 });
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    // Basic auth check
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);

    // 1. Load Local Stats (Keep for the UI overview)
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    let avg = 0;
    if (history.length > 0) {
      const totalPoints = history.reduce((sum, item) => sum + item.score, 0);
      const totalPossible = history.reduce((sum, item) => sum + item.total, 0);
      avg = Math.round((totalPoints / totalPossible) * 100);
    }
    setUserStats({ totalQuizzes: history.length, averageScore: avg });

    // 2. Fetch Global Rankings from Neon DB
    const fetchRankings = async () => {
      try {
        const apiUrl = "https://online-quiz-backend-mp09.onrender.com";
        const response = await fetch(`${apiUrl}/api/rankings`);
        if (response.ok) {
          const data = await response.json();
          // Add "isUser" flag to the current user's entry if found
          const processed = data.map(ranker => ({
            ...ranker,
            isUser: ranker.name === userData.full_name
          }));
          setRankings(processed);
        } else {
          throw new Error("Failed to fetch rankings");
        }
      } catch (err) {
        console.error("Rankings fetch error:", err);
        // Fallback to minimal local ranking if API fails
        setRankings([{ 
          name: `${userData.full_name} (Local)`, 
          topic: history[0]?.title.split(' ')[0] || 'Unknown', 
          score: `${history[0]?.score || 0}/${history[0]?.total || 10}`, 
          date: new Date().toISOString().split('T')[0],
          isUser: true 
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [router]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Loading rankings...</p>
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
          <h1>Global Leaderboard</h1>
          <p>See how the community is performing across all subjects.</p>
        </header>

        <section className={styles.topThree}>
          {rankings.slice(0, 3).map((ranker, index) => (
            <div key={index} className={`${styles.rankCard} ${styles[`rank${index + 1}`]}`}>
              <div className={styles.crown}>{index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}</div>
              <div className={styles.rankAvatar}>{ranker.name.charAt(0)}</div>
              <h3>{ranker.name}</h3>
              <div className={styles.rankScore}>{ranker.score}</div>
              <div className={styles.rankTopic}>{ranker.topic}</div>
            </div>
          ))}
        </section>

        <section className={styles.fullRankings}>
          <div className={styles.tableCard}>
            <table className={styles.rankTable}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Topic</th>
                  <th>Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((ranker, index) => (
                  <tr key={index} className={ranker.isUser ? styles.userRow : ''}>
                    <td>#{index + 1}</td>
                    <td className={styles.playerName}>{ranker.name}</td>
                    <td>{ranker.topic}</td>
                    <td className={styles.playerScore}>{ranker.score}</td>
                    <td>{ranker.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
