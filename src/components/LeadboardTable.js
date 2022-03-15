import styles from "../styles/components/LeadboardTable.module.css";

export function LeadboardTable({ editable, disable, customClass, title }) {
  disable =
    disable?.filter((item) => ["hits", "position"].includes(item)) ?? [];

  const users = [
    {
      name: "Gabriel Bardasson",
      position: 1,
      image: "/icons/user.svg",
      league: {
        name: "teller",
        display: "Vidente",
        image: "/icons/teller.svg",
      },
      hits: 0.8,
    },
    {
      name: "Michel Lopes",
      position: 2,
      image: "/icons/user.svg",
      league: {
        name: "expert",
        display: "Perito",
        image: "/icons/expert.svg",
      },
      hits: 0.74,
    },
    {
      name: "Victor Pinto",
      position: 3,
      image: "/icons/user.svg",
      league: {
        name: "expert",
        display: "Perito",
        image: "/icons/expert.svg",
      },
      hits: 0.7,
    },

    {
      name: "Maria Isabel",
      position: 4,
      image: "/icons/user.svg",
      league: {
        name: "reckoner",
        display: "Pé Frio",
        image: "/icons/reckoner.svg",
      },
      hits: 0.7,
    },
  ];
  return (
    <table className={[styles.container, customClass].join(" ")}>
      <thead>
        <tr className={styles.header}>
          <th
            colSpan={(!disable.includes("position") && "2") || "1"}
            className={[styles.position, styles.profile].join(" ")}
          >
            <span>{title || "Melhores jogadores"}</span>
          </th>

          <th className={styles.league}></th>

          <th className={styles.leagueName}>
            <span>Liga</span>
          </th>
          {!disable.includes("hits") && (
            <th className={styles.hits}>
              <span>Acertividade</span>
            </th>
          )}
          {editable && (
            <>
              <th></th>
              <th></th>
              <th></th>
            </>
          )}
        </tr>
      </thead>

      <tbody>
        {users.map(({ name, position, league, image, hits }, index) => {
          return (
            <tr className={styles.row} key={name + index}>
              {!disable.includes("position") && (
                <td className={["position", styles.position].join(" ")}>
                  <div>
                    {[1, 2, 3].includes(position) && (
                      <img src={`/icons/award${position}.svg`} alt={position} />
                    )}
                    {![1, 2, 3].includes(position) && <span>{position}</span>}
                  </div>
                </td>
              )}
              <td className={["profile", styles.profile].join(" ")}>
                <div>
                  <img src={image} alt="user" />
                  <span>{name}</span>
                </div>
              </td>
              <td className={["league", styles.league].join(" ")}>
                <div>
                  <img src={league.image} alt={league.name} />
                </div>
              </td>
              <td className={styles.leagueName}>
                <div>
                  <span className={league.name}>{league.display}</span>
                </div>
              </td>
              {!disable.includes("hits") && (
                <td className={["hits", styles.hits].join(" ")}>
                  <span>{hits * 100}%</span>
                </td>
              )}

              {editable && (
                <>
                  <td className={styles.editable}>
                    <img src="/icons/email.svg" alt="email" />
                  </td>

                  <td className={styles.editable}>
                    <img src="/icons/info.svg" alt="i" />
                  </td>

                  <td className={[styles.editable, styles.trash].join(" ")}>
                    <img src="/icons/delete.svg" alt="del" />
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
