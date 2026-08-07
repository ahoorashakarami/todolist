import React from "react";
import styles from "./styles.module.css";

export default function TodoListPage() {
  return (
    <main className={styles.container}>

      <section className={styles.top}>

        <div>
          <h1>My Tasks</h1>

          <p>
            Organize your work and stay productive.
          </p>
        </div>


        <button className={styles.addButton}>
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
          <TaskCard
            title="Create UI Design"
            desc="Design the dashboard layout"
            priority="High"
          />

          <TaskCard
            title="Learn MongoDB"
            desc="Connect database"
            priority="Medium"
          />

        </Column>




        <Column
          title="In Progress"
          count="2"
        >

          <TaskCard
            title="Build Authentication"
            desc="Create login and register"
            priority="High"
          />

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





function TaskCard({ title, desc, priority }) {

  return (

    <div className={styles.card}>

      <h3>
        {title}
      </h3>


      <p>
        {desc}
      </p>


      <div className={styles.cardFooter}>

        <span className={styles.priority}>
          {priority}
        </span>


        <span className={styles.date}>
          Today
        </span>

      </div>


    </div>

  )

}