import styles from "../styles/components/AdminTables.module.css";
import { makeADate } from "./SoccerTable";

export function AdminTables() {
  const payments = [
    {
      name: "Gabriel Bardasson",
      value: 40.25,
    },
    {
      name: "Victor Pinto",
      value: 20.25,
    },
  ];

  const games = [
    {
      id: "0001",
      date: makeADate({ compense: 3 }),
      teams: {
        visited: {
          name: "Flamengo",
        },
        visitor: {
          name: "Grêmio",
        },
      },
    },

    {
      id: "0002",
      date: makeADate({ compense: 4 }),
      teams: {
        visited: {
          name: "Palmeiras",
        },
        visitor: {
          name: "São Paulo",
        },
      },
    },

    {
      id: "0003",
      date: makeADate({ compense: 5 }),
      teams: {
        visited: {
          name: "Inter",
        },
        visitor: {
          name: "Grêmio",
        },
      },
    },
  ];

  return (
    <div className={styles.container}>
      <table className={styles.paymentTable}>
        <tr>
          <th colSpan="2">
            <span>PAGAMENTOS</span>
          </th>
        </tr>

        {payments.map(({ name }, index) => {
          return (
            <tr key={"adm payments" + index}>
              <td>
                <span>{name}</span>
              </td>
              <td>
                <button>Pagar</button>
              </td>
            </tr>
          );
        })}
      </table>

      <table className={styles.soccerTable}>
        <tr>
          <th colSpan="3">
            <span>JOGOS</span>
          </th>
        </tr>

        {games.map(({ date, id, teams }, index) => {
          return (
            <tr key={"adm games" + index}>
              <td className={styles.hour}>
                <span>
                  {date.getHours()}:{date.getMinutes()}
                </span>
              </td>
              <td>
                <span>
                  {teams.visited.name} - {teams.visitor.name}
                </span>
              </td>

              <td>
                <button>Atualizar</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
