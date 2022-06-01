import { OnlyAdminUsers } from "../../services/auth";
import { AdminSidebar } from "../../components/AdminSidebar";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";

import { AdminUsersTable } from "../../components/AdminUsersTable";

export default function Users() {
  return (
    <Structure contentClass={styles.container}>
      {OnlyAdminUsers(() => {
        return (
          <>
            <AdminSidebar current="/admin/users" />
            <div className={styles.content}>
              <div className={[styles.header, "opacity"].join(" ")}>
                <h1>Usuários Cadastrados</h1>
              </div>
              <AdminUsersTable
                title="Usuários"
                disable={["position", "hits"]}
                customClass={styles.leadboardTable}
                editable
              />
            </div>
          </>
        );
      })}
    </Structure>
  );
}
