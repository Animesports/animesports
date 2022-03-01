import styles from "../styles/components/LeadboardTable.module.css";

export function LeadboardTable() {
  return (
    <table className={`${styles.container}`}>
      <thead>
        <tr className={styles.header}>
          <th colSpan="2">
            <span>Melhores jogadores</span>
          </th>
          <th></th>
          <th>
            <span>Liga</span>
          </th>
          <th>
            <span>Acertividade</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr className={styles.row}>
          <td className="position">
            <div>
              <img src="icons/award1.svg" alt="1" />
            </div>
          </td>
          <td className="profile">
            <div>
              <img src="/icons/user.svg" alt="user" />
              <span>Gabriel Bardasson</span>
            </div>
          </td>
          <td className="league">
            <div>
              <img src="/icons/teller.svg" alt="teller" />
            </div>
          </td>
          <td>
            <div>
              <span className="teller">vidente</span>
            </div>
          </td>
          <td className="hits">
            <span>80%</span>
          </td>
        </tr>

        <tr className={styles.row}>
          <td className="position">
            <div>
              <img src="icons/award2.svg" alt="2" />
            </div>
          </td>
          <td className="profile">
            <div>
              <img src="/icons/user.svg" alt="user" />
              <span>Michel Lopes</span>
            </div>
          </td>
          <td className="league">
            <div>
              <img src="/icons/expert.svg" alt="expert" />
            </div>
          </td>
          <td>
            <div>
              <span className="expert">Perito</span>
            </div>
          </td>
          <td className="hits">
            <span>74%</span>
          </td>
        </tr>

        <tr className={styles.row}>
          <td className="position">
            <div>
              <img src="icons/award3.svg" alt="3" />
            </div>
          </td>
          <td className="profile">
            <div>
              <img src="/icons/user.svg" alt="user" />
              <span>Victor Pinto</span>
            </div>
          </td>
          <td className="league">
            <div>
              <img src="/icons/reckoner.svg" alt="reckoner" />
            </div>
          </td>
          <td>
            <div>
              <span className="reckoner">Perito</span>
            </div>
          </td>
          <td className="hits">
            <span>70%</span>
          </td>
        </tr>

        <tr className={styles.row}>
          <td className="position">
            <div>
              <span>4</span>
            </div>
          </td>
          <td className="profile">
            <div>
              <img src="/icons/user.svg" alt="user" />
              <span>Maria Isabel</span>
            </div>
          </td>
          <td className="league">
            <div>
              <img src="/icons/jinx.svg" alt="jinx" />
            </div>
          </td>
          <td>
            <div>
              <span className="jinx">Pé Frio</span>
            </div>
          </td>
          <td className="hits">
            <span>30%</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
