import { createContext, useState, useContext, useEffect } from "react";
import { createNewPayment, getAllPayments } from "../services/payment";
import { seasonContext } from "./SeasonContext";
import { Payment } from "../utils/Types";
import { authContext } from "./AuthContext";
import { Modal } from "../components/Modal";
import { RequirePayment } from "../components/RequirePayment";

export const paymentContext = createContext({
  payFetched: Boolean,
  paid: Boolean,
  payments: [Payment],
  newPayment: Function,
});

export function PaymentProvider({ children }) {
  const [payFetched, setPayFetched] = useState(false);
  const [paid, setPaid] = useState(false);
  const [payments, setPayments] = useState([]);

  const [require, setRequire] = useState(false);

  const { season, fetched } = useContext(seasonContext);
  const { isAuthenticated, isFetched, sessionId, user } =
    useContext(authContext);

  async function importPayments() {
    await getAllPayments({ sessionId }).then((payments) => {
      setPayments(payments);
      setPaid(
        !!payments
          .filter((p) => {
            return p.verified && p.season === season.id;
          })
          .pop()
      );
    });
    setPayFetched(true);
  }

  function requirePayment() {
    setRequire(true);
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
    if (!isFetched || !fetched) return;
    if (!isAuthenticated) return;
    importPayments();
  }, [isFetched, fetched]);

  return (
    <paymentContext.Provider
      value={{
        payments,
        payFetched,
        newPayment,
        paid,
        requirePayment,
      }}
    >
      <Modal openOn={require} functions={{ close: setRequire }}>
        <RequirePayment />
      </Modal>

      {children}
    </paymentContext.Provider>
  );
}
