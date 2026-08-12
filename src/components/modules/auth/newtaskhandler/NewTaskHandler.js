"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";

export default function TodoModal({ isOpen, onClose }) {

    const [title, setTitle] = useState("");

    const createTodo = async (e) => {
        e.preventDefault();

        const todo = {
            title
        };

        const res = await fetch("/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });

        if (res.status === 201) {
            setTitle("");
            onClose();
        }
    };


    if (!isOpen) return null;


    return (
        <>
            <div className={styles.overlay}>

                <div className={styles.modal}>

                    <div className={styles.header}>
                        <h2>Create New Task</h2>
                        <button
                            className={styles.close}
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </div>


                    <p className={styles.subtitle}>
                        Add a new task and keep your workflow organized.
                    </p>


                    <form
                        className={styles.form}
                        onSubmit={createTodo}
                    >

                        <div className={styles.inputGroup}>
                            <label>
                                Task Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your task..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>


                        <button
                            className={styles.button}
                            type="submit"
                        >
                            Create Task
                        </button>

                    </form>

                </div>

            </div>
        </>
    );
}