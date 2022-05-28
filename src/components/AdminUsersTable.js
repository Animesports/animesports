import { useContext, useRef } from "react";
import { useState } from "react";

import { adminContext } from "../contexts/AdminContext";
import { authContext } from "../contexts/AuthContext";
import styles from "../styles/components/LeadboardTable.module.css";
import { User } from "../utils/Types";
import { DeleteUser } from "./DeleteUser";
import { Loading } from "./Loading";
import { Modal } from "./Modal";
import { UserDetail } from "./UserDetail";
import { UserProfile } from "./UserProfile";

export function AdminUsersTable({ customClass, title }) {
  const { user } = useContext(authContext);
  const { fetched, users } = useContext(adminContext);

  const [userDetailRef, userDeleteRef] = [useRef(), useRef()];

  const [selectedUser, selectUser] = useState(new User());

  if (!fetched) {
    return <Loading />;
  }

  return (
    <>
      <table className={[styles.container, customClass].join(" ")}>
        <thead>
          <tr className={styles.header}>
            <th
              colSpan="1"
              className={[styles.position, styles.profile].join(" ")}
            >
              <span>{title || "Melhores jogadores"}</span>
            </th>

            <th className={styles.league}></th>

            <th className={styles.leagueName}>
              {
                // <span>Liga</span>
              }
            </th>

            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users.map(({ id, data }, index) => {
            return (
              <tr className={styles.row} key={id + index}>
                <td className={["profile", styles.profile].join(" ")}>
                  <div>
                    <UserProfile userId={id} />
                    <span>{data.name}</span>
                  </div>
                </td>
                <td className={["league", styles.league].join(" ")}>
                  {
                    // <div>
                    //<img src={league.image} alt={league.name} />
                    //</div>
                  }
                </td>
                <td className={styles.leagueName}>
                  {
                    //<div>
                    //<span className={league.name}>{league.display}</span>
                    // </div>
                  }
                </td>

                <td className={styles.editable}>
                  <a
                    href={`mailto:${data.email.address}?subject=${
                      user.data.name.split(" ")[0]
                    }%2C%20do%20Animesports`}
                  >
                    <img src="/icons/email.svg" alt="email" />
                  </a>
                </td>

                <td className={styles.editable}>
                  <img
                    ref={userDetailRef}
                    src="/icons/info.svg"
                    alt="i"
                    onClick={() => {
                      selectUser({ id, data, modal: "info" });
                    }}
                  />
                </td>

                <td className={[styles.editable, styles.trash].join(" ")}>
                  <img
                    ref={userDeleteRef}
                    src="/icons/delete.svg"
                    alt="del"
                    onClick={() => {
                      selectUser({ id, data, modal: "delete" });
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal
        openOn={selectedUser?.modal === "info"}
        functions={{
          close: () => selectUser(null),
        }}
      >
        <UserDetail user={selectedUser} />
      </Modal>

      <Modal
        openOn={selectedUser?.modal === "delete"}
        functions={{
          close: () => selectUser(null),
        }}
      >
        <DeleteUser user={selectedUser} />
      </Modal>
    </>
  );
}
