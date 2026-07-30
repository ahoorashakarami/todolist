import React from "react";
import styles from "./styles.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create your account</h1>

        <p className={styles.subtitle}>
          Join us and manage your tasks smarter.
        </p>

        <form className={styles.form}>

          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter your name"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Create a password"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className={styles.login}>
          Already have an account?
          <span> Login</span>
        </p>

      </div>
    </div>
  );
}