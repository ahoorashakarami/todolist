import React from "react";
import styles from "./styles.module.css";
import SignIn from "@/components/modules/auth/signin";


export default function Page() {
  return (
    <>
      <SignIn styles={styles} />
    </>
  );
}