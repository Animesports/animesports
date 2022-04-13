import { createContext, useState, useContext, useEffect } from "react";
import { getAdminPayments, getAllUsers } from "../services/admin";
import { Payment, User } from "../utils/Types";
import { authContext } from "./AuthContext";

export const adminContext = createContext({
  fetched: Boolean,
  payments: [Payment],
  users: [User],
});

export function AdminProvider({ children }) {
  const { sessionId, isFetched, isAdmin } = useContext(authContext);
  const [fetched, setFetched] = useState(false);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  async function importInitialData() {
    await getAdminPayments({ sessionId }).then((payments) => {
      setPayments(payments);
    });

    await getAllUsers({ sessionId }).then((users) => {
      setUsers(users);
    });

    setFetched(true);
  }

  useEffect(() => {
    if (!isAdmin) return;
    importInitialData();
  }, [isFetched]);

  useEffect(() => {
    console.info(payments, users);
  }, [payments, users]);

  return (
    <adminContext.Provider
      value={{
        fetched,
        users,
        payments,
      }}
    >
      {children}
    </adminContext.Provider>
  );
}
