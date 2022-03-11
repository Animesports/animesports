import { AdminSidebar } from "../../components/AdminSidebar";
import { Structure } from "../../components/Structure";

export default function Admin() {
  return (
    <Structure>
      <AdminSidebar current="/admin" />
    </Structure>
  );
}
