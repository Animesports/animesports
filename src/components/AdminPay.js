import leadStyle from "../styles/components/LeadboardTable.module.css";
import styles from "../styles/components/AdminPay.module.css";
import { Empty } from "../components/Empty";
import { useRef, useState } from "react";

import { Modal } from "./Modal";
import { DeletePayment } from "./DeletePayment";
import { Loading } from "./Loading";
import { EmailLink } from "./EmailLink";
import { useContext } from "react";
import { adminContext } from "../contexts/AdminContext";
import { currency } from "../utils/Global";

import { Copy } from "./Copy";
import { UserProfile } from "./UserProfile";

export function PendingPayments({
  type,
  ["values"]: payments,
  ["ft"]: fetched,
}) {
  const { confirmPayment } = useContext(adminContext);
  const deleteRef = useRef(null);
  const [selectedPayment, selectPayment] = useState(null);

  if (!fetched) {
    return <Loading />;
  }

  if (payments.length === 0) {
    const desc = {
      receive: "Nenhuma entrada pendente para exibir aqui",
      send: "Nenhum pagamento pendente para exibir aqui",
    }[type];

    return <Empty className="opacity delay200" descrition={desc} />;
  }

  console.info("Pending:", payments);

  return (
    <>
      <table
        className={[
          leadStyle.container,
          styles.container,
          styles.pending,
          "appear",
          "delay200",
        ].join(" ")}
      >
        <thead>
          <tr className={leadStyle.header}>
            <th className={[leadStyle.profile, styles.profile].join(" ")}>
              <span>Usuário</span>
            </th>

            {type == "send" && <th className={styles.identification}>Chave</th>}
            {type == "receive" && (
              <th className={styles.identification}>Código</th>
            )}

            <th className={styles.amount}>Quantia</th>

            <th className={styles.amountAction}></th>

            <th className={styles.email}></th>
            <th className={styles.trash}></th>
          </tr>
        </thead>

        <tbody>
          {payments.map(({ value, id, user, reference }, index) => {
            return (
              <tr className={leadStyle.row} key={id + index + "history"}>
                <td
                  className={[
                    "profile",
                    leadStyle.profile,
                    styles.profile,
                  ].join(" ")}
                >
                  <div>
                    <UserProfile userId={user.id} />
                    <span>{user.data.name}</span>
                  </div>
                </td>

                <td className={styles.identification}>
                  <div>
                    {type === "send" && (
                      <Copy value={user.data.pix ?? "-"}>
                        <span>{user.data.pix ?? "-"}</span>
                      </Copy>
                    )}

                    {type === "receive" && (
                      <Copy value={id}>
                        <span>{id}</span>
                      </Copy>
                    )}
                  </div>
                </td>

                <td className={styles.amount}>
                  <div>
                    <span>{currency().get(value)}</span>
                  </div>
                </td>

                <td className={styles.amountAction}>
                  <button
                    onClick={() => {
                      confirmPayment({ id, reference });
                    }}
                  >
                    {{ receive: "Receber", send: "Pagar" }[type]}
                  </button>
                </td>

                <td className={[styles.email, leadStyle.editable].join(" ")}>
                  <EmailLink to={user.data.email.address}>
                    <img src="/icons/email.svg" alt="email" />
                  </EmailLink>
                </td>

                <td
                  className={[
                    styles.trash,
                    leadStyle.editable,
                    leadStyle.trash,
                  ].join(" ")}
                >
                  <img
                    ref={deleteRef}
                    onClick={() => {
                      if (!fetched) return;
                      selectPayment(payments.filter((p) => id === p.id)[0]);
                    }}
                    src="/icons/delete.svg"
                    alt="del"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        openOn={selectedPayment}
        functions={{
          close: () => selectPayment(null),
        }}
      >
        <DeletePayment payment={selectedPayment} />
      </Modal>
    </>
  );
}

export function History({ ["values"]: history, ["ft"]: fetched }) {
  console.info("History:", history);

  if (history.length === 0) {
    const desc = "O histórico de transações está vazio";

    return <Empty className="opacity delay200" descrition={desc} />;
  }

  if (!fetched) return <Loading />;

  return (
    <table
      className={[
        leadStyle.container,
        styles.container,
        styles.history,
        "opacity",
        "delay200",
      ].join(" ")}
    >
      <thead>
        <tr className={leadStyle.header}>
          <th className={[leadStyle.profile, styles.profile].join(" ")}>
            <span>Usuário</span>
          </th>

          <th className={styles.identification}>Referência</th>

          <th className={styles.amount}>Quantia</th>
          <th className={styles.type}>Tipo</th>
          <th className={styles.email}></th>
        </tr>
      </thead>

      <tbody>
        {history.map(({ id, value, user, type }, index) => {
          if (!user) return null;

          return (
            <tr className={leadStyle.row} key={id + index + "history"}>
              <td
                className={["profile", leadStyle.profile, styles.profile].join(
                  " "
                )}
              >
                <div>
                  <UserProfile userId={user.id} />
                  <span>{user.data.name}</span>
                </div>
              </td>

              <td className={styles.identification}>
                <div>
                  <span>{id}</span>
                </div>
              </td>

              <td className={styles.amount}>
                <div>
                  <span>{currency().get(value)}</span>
                </div>
              </td>

              <td className={styles.type}>
                <div>
                  <span className={styles[type]}>
                    {["receive"].includes(type) && "Entrada"}
                    {["send"].includes(type) && "Saída"}
                  </span>
                </div>
              </td>

              <td className={[styles.email, leadStyle.editable].join(" ")}>
                <EmailLink to={user.data.email.address}>
                  <img src="/icons/email.svg" alt="email" />
                </EmailLink>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
