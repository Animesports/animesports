import { useContext, useState } from "react";
import { paymentContext } from "../contexts/PaymentContext";
import styles from "../styles/components/Payment.module.css";
import { Loading } from "./Loading";
import { QrCodePix } from "qrcode-pix";
import copy from "copy-to-clipboard";

export function Payment({ close }) {
  const { payments, payFetched, newPayment } = useContext(paymentContext);

  const verifiedPayments = payments.filter((pay) => pay?.verified === true);
  const nonVerifiedPayments = payments.filter((pay) => pay?.verified === false);

  const [current, setCurrent] = useState("initial");
  const [qrcode, setQrcode] = useState(null);
  const [reference, setReference] = useState(null);

  function copyPayload() {
    copy(qrcode.payload);
  }

  function handleNewPayment() {
    newPayment().then(async (payment) => {
      const pix = QrCodePix({
        version: "01",
        key: process.env.NEXT_PUBLIC_PIX_KEY,
        name: "Animesports",
        city: "SAO PAULO",
        cep: "01153000",
        transactionId: payment.id,
        message: "Recarregue e continue jogando",
        value: 3.5,
      });
      setQrcode({
        base64: await pix.base64(),
        payload: pix.payload(),
      });

      setReference(payment.id);
      setCurrent("new-payment");
    });
  }

  if (!payFetched) {
    return (
      <>
        <div className={styles.overlay} onClick={close} />
        {["initial"].includes(current) && (
          <div className={styles.container}>
            <img src="/icons/pix-banco-central.svg" alt="PIX" />
            <Loading className={styles.loading} />
            <span>Realize uma recarga para continuar jogando</span>
          </div>
        )}
      </>
    );
  }

  if (payments.length >= 12) {
    return (
      <>
        <div className={styles.overlay} onClick={close} />
        <div className={styles.container}>
          <img src="/icons/pix-banco-central.svg" alt="PIX" />

          <span>
            Você atingiu o <strong>limite</strong>. Tente novamente após o
            término de uma recarga
          </span>

          <button className={styles.cancelButton} onClick={close} type="button">
            Voltar
          </button>
        </div>
      </>
    );
  }

  if (payments.length === 0 || current === "new-payment") {
    return (
      <>
        <div className={styles.overlay} onClick={close} />
        <div className={styles.container}>
          <img src="/icons/pix-banco-central.svg" alt="PIX" />
          {["new-payment"].includes(current) && (
            <>
              <img src={qrcode.base64} alt="QRcode" />
              <span>
                <strong className={styles.payReferecnce}>{reference}</strong>Use
                o código QR para realizar a recarga
              </span>
            </>
          )}

          {["initial"].includes(current) && (
            <>
              <span>Recarregue via PIX para continuar jogando</span>
              <button onClick={handleNewPayment} type="button">
                Recarregar
              </button>
            </>
          )}

          {["new-payment"].includes(current) && (
            <div className={styles.buttonDiv}>
              <button
                className="copy-button"
                onClick={copyPayload}
                type="button"
              >
                <img src="/icons/copy.svg" alt="c" /> Código
              </button>
              <button
                className={styles.cancelButton}
                onClick={close}
                type="button"
              >
                Voltar
              </button>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.overlay} onClick={close} />
      {["initial"].includes(current) && (
        <div className={styles.container}>
          <img src="/icons/pix-banco-central.svg" alt="PIX" />

          <span>
            Você possui
            {nonVerifiedPayments[0] && (
              <>
                {" "}
                <strong>{nonVerifiedPayments.length}</strong> recarga
                {nonVerifiedPayments.length > 1 ||
                nonVerifiedPayments.length === 0
                  ? "s"
                  : ""}{" "}
                aguardando aprovação
              </>
            )}
            {verifiedPayments[0] && (
              <>
                {" "}
                {nonVerifiedPayments[0] && "e "}
                <strong>{verifiedPayments.length}</strong>{" "}
                {!nonVerifiedPayments[0] && (
                  <>
                    recarga
                    {nonVerifiedPayments.length > 1 ||
                    nonVerifiedPayments.length === 0
                      ? "s"
                      : ""}{" "}
                  </>
                )}{" "}
                aprovada
                {nonVerifiedPayments.length > 1 ||
                nonVerifiedPayments.length === 0
                  ? "s"
                  : ""}
                .
              </>
            )}
          </span>

          <div className={styles.buttonDiv}>
            <button onClick={handleNewPayment} type="button">
              Recarregar
            </button>

            <button
              className={styles.cancelButton}
              onClick={close}
              type="button"
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
