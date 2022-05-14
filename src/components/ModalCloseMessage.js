import styles from "../styles/components/ModalCloseMessage.module.css";
export function ModalCloseMessage({ title, text, close }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <strong>{title || "Finalizado!"}</strong>
        <span>{text || "O processo foi finalizado com sucesso."}</span>
        <button className={styles.close} onClick={close}>
          Fechar
        </button>
      </div>
    </div>
  );
}
