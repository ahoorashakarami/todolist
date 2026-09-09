import React from "react";
import styles from "./styles.module.css";
import SignIn from "@/components/modules/auth/signin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/utils/auth";

export default async function Page() {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
        const tokenPayload = verifyToken(token);

        if (tokenPayload) {
            redirect("/todolist");
        }
    }

    return (
        <>
            <SignIn styles={styles} />
        </>
    );
}