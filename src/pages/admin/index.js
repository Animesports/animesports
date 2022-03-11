import { AdminSidebar } from "../../components/AdminSidebar";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";

export default function Admin() {
  return (
    <Structure contentClass={styles.container}>
      <AdminSidebar current="/admin" />
      <div className={styles.content}>content here</div>
    </Structure>
  );
}
