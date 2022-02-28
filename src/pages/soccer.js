import Header from "../components/Header";
import { SoccerTable } from "../components/SoccerTable";
import styles from "../styles/pages/Soccer.module.css";
export default function Soccer() {
  return (
    <div className={`${styles.container} container-fwh`}>
      <Header use="all" />
      <div className={styles.content}>
        <SoccerTable style={{ overflow: "scroll" }} />
        <div className={styles.shadow} />
      </div>
    </div>
  );
}
