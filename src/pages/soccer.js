import { useRef } from "react";
import Header from "../components/Header";
import { SoccerTable } from "../components/SoccerTable";
import styles from "../styles/pages/Soccer.module.css";
export default function Soccer() {
  const ref = useRef(null);
  return (
    <div ref={ref} className={`${styles.container} container-fwh`}>
      <Header use="all" parentNode={ref} />
      <div className={styles.content}>
        <SoccerTable />
        <div className={styles.shadow} />
      </div>
    </div>
  );
}
