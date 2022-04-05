import Router from "next/router";
import { useContext } from "react";
import { Loading } from "../components/Loading";
import { Structure } from "../components/Structure";
import { authContext } from "../contexts/AuthContext";
import styles from "../styles/pages/EmailStatus.module.css";
import { HideContent } from "../components/HideContent";
import { requestTokenValidation } from "../services/email";
import { useState } from "react";

export default function EmailStatus() {
  const { user, isFetched, isAuthenticated } = useContext(authContext);
  const [sendState, setSendState] = useState(false);

  function handleSendRequest() {
    requestTokenValidation({ email: user.data.email.address }).then(
      (success) => {
        setSendState(success);
      }
    );
  }

  if (!isFetched) {
    return (
      <Structure contentClass={styles.container}>
        <Loading />
      </Structure>
    );
  }

  if (!isAuthenticated) {
    return (
      <Structure contentClass={styles.container}>
        <div>
          <img src="icons/email-wht.svg" alt="email" />

          <HideContent
            vertical
            text="para verificar o status do endereço de email"
          />
        </div>
      </Structure>
    );
  }

  return (
    <Structure contentClass={styles.container}>
      <div>
        <img src="/icons/email-wht.svg" alt="email" />
        {user.data.email.verified && (
          <>
            <span>O email cadastrado foi confirmado com sucesso!</span>
            <button
              onClick={() => {
                Router.push("/soccer");
              }}
            >
              Continuar
            </button>
          </>
        )}

        {!user.data.email.verified && (
          <>
            <span>
              A confirmação do seu endereço de email é necessária. Clique no
              link enviado para{" "}
              <span className={styles.blue}>{user.data.email.address}</span>
            </span>
            {!sendState && (
              <button onClick={handleSendRequest}>Enviar novamente</button>
            )}
            {sendState && (
              <button
                onClick={() => {
                  Router.push("/soccer");
                }}
                className={styles.disable}
              >
                Continuar
              </button>
            )}
          </>
        )}
      </div>
    </Structure>
  );
}
