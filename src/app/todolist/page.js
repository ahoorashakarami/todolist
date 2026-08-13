// This Project is Under Development, Codes Might Change in the Future.

"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import AddTodo from "@/components/modules/auth/newtaskhandler/NewTaskHandler";
import SuccessModal from "@/components/components/SuccessModal"

export default function TodoListPage() {
  const [userTodos, setUserTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTodos = async () => {
    const res = await fetch("/api/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setUserTodos(data.todos);
    }


  };

  // Temporary

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className={styles.container}>

      {/* New Task Modal  */}

      <AddTodo fetchTodos={fetchTodos} isOpen={showModal} onClose={() => setShowModal(false)} />

      <section className={styles.top}>

        {/* TEST BUTTON */}

        <button onClick={fetchTodos}>Test</button>

        {/* TEST BUTTON */}

        <div>
          <h1>My Tasks</h1>

          <p>
            Organize your work and stay productive.
          </p>
        </div>


        <button className={styles.addButton} onClick={() => setShowModal(true)}>
          + Add Task
        </button>

      </section>


      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search tasks..."
        />
      </div>


      <section className={styles.board}>


        <Column
          title="Todo"
          count="4"
        >

          {userTodos.map((todo) => (
            <TaskCard
              key={todo._id}
              {...todo}
            />
          ))}

        </Column>
        <Column
          title="In Progress"
          count="2"
        >


        </Column>

        <Column
          title="Done"
          count="3"
        >

          <TaskCard
            title="Setup Next.js"
            desc="Initialize project"
            priority="Low"
          />

        </Column>


      </section>


    </main>
  );
}





function Column({ title, count, children }) {

  return (

    <div className={styles.column}>

      <div className={styles.columnTitle}>

        <h2>
          {title}
        </h2>

        <span>
          {count}
        </span>

      </div>


      {children}


    </div>

  )

}





function TaskCard({ title, isDone, isInProgress }) {

  return (

    <div className={styles.card}>

      <h3>
        {title}
      </h3>

      <div className={styles.cardFooter}>

        <span className={styles.priority}>
          {isDone ? "Done" : isInProgress ? "In Progress" : "Incomplete"}
        </span>


        <span className={styles.date}>
          Today
        </span>

      </div>


    </div>

  )

}