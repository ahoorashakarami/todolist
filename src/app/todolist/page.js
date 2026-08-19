"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import AddTodo from "@/components/modules/auth/newtaskhandler/NewTaskHandler";
import SuccessModal from "@/components/components/SuccessModal";
import { FaTrash, FaPlay } from "react-icons/fa";


export default function TodoListPage() {

  // Todos
  const [userTodos, setUserTodos] = useState([]);

  // Add Todo Modal
  const [showAddModal, setShowAddModal] = useState(false);

  // Success Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("");


  const fetchTodos = async () => {

    const res = await fetch("/api/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      setUserTodos(data.todos || []);
    }

  };


  useEffect(() => {
    fetchTodos();
  }, []);



  // Delete Todo

  const deleteTodo = async (todoID) => {

    const res = await fetch(`/api/todos/${todoID}`, {
      method: "DELETE",
    });


    const data = await res.json();


    await fetchTodos();


    if (res.status === 200) {
      setModalStatus("success");
    } else {
      setModalStatus("error");
    }


    setModalMessage(data.message);
    setShowSuccessModal(true);

  };




  // Start Todo

  const handleStartTodo = async (todoID) => {

    const res = await fetch(`/api/todos/${todoID}`, {
      method: "PUT",
    });


    const data = await res.json();


    if (res.status === 200) {
      await fetchTodos();
      setModalStatus("success");
      fetchTodos();
    } else {
      setModalStatus("error");
    }

    setShowSuccessModal(true);
    setModalMessage(data.message);
  };




  return (
    <main className={styles.container}>


      {/* Add Todo Modal */}

      <AddTodo
        fetchTodos={fetchTodos}
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />



      {/* Success Modal */}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={modalMessage}
        status={modalStatus}
      />



      <section className={styles.top}>

        <div>

          <h1>
            My Tasks
          </h1>


          <p>
            Organize your work and stay productive.
          </p>

        </div>



        <button
          className={styles.addButton}
          onClick={() => setShowAddModal(true)}
        >
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
        >

          {
            userTodos.filter((todo) => !todo.isDone && !todo.isInProgress).map((todo) => (

              <TaskCard

                key={todo._id}

                {...todo}

                onDelete={() => deleteTodo(todo._id)}

                onStart={() => handleStartTodo(todo._id)}

              />

            ))
          }
        </Column>

        <Column
          title="In Progress"
        >

          {
            userTodos.filter((todo) => todo.isInProgress).map((todo) => (

              <TaskCard

                key={todo._id}

                {...todo}

                onDelete={() => deleteTodo(todo._id)}

                onStart={() => handleStartTodo(todo._id)}

              />

            ))
          }
        </Column>

        <Column
          title="Done"
        />


      </section>



    </main>
  );
}







function Column({ title, children }) {


  return (

    <div className={styles.column}>


      <div className={styles.columnTitle}>
        <h2>
          {title}
        </h2>
      </div>



      {children}



    </div>

  );

}








function TaskCard({
  title,
  isDone,
  isInProgress,
  onDelete,
  onStart
}) {


  return (


    <div className={styles.card}>


      <h3>
        {title}
      </h3>




      <div className={styles.cardFooter}>


        <span className={styles.priority}>

          {
            isDone
              ? "Done"
              : isInProgress
                ? "In Progress"
                : "Incomplete"
          }

        </span>





        <div className={styles.actions}>


          <button
            className={styles.startBtn}
            onClick={onStart}
            title="Start Task"
          >

            <FaPlay />

          </button>




          <button
            className={styles.deleteBtn}
            onClick={onDelete}
            title="Delete Task"
          >

            <FaTrash />

          </button>


        </div>




      </div>


    </div>


  );

}