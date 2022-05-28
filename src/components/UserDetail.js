import styles from "../styles/components/UserDetail.module.css";
import { UserProfile } from "./UserProfile";

export function UserDetail({ user, close }) {
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
            {" "}
            <strong>PIX:</strong> {user?.data?.pix}
          </span>
        </div>
      </div>
      <button onClick={close}> Voltar</button>
    </div>
  );
}
