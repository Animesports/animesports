import { useState } from "react";
import styles from "../styles/components/VerifyEmail.module.css";

export function VerifyEmail({ close }) {
  const [state, setState] = useState("initial");

  function handleSendRequest() {
    setState("feedback");
  }

  function reset() {
    setState("inital");
    close();
  }

  return (
    <>
      <div className={styles.overlay} onClick={reset} />
      {state === "initial" && (
        <div className={styles.container}>
          <h4>Verifique seu email</h4>
          <p>
            A confirmação do seu endereço de email é necessária para algumas
            funções do app. Clique no link enviado para
          </p>
          <span onClick={handleSendRequest} className={styles.sendEmail}>
            Envie novamente, por favor
          </span>
          <span
            onClick={reset}
            className={[styles.close, "close-button"].join(" ")}
          >
            X
          </span>
        </div>
      )}

      {state === "feedback" && (
        <div className={styles.container}>
          <h4>Verifique seu email</h4>
          <p>Foi enviado um novo link de confirmação para o email abaixo.</p>
          <span className={styles.sendEmail}>g*****son@gmail.com</span>
          <span
            onClick={reset}
            className={[styles.close, "close-button"].join(" ")}
          >
            X
          </span>
        </div>
      )}
    </>
  );
}
