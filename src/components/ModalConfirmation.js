import styles from "../styles/components/ModalConfirmation.module.css";

export function ModalConfirmation({ close, callBack, title, message }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <strong>{title ?? "Confirmação"}</strong>
        <span>{message ?? "Confirme a operação antes de prosseguir"}</span>

        <div className={styles.dualButton}>
          <button onClick={callBack}>Confirmar</button>
          <button onClick={close} className={styles.close}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
