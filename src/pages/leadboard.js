import { useRef } from "react";
import Header from "../components/Header";
import { LeadboardTable } from "../components/LeadboardTable";
import styles from "../styles/pages/Soccer.module.css";
export default function Leadboard() {
  const ref = useRef(null);

  return (
    <div ref={ref} className={`${styles.container} container-fwh`}>
      <Header use="all" parentNode={ref} />
      <div className={styles.content}>
        <LeadboardTable />
        <div className={styles.shadow} />
      </div>
    </div>
  );
}
