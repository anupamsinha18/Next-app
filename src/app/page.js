"use client";

import { useState } from 'react';
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const moveToLogin = () => {
    router.push('/login');
  };

  return (
    <div className={styles.style}>
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.signup}>
        <label className={styles.label}
        >Sign Up</label>
        <input
          type="email"
          value={email}
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button           className={styles.button}
type="submit">Sign Up</button>
      </form>
      <button onClick={moveToLogin} className={styles.loginButton}>
        Already Registered? Move to Login
      </button>
    </div>
    </div>
  );
}
