import Router from "next/router";
import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";
import styles from "../styles/pages/Home.module.css";
export default function Home() {
  const { isAuthenticated, isFetched } = useContext(authContext);

  function handleStart() {
    if (!isAuthenticated) return Router.push("/login");
    Router.push("/soccer");
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Animesports</h1>
        <button
          className={(!isFetched && styles.loading) || null}
          onClick={handleStart}
        >
          {isFetched && (isAuthenticated ? "Jogar" : "Entrar")}
        </button>
      </div>
    </div>
  );
}
