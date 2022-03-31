import Link from "next/link";
import styles from "../styles/components/HideContent.module.css";
export function HideContent({ text, className, alwaysOn, vertical }) {
  return (
    <div className={styles.outside}>
      <Link href="/login" passHref={true}>
        <div
          className={[
            styles.container,
            className,
            styles[alwaysOn && "alwaysOn"],
            styles[vertical && "vertical"],
          ].join(" ")}
        >
          <span className={styles.login}>Entrar</span>
          <span className={styles.text}>{text ?? "para continuar"}</span>
        </div>
      </Link>
    </div>
  );
}
