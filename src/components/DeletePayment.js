import { useContext } from "react";
import { adminContext } from "../contexts/AdminContext";
import styles from "../styles/components/DeleteUser.module.css";

export function DeletePayment({ payment, close }) {
  const { deletePayment } = useContext(adminContext);

  const types = {
    receive: "Entrada",
    send: "Saída",
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <strong className={styles.blue}>{payment.id ?? "Desconhecido"}</strong>

        <span>
          <strong>Valor:</strong> R$ {payment.value}
        </span>

        <span>
          <strong>Tipo:</strong> {types[payment.type]}
        </span>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.exclude}
          onClick={() => {
            deletePayment({ id: payment.id }).then(close, () => {
              alert("Occoreu um erro");
            });
          }}
        >
          Excluir
        </button>
        <button onClick={close}> Voltar</button>
      </div>
    </div>
  );
}
