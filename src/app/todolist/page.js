import styles from "./styles.module.css";
import TodoListClient from "@/components/modules/todolist/todoPages";
import connectToDB from "@/configs/connectToDb";
import todoModel from "@/models/Todo";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";
import { redirect } from "next/navigation";


async function getTodos() {

  await connectToDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return redirect("/signin");
  }

  const payload = verifyToken(token);

  if (!payload) {
    return [];
  }


  const todos = await todoModel
    .find({ user: payload.id })
    .lean();
    
  return JSON.parse(JSON.stringify(todos));

}

export default async function TodoListPage() {
  const todos = await getTodos();

  return (
    <main className={styles.container}>
      <TodoListClient
        todos={todos}
      />
    </main>
  )

}