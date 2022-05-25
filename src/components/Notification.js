import Router from "next/router";
import styles from "../styles/components/Notification.module.css";

export function Notification({
  id,
  title,
  message,
  image,
  winners,
  action,
  close,
}) {
  const actions = {
    "redirect-account": [
      "Atualizar",
      () => {
        Router.push("/account");
      },
    ],
  };

  return (
    <div className={styles.container}>
      <strong>{title}</strong>
      <span>{message}</span>

      {image && <img src={image} alt={`${id}-image`} />}

      {winners && (
        <div className={styles.winners}>
          {winners.map((winner, index) => {
            return (
              <div key={winner.id + index}>
                <img
                  src={winner.picture ?? "/icons/user.svg"}
                  alt={winner.name}
                />

                <img
                  className={styles.award}
                  src={`/icons/award${index + 1}.svg`}
                  alt={`pos-${index + 1}`}
                />
                <span>{winner.name}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.buttons}>
        <button onClick={close}>Fechar</button>
        {actions[action] && (
          <button
            onClick={() => {
              actions[action][1]();
              close();
            }}
          >
            {actions[action][0]}
          </button>
        )}
      </div>
    </div>
  );
}
