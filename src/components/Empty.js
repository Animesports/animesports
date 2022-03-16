import styles from "../styles/components/Empty.module.css";

export function Empty({ className, title, descrition }) {
  return (
    <div className={[className, styles.container].join(" ")}>
      <img src="/icons/cloud.svg" alt="no-results" />
      <p>{title || "Nada encontrado"}</p>
      <span>
        {descrition || "Ainda não encontramos nada para exibir aqui"}.
      </span>
    </div>
  );
}
