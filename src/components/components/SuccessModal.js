import styles from "./styles.module.css";

export default function SuccessModal({
    isOpen,
    status = "success",
    title,
    message,
    onClose
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
                                ? { message }
                                : { message }
                        )
                    }

                </p>

                {
                    isSuccess ? (

                        <button
                            className={styles.button}
                            onClick={onClose}
                        >
                            OK
                        </button>

                    ) : (

                        <button
                            className={styles.button}
                            onClick={onClose}
                        >
                            Try Again
                        </button>

                    )
                }

            </div>


        </div>
    );
}