"use client";
import React, { useState } from 'react'
import Link from "next/link";
import AuthModal from "@/components/authmodal/index"

export default function SignIn({ styles }) {
    // states
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    // auth

    const handleLogin = async (event) => {
        event.preventDefault()

        const userData = {
            name,
            password
        };

        const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (res.status === 200) {
            setModalStatus("success");
            setModalTitle("Signed In");
            setModalMessage(data.message);
            setIsModalOpen(true);
        } else {
            setModalStatus("error");
            setModalTitle("Sign In Failed");
            setModalMessage(data.message);
            setIsModalOpen(true);
        }
    }

    // Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("success");
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");


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
                    <h1>Welcome Back!</h1>

                    <p className={styles.subtitle}>
                        Sign in to continue managing your tasks.
                    </p>

                    <form className={styles.form} onSubmit={handleLogin}>

                        <div className={styles.inputGroup}>
                            <label>Name</label>
                            <input
                                value={name} onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter your Name"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Password</label>
                            <input
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Enter your Password"
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
        </>
    )
}
