import styles from "../styles/components/Loading.module.css";

export function Loading() {
  return (
    <div className={styles.container}>
      <img src="/icons/cloud.svg" alt="cloud" />

      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
