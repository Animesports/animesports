import { createContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export const socketContext = createContext({ Listen: (event, callback) => {} });

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [schedule, setSchedule] = useState([]);

  function Listen(event, callback) {
    if (!socket) return setSchedule([{ event, callback }, ...schedule]);
    socket.off(event);
    socket.on(event, callback);
  }

  useEffect(() => {
    setSocket(
      socketIOClient(process.env.NEXT_PUBLIC_FETCH_URI, {
        transports: ["websocket"],
      })
    );

    schedule.map((s) => {
      socket.off(s.event);
      socket.on(s.event, s.callback);
    });
  }, []);

  return (
    <socketContext.Provider
      value={{
        Listen,
      }}
    >
      {children}
    </socketContext.Provider>
  );
}
