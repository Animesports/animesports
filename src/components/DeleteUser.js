import { useContext } from "react";
import { adminContext } from "../contexts/AdminContext";
import styles from "../styles/components/DeleteUser.module.css";
import { UserProfile } from "./UserProfile";

export function DeleteUser({ user, close }) {
  const { removeUser } = useContext(adminContext);

  function handleDelete() {
    removeUser({
      id: user.id,
      email: user.data.email.address,
      name: user.data.name,
    }).then(
      () => {
        close();
      },
      (err) => {
        console.info("error", err);
      }
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <UserProfile userId={user.id} />
        <div className={styles.rightBox}>
          <strong>{user?.data?.name ?? "Desconhecido"}</strong>

          <span>
            <strong>Email:</strong> {user?.data?.email?.address}
          </span>

          <span>
            <strong>Verificado:</strong>{" "}
            {user?.data?.email?.verified ? "sim" : "não"}
          </span>
          <span>
            <strong>PIX:</strong> {user?.data?.pix}
          </span>
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.exclude} onClick={handleDelete}>
          Excluir
        </button>
        <button onClick={close}> Voltar</button>
      </div>
    </div>
  );
}
