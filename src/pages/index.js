import { BackgroundVideo } from "../components/BackgroundVideo";
import styles from "../styles/pages/Home.module.css";
export default function Home() {
  function handleStart() {
    // handle start function
    // redirect to games or login
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Animesports</h1>
        <button onClick={handleStart}>Jogar</button>
      </div>

      <BackgroundVideo />
    </div>
  );
}
