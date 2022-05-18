import { OnlyAdminUsers } from "../../services/auth";
import { AdminBlocks } from "../../components/AdminBlocks";
import { AdminSidebar } from "../../components/AdminSidebar";
import { AdminTables } from "../../components/AdminTables";
import { Advise } from "../../components/Advise";
import { Structure } from "../../components/Structure";
import styles from "../../styles/pages/Admin.module.css";
import { useContext } from "react";
import { adminContext } from "../../contexts/AdminContext";
import { plural } from "../../utils/Global";
import { soccerContext } from "../../contexts/SoccerContext";
import { getGameState } from "../../utils/Soccer";

export default function Admin() {
  const { payments } = useContext(adminContext);
  const { games } = useContext(soccerContext);

  return (
    <Structure contentClass={styles.container}>
      {OnlyAdminUsers(() => {
        const pendingPayments = payments.filter((p) => p.verified === false);
        const penPayLen = pendingPayments.length;
        const penPayMsg = `
        ${penPayLen} ${plural(penPayLen).convert("pagamento")} 
        ${plural(penPayLen).convert("pendente")}
        `;

        const pendingGames = games.filter(
          (g) => getGameState(g).state === "running"
        );
        const penGamLen = pendingGames.length;
        const penGamMsg = `
        ${penGamLen} ${plural(penGamLen).convert("jogo")} aguardando
        resultado
        `;

        return (
          <>
            <AdminSidebar current="/admin" />
            <div className={styles.content}>
              {penPayLen ? <Advise message={penPayMsg} /> : null}

              {penGamLen ? <Advise message={penGamMsg} /> : null}

              <AdminBlocks />

              <AdminTables />
            </div>
          </>
        );
      })}
    </Structure>
  );
}
