import styles from "../styles/components/ModalCloseMessage.module.css";
export function ModalCloseMessage({
  title,
  text,
  close,
  cancel,
  className,
  ...rest
}) {
  return (
    <div className={[styles.container, className].join(" ")} {...rest}>
      <div className={styles.content}>
        <strong>{title || "Finalizado!"}</strong>
        <span>{text || "O processo foi finalizado com sucesso"}</span>

        {!cancel && close && (
          <button className={styles.close} onClick={close}>
            Fechar
          </button>
        )}

        {cancel && !close && (
          <button className={styles.back} onClick={cancel}>
            Voltar
          </button>
        )}

        {cancel && close && (
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
