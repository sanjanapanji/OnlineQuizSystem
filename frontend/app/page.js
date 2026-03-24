import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Background gradients for premium feel */}
      <div className={styles.gradientTop}></div>
      <div className={styles.gradientBottom}></div>

      <nav className={styles.navbar}>
        <div className={styles.logo}>QuizMaster</div>
        <div className={styles.navLinks}>
          <Link href="/login" className={styles.outlineBtn}>Sign In</Link>
          <Link href="/register" className={styles.primaryBtn}>Sign Up</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.heroSection}>
          <h1 className={styles.title}>
            Master Any Topic,<br/><span>Anywhere.</span>
          </h1>
          <p className={styles.subtitle}>
            Create, take, and track quizzes with our premium online quiz system. Experience learning like never before.
          </p>
          <div className={styles.ctaGroup}>
            <Link href="/register" className={styles.primaryBtnLarge}>
              Get Started for Free
            </Link>
            <Link href="/login" className={styles.secondaryBtnLarge}>
              Sign In to Your Account
            </Link>
          </div>
        </div>

        <div className={styles.featuresCards}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>✏️</div>
            <h3>Create Quizzes</h3>
            <p>Build custom quizzes with rich text options and multiple question types.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📊</div>
            <h3>Track Progress</h3>
            <p>Get detailed analytics and performance tracking for every attempt.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>⚡</div>
            <h3>Instant Feedback</h3>
            <p>Real-time results and immediate feedback to accelerate your learning.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} QuizMaster System. All rights reserved.</p>
      </footer>
    </div>
  );
}
