import Link from "next/link";
import styles from "./styles.module.css";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token) {
    const tokenPayload = verifyToken(token);

    if (tokenPayload) {
      redirect("/todolist");
    }
  }

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