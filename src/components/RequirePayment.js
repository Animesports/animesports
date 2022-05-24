import Router from "next/router";
import styles from "../styles/components/RequirePayment.module.css";

export function RequirePayment({ close }) {
  function onRedirect() {
    Router.push("/account");
    close();
  }

  return (
    <div className={styles.container}>
      <strong>Quase lá!</strong>
      <span>Nenhuma recarga ativa no momento. Recarregue para jogar.</span>

      <img src="/icons/fuel.svg" alt="fuel" />

      <div className={styles.buttons}>
        <button onClick={onRedirect}>Recarregar</button>
        <button className={styles.close} onClick={close}>
          Voltar
        </button>
      </div>
    </div>
  );
}
