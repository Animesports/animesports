import { AdminSidebar } from "../../components/AdminSidebar";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";

export default function Payments() {
  return (
    <Structure contentClass={styles.container}>
      <AdminSidebar current="/admin/payments" />
      <div className={styles.content}></div>
    </Structure>
  );
}
