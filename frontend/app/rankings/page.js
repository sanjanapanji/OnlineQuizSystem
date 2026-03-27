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

    // Load Local Stats
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    let avg = 0;
    if (history.length > 0) {
      const totalPoints = history.reduce((sum, item) => sum + item.score, 0);
      const totalPossible = history.reduce((sum, item) => sum + item.total, 0);
      avg = Math.round((totalPoints / totalPossible) * 100);
    }
    setUserStats({ totalQuizzes: history.length, averageScore: avg });

    // Mock Global Rankings (Plus user if they have scores)
    const mockGlobal = [
      { name: 'Alex Johnson', topic: 'Python', score: '10/10', date: '2026-03-25' },
      { name: 'Sarah Chen', topic: 'Java', score: '9/10', date: '2026-03-26' },
      { name: 'Michael Ross', topic: 'Python', score: '9/10', date: '2026-03-24' },
      { name: 'Emma Wilson', topic: 'Java', score: '8/10', date: '2026-03-27' },
    ];

    // Add current user if they have taken a quiz
    if (history.length > 0) {
      const latest = history[0];
      mockGlobal.push({
        name: `${userData.full_name} (You)`,
        topic: latest.title.split(' ')[0],
        score: `${latest.score}/${latest.total}`,
        date: new Date(latest.date).toISOString().split('T')[0],
        isUser: true
      });
    }

    // Sort by score (simplified)
    const sorted = mockGlobal.sort((a, b) => {
      const scoreA = parseInt(a.score.split('/')[0]);
      const scoreB = parseInt(b.score.split('/')[0]);
      return scoreB - scoreA;
    });

    setRankings(sorted);
    setLoading(false);
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
