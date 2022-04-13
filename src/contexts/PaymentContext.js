import { createContext, useState, useContext, useEffect } from "react";
import { createNewPayment, getAllPayments } from "../services/payment";
import { Payment } from "../utils/Types";
import { authContext } from "./AuthContext";

export const paymentContext = createContext({
  payFetched: Boolean,
  payments: Array(Payment),
  newPayment: Function,
});

export function PaymentProvider({ children }) {
  const [payFetched, setPayFetched] = useState(false);
  const [payments, setPayments] = useState([]);

  const { isAuthenticated, isFetched, sessionId, user } =
    useContext(authContext);

  async function importPayments() {
    await getAllPayments({ sessionId }).then((payments) => {
      setPayments(payments);
    });
    setPayFetched(true);
  }

  async function newPayment() {
    return new Promise((accept, reject) => {
      createNewPayment({ sessionId, name: user.data.name }).then(
        ({ success, payment }) => {
          if (!success) return reject();
          setPayments([...payments, payment]);
          accept(payment);
        },
        () => {
          reject();
        }
      );
    });
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    importPayments();
  }, [isFetched]);

  return (
    <paymentContext.Provider
      value={{
        payments,
        payFetched,
        newPayment,
      }}
    >
      {children}
    </paymentContext.Provider>
  );
}
