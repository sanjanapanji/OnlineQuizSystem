"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://online-quiz-backend-mp09.onrender.com";
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Registration response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration error data:', errorData);
        throw new Error(errorData.detail || 'Registration failed');
      }

      console.log('Registration successful, setting success state');
      setSuccess(true);
      setTimeout(() => {
        console.log('Redirecting to /login...');
        router.push('/login');
      }, 2000);
    } catch (err) {
      console.error('Registration caught error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background elements */}
      <div className={styles.gradientTop}></div>
      <div className={styles.gradientBottom}></div>

      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>QuizMaster</Link>
        <div className={styles.navLinks}>
          <Link href="/login" className={styles.outlineBtn}>Sign In</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.authWrapper}>
          <div className={styles.authCard}>
            <div className={styles.cardHeader}>
              <h2>Create an Account</h2>
              <p>Join QuizMaster and start learning today.</p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && (
              <div className={styles.successMessage}>
                Registration successful! Redirecting to login...
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="full_name">Full Name</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>

            <div className={styles.cardFooter}>
              <p>Already have an account? <Link href="/login">Sign in here</Link></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
