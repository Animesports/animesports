import styles from "../styles/components/ModalCloseMessage.module.css";
export function ModalCloseMessage({ title, text, close, cancel }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <strong>{title || "Finalizado!"}</strong>
        <span>{text || "O processo foi finalizado com sucesso"}</span>

        {!cancel && (
          <button className={styles.close} onClick={close}>
            Fechar
          </button>
        )}

        {cancel && (
          <div className={styles.dualButton}>
            <button className={styles.back} onClick={cancel}>
              Volvar
            </button>

            <button className={styles.close} onClick={close}>
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
