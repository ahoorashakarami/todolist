"use client";

import Link from "next/link";
import styles from "./styles.module.css";


export default function StatusModal({
    isOpen,
    status = "success",
    title,
    message,
}) {

    if (!isOpen) return null;


    const isSuccess = status === "success";


    return (
        <div className={styles.overlay}>
            <div
                className={`${styles.modal} ${isSuccess ? styles.success : styles.error
                    }`}
            >
                <div className={styles.icon}>

                    {isSuccess ? "✓" : "!"}

                </div>



                <h2>

                    {
                        title ||
                        (isSuccess
                            ? "Success!"
                            : "Something went wrong!"
                        )
                    }

                </h2>



                <p>

                    {
                        message ||
                        (
                            isSuccess
                                ? {message}
                                : {message}
                        )
                    }

                </p>

                {
                    isSuccess ? (

                        <Link
                            href="/todolist"
                            className={styles.button}
                        >
                            Go to Dashboard
                        </Link>

                    ) : (

                        <button
                            className={styles.button}
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>

                    )
                }

            </div>


        </div>
    );
}