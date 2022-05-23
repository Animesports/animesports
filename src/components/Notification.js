import styles from "../styles/components/Notification.module.css";

export function Notification({ id, title, message, image, winners, close }) {
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
      <button onClick={close}>Fechar</button>
    </div>
  );
}
