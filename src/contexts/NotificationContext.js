import { createContext, useContext, useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import { Notification } from "../components/Notification";
import { getNotifications, updateAsRead } from "../services/notification";
import { Notify } from "../utils/Types";
import { authContext } from "./AuthContext";
import { parseCookies, setCookie } from "nookies";
import { socketContext } from "../contexts/SocketContext";

export const notificationContext = createContext({
  markAsRead: () => {},
  fetched: Boolean,
  notifications: [Notify],
  current: {},
  block: [String],
});

export function NotificationProvider({ children }) {
  const [fetched, setFetched] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [block, setBlock] = useState([]);

  const [current, setCurrent] = useState(null);

  const { isFetched, sessionId, isAuthenticated } = useContext(authContext);
  const { Listen } = useContext(socketContext);

  function importNotifications() {
    // Importar todas as notificações que o usuário ainda não leu
    getNotifications().then((nos) => {
      setNotifications(nos);
      setFetched(true);
    });
  }

  function markAsRead() {
    setNotifications([...notifications.filter((n) => current.id !== n.id)]);

    setCookie(
      null,
      "animesports.block",
      JSON.stringify([...block, current.id]),
      {
        maxAge: 60 * 60 * (24 * 10), // Ten days
      }
    );

    setBlock([...block, current.id]);

    if (isAuthenticated) {
      updateAsRead(current, sessionId);
    }
  }

  useEffect(() => {
    const { ["animesports.block"]: blo } = parseCookies();
    if (typeof blo === "string" && Array.isArray(JSON.parse(blo))) {
      setBlock(JSON.parse(blo));
    }

    Listen("insert-notification", (noty) => {
      setNotifications([...notifications, noty]);
    });

    importNotifications();
  }, []);

  useEffect(() => {
    isFetched &&
      setCurrent(
        notifications
          .filter((n) => {
            if (n.onlyLogged && !isAuthenticated) return false;
            return !block.includes(n.id);
          })
          .shift()
      );
  }, [notifications, isFetched]);

  return (
    <notificationContext.Provider
      value={{ markAsRead, fetched, notifications, current, block }}
    >
      <Modal openOn={current} functions={{ close: markAsRead }}>
        <Notification {...current} />
      </Modal>

      {children}
    </notificationContext.Provider>
  );
}
