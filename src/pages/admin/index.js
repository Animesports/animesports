import { AdminBlocks } from "../../components/AdminBlocks";
import { AdminSidebar } from "../../components/AdminSidebar";
import { AdminTables } from "../../components/AdminTables";
import { Advise } from "../../components/Advise";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";

export default function Admin() {
  return (
    <Structure contentClass={styles.container}>
      <AdminSidebar current="/admin" />
      <div className={styles.content}>
        <Advise message="2 pagamentos pendentes" />
        <Advise message="3 jogos aguardando resultado" />

        <AdminBlocks />

        <AdminTables />
      </div>
    </Structure>
  );
}
