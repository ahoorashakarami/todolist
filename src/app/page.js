import Link from "next/link";
import styles from "./styles.module.css";


export default function Home() {

  return (

    <main className={styles.container}>

      <div className={styles.card}>


        <h1>
          Welcome To Todo Manager
        </h1>


        <p className={styles.subtitle}>
          Organize your tasks, stay productive, and manage your workflow smarter.
        </p>



        <Link
          href="/signin"
          className={styles.button}
        >
          Get Started
        </Link>




        <p className={styles.author}>

          Made By{" "}

          <Link
            href="https://github.com/ahoorashakarami"
            target="_blank"
          >
            Ahoora Shakarami
          </Link>

        </p>



      </div>


    </main>

  );
}