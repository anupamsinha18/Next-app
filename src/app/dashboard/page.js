"use client";

import { useState } from 'react';
import { auth } from '../firebase.js';
import { updatePassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function Dashboard() {
  const [newPassword, setNewPassword] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [activeSection, setActiveSection] = useState('main');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const userEmail = auth.currentUser?.email || 'User';

  const changePasswordHandler = async (event) => {
    event.preventDefault();
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        alert('Password changed successfully. Please log in again.');
        auth.signOut();
        router.push('/login');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password. Please try again.');
    }
  };

  const logoutHandler = () => {
    auth.signOut();
    router.push('/');
  };

  return (
  <div className={styles.styles}>
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div>Dashboard</div>
        <div className={styles.menuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </div>
        <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
          <a href="#" onClick={() => setActiveSection('profile')}>Profile</a>
          <a href="#" onClick={() => setActiveSection('main')}>Main Page</a>
          <a href="#" onClick={() => setActiveSection('about')}>About</a>
          
          {showOptions && (
            <div className={styles.profileOptions}>
              <a href="#" onClick={changePasswordHandler}>Change Password</a>
              <a href="#" onClick={logoutHandler}>Logout</a>
            </div>
          )}
        </div>
      </div>
      <div className={styles.page}>
      {activeSection === 'main' && <h1>Main Page Content</h1>}
        {activeSection === 'about' && <h1>About Page Content</h1>}
        
        {activeSection === 'profile' && (
          <form onSubmit={changePasswordHandler} className={styles.form}>
            <h1>Change Password</h1>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
              className={styles.inputField}
            />
         
            <button type="submit" className={styles.submitButton}>Change Password</button>
          <button className={styles.bbutton} onClick={logoutHandler}>logout</button>
          </form>
        )}
        </div>
     
    </div>
    </div>
  );
}
