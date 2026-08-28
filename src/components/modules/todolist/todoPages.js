"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import AddTodo from "@/components/modules/auth/newtaskhandler/NewTaskHandler";
import SuccessModal from "@/components/components/SuccessModal";
import { FaTrash, FaPlay } from "react-icons/fa";

export default function TodoListClient({ todos }) {
    const [userTodos, setUserTodos] = useState(todos);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalStatus, setModalStatus] = useState("");

    const fetchTodos = async () => {
        const res = await fetch("/api/todos");
        const data = await res.json();

        if (res.status === 200) {
            setUserTodos(data.todos);
        }

    }

    const deleteTodo = async (todoID) => {
        const res = await fetch(`/api/todos/${todoID}`, {
            method: "DELETE"
        });

        const data = await res.json();

        await fetchTodos();

        setModalStatus(
            res.status === 200
                ? "success"
                : "error"
        );
        setModalMessage(data.message);
        setShowSuccessModal(true);
    }

    const startTodo = async (todoID) => {
        const res = await fetch(`/api/todos/${todoID}`, {
            method: "PUT"
        });

        const data = await res.json();

        await fetchTodos();

        setModalStatus(
            res.status === 200
                ? "success"
                : "error"
        );

        setModalMessage(data.message);
        setShowSuccessModal(true);
    }

    return (

        <>
            <AddTodo
                fetchTodos={fetchTodos}
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
            />

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

            <section className={styles.board}>


                <Column title="Todo">

                    {userTodos.filter(
                        todo => !todo.isDone && !todo.isInProgress
                    ).length === 0 && (
                            <p className={styles.emptyMessage}>
                                No tasks available. Click "Add Task" to create one.
                            </p>
                        )}

                    {userTodos
                        .filter(todo => !todo.isDone && !todo.isInProgress)
                        .map(todo => (
                            <TaskCard
                                key={todo._id}
                                {...todo}
                                onDelete={() => deleteTodo(todo._id)}
                                onStart={() => startTodo(todo._id)}
                            />
                        ))
                    }

                </Column>

                <Column title="In Progress">

                    {userTodos.filter(
                        todo => todo.isInProgress
                    ).length === 0 && (
                            <p className={styles.emptyMessage}>
                                No tasks available. Start a task to see it here.
                            </p>
                        )}

                    {userTodos
                        .filter(todo => todo.isInProgress)
                        .map(todo => (
                            <TaskCard
                                key={todo._id}
                                {...todo}
                                onDelete={() => deleteTodo(todo._id)}
                                onStart={() => startTodo(todo._id)}
                            />
                        ))
                    }

                </Column>

                <Column title="Done">

                    {userTodos.filter(
                        todo => todo.isDone
                    ).length === 0 && (
                            <p className={styles.emptyMessage}>
                                No tasks available. Finish a task to see it here.
                            </p>
                        )}

                    {userTodos
                        .filter(todo => todo.isDone)
                        .map(todo => (
                            <TaskCard
                                key={todo._id}
                                {...todo}
                                onDelete={() => deleteTodo(todo._id)}
                                onStart={() => startTodo(todo._id)}
                            />
                        ))
                    }

                </Column>
            </section>
        </>
    )
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

    )

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
                            :
                            isInProgress
                                ? "In Progress"
                                : "Incomplete"
                    }


                </span>



                <div className={styles.actions}>


                    <button
                        className={styles.startBtn}
                        onClick={onStart}
                    >

                        <FaPlay />

                    </button>



                    <button
                        className={styles.deleteBtn}
                        onClick={onDelete}
                    >

                        <FaTrash />

                    </button>


                </div>


            </div>



        </div>

    )

}