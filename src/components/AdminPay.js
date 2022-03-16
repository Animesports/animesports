import leadStyle from "../styles/components/LeadboardTable.module.css";
import styles from "../styles/components/AdminPay.module.css";

const receiveUsers = [
  {
    name: "Gabriel Bardasson",
    amount: 40.25,
    image: "/icons/user.svg",
  },
  {
    name: "Victor Pinto",
    amount: 20.25,
    image: "/icons/user.svg",
  },
];

const sendUsers = [
  {
    name: "Gabriel Bardasson",
    amount: 40.25,
    image: "/icons/user.svg",
  },
  {
    name: "Victor Pinto",
    amount: 20.25,
    image: "/icons/user.svg",
  },
];

const HistoryUsers = [
  {
    name: "Michel Lopes",
    amount: 24,
    type: "send",
    image: "/icons/user.svg",
  },
  {
    name: "Maria Isabel",
    amount: 2,
    type: "receive",
    image: "/icons/user.svg",
  },
  {
    name: "Victor Pinto",
    amount: 4,
    type: "receive",
    image: "/icons/user.svg",
  },
];

export function PendingPayments({ type }) {
  const users = type === "receive" ? receiveUsers : sendUsers;
  return (
    <table
      className={[leadStyle.container, styles.container, styles.pending].join(
        " "
      )}
    >
      <thead>
        <tr className={leadStyle.header}>
          <th className={[leadStyle.profile, styles.profile].join(" ")}>
            <span>Usuário</span>
          </th>

          <th className={styles.amount}>Quantia</th>

          <th className={styles.amountAction}></th>

          <th className={styles.email}></th>
          <th className={styles.trash}></th>
        </tr>
      </thead>

      <tbody>
        {users.map(({ name, amount, image }, index) => {
          return (
            <tr className={leadStyle.row} key={name + index + "history"}>
              <td
                className={["profile", leadStyle.profile, styles.profile].join(
                  " "
                )}
              >
                <div>
                  <img src={image} alt="user" />
                  <span>{name}</span>
                </div>
              </td>

              <td className={styles.amount}>
                <div>
                  <span>R$ {amount}</span>
                </div>
              </td>

              <td className={styles.amountAction}>
                {type === "receive" && <button>Receber</button>}
                {type === "send" && <button>Pagar</button>}
              </td>

              <td className={[styles.email, leadStyle.editable].join(" ")}>
                <img src="/icons/email.svg" alt="email" />
              </td>

              <td
                className={[
                  styles.trash,
                  leadStyle.editable,
                  leadStyle.trash,
                ].join(" ")}
              >
                <img src="/icons/delete.svg" alt="del" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function History() {
  return (
    <table
      className={[leadStyle.container, styles.container, styles.history].join(
        " "
      )}
    >
      <thead>
        <tr className={leadStyle.header}>
          <th className={[leadStyle.profile, styles.profile].join(" ")}>
            <span>Usuário</span>
          </th>

          <th className={styles.amount}>Quantia</th>
          <th className={styles.type}>Tipo</th>
          <th className={styles.email}></th>
        </tr>
      </thead>

      <tbody>
        {HistoryUsers.map(({ name, amount, type, image }, index) => {
          return (
            <tr className={leadStyle.row} key={name + index + "history"}>
              <td
                className={["profile", leadStyle.profile, styles.profile].join(
                  " "
                )}
              >
                <div>
                  <img src={image} alt="user" />
                  <span>{name}</span>
                </div>
              </td>

              <td className={styles.amount}>
                <div>
                  <span>R$ {amount}</span>
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
                <img src="/icons/email.svg" alt="email" />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
