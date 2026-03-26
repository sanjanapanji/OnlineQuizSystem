"use client";

import Link from 'next/link';
import styles from './page.module.css';

export default function ForgotPassword() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Forgot Password</h1>
        <p>This feature is coming soon. Please contact support if you need immediate assistance.</p>
        <Link href="/login" className={styles.backBtn}>Back to Login</Link>
      </div>
    </div>
  );
}
