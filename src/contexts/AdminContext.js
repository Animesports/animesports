import { createContext, useState, useContext, useEffect } from "react";
import {
  getAdminPayments,
  getAllUsers,
  removePayment,
  updatePayment,
} from "../services/admin";
import { Payment, User } from "../utils/Types";
import { authContext } from "./AuthContext";

export const adminContext = createContext({
  fetched: Boolean,
  payments: [Payment],
  receivePay: [Payment],
  sendPay: [Payment],
  history: [Payment],
  users: [User],
  receiveSum: Number,
  sendSum: Number,
  confirmPayment: Function,
  deletePayment: Function,
});

export function AdminProvider({ children }) {
  const { sessionId, isFetched, isAdmin } = useContext(authContext);
  const [fetched, setFetched] = useState(false);
  const [users, setUsers] = useState([]);

  const [payments, setPayments] = useState([]);
  const [receivePay, setPayReceive] = useState([]);
  const [sendPay, setPaySend] = useState([]);
  const [history, setHistory] = useState([]);

  const [receiveSum, setReceiveSum] = useState(0);
  const [sendSum, setSendSum] = useState(0);

  function confirmPayment({ id }) {
    updatePayment(
      { sessionId, id },
      {
        verified: true,
      }
    ).then(() => {
      const newPayments = payments.map((p) => {
        if (p.id === id) p.verified = true;
        return p;
      });

      setPayments(newPayments);
    });
  }

  function deletePayment({ id }) {
    return new Promise((accept, reject) => {
      removePayment({ sessionId, id }).then(
        () => {
          setPayments(payments.filter((p) => p.id !== id));
          accept();
        },
        () => {
          reject();
        }
      );
    });
  }

  async function importInitialData() {
    let lusers = null;
    await getAllUsers({ sessionId }).then((users) => {
      setUsers(users);
      lusers = users;
    });

    await getAdminPayments({ sessionId }).then((payments) => {
      setPayments(
        payments.map((payment) => {
          return {
            ...payment,
            user: lusers.filter(({ id }) => id === payment.reference)[0],
          };
        })
      );
    });

    setFetched(true);
  }

  useEffect(() => {
    if (!isAdmin) return;
    importInitialData();
  }, [isFetched]);

  useEffect(() => {
    console.info("Setting receive send");
    setPayReceive(
      payments
        .filter((payment) => payment?.verified === false)
        .filter((payment) => payment?.type === "receive")
    );

    setPaySend(
      payments
        .filter((payment) => payment?.verified === false)
        .filter((payment) => payment?.type === "send")
    );

    setHistory(payments.filter((payment) => payment?.verified === true));
  }, [payments]);

  function updateCounters() {
    console.info("Updating counters");
    if (receivePay[0]) {
      setReceiveSum(
        receivePay.reduce((a, b) => {
          return { value: a.value + b.value };
        }).value
      );
    }

    if (sendPay[0]) {
      setSendSum(
        sendPay.reduce((a, b) => {
          return { value: a.value + b.value };
        }).value
      );
    }
  }

  useEffect(() => {
    updateCounters();
  }, [receivePay, sendPay]);

  return (
    <adminContext.Provider
      value={{
        fetched,
        users,
        payments,
        receivePay,
        sendPay,
        history,
        receiveSum,
        sendSum,
        confirmPayment,
        deletePayment,
      }}
    >
      {children}
    </adminContext.Provider>
  );
}
