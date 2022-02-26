import Header from "../components/Header";
import styles from "../styles/pages/Soccer.module.css";
export default function Soccer() {
  return (
    <div className={`${styles.container} container-fwh`}>
      <div className={styles.content}>
        <Header use="all" />
      </div>
    </div>
  );
}
