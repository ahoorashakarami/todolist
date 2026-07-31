import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Welcome Back 👋</h1>

        <p className={styles.subtitle}>
          Sign in to continue managing your tasks.
        </p>

        <form className={styles.form}>

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

          <button type="submit">
            Sign In
          </button>

        </form>

        <p className={styles.login}>
          Don't have an account?
          <Link href={"/signup"}> Sign Up</Link>
        </p>

      </div>
    </div>
  );
}