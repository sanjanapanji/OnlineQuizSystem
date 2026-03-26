"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Hardcoded for absolute stability in Step 10
      const apiUrl = "https://online-quiz-backend-mp09.onrender.com";
      
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Premium Background Elements */}
      <div className={styles.bgOrb1}></div>
      <div className={styles.bgOrb2}></div>

      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>QuizMaster</Link>
        <div className={styles.navLinks}>
          <Link href="/register" className={styles.outlineBtn}>Get Started</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.authWrapper}>
          <div className={styles.authCard}>
            <div className={styles.cardHeader}>
              <h2>Welcome Back</h2>
              <p>Enter your details to access your dashboard</p>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.labelWrapper}>
                  <label htmlFor="password">Password</label>
                  <Link href="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
                </div>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In to Account'}
              </button>
            </form>

            <div className={styles.cardFooter}>
              <p>Don't have an account?<Link href="/register">Sign up now</Link></p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
