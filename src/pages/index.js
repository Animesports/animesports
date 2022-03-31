import Router from "next/router";
import styles from "../styles/pages/Home.module.css";
export default function Home() {
  function handleStart() {
    Router.push("/soccer");
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Animesports</h1>
        <button onClick={handleStart}>Jogar</button>
      </div>
    </div>
  );
}
