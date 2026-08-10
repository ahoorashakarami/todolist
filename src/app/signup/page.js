"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import AuthModal from "@/components/authmodal";

export default function Page() {
  // States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Sign Up Functions

  const signUp = async (e) => {
    e.preventDefault();

    if (password == confirmPassword) {
      const userData = {
        name: fullName,
        email,
        password
      };

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
      });

      const data = await res.json();

      if (res.status === 201) {
        setModalStatus("success");
        setModalTitle("Account Created");
        setModalMessage(data.message);
        setIsModalOpen(true);
      } else {
        setModalStatus("error");
        setModalTitle("Sign Up Failed");
        setModalMessage(data.message);
        setIsModalOpen(true);
      }
    }
  }
  return (
    <>
      {/* modal */}
      {isModalOpen && (
        <>
          <AuthModal
            isOpen={isModalOpen}
            status={modalStatus}
            title={modalTitle}
            message={modalMessage}
          />
        </>
      )}
      {/* modal end */}

      <div className={styles.container}>
        <div className={styles.card}>
          <h1>Create your account</h1>

          <p className={styles.subtitle}>
            Join us and manage your tasks smarter.
          </p>

          <form className={styles.form} onSubmit={e => signUp(e)}>

            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit">
              Create Account
            </button>

          </form>

          <p className={styles.login}>
            Already have an account?
            <Link href={"/signin"}> Sign In</Link>
          </p>

        </div>
      </div>
    </>
  );
}