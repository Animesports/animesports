import styles from "../styles/components/Loading.module.css";

export function Loading({ className, ...rest }) {
  return (
    <div className={[styles.container, className].join(" ")} {...rest}>
      <img src="/icons/cloud.svg" alt="cloud" />

      <div className={styles.loading}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
