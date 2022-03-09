import styles from "../styles/components/Payment.module.css";

export function Payment({ close }) {
  function handlePayment() {
    console.info("Payment button click");
    close();
  }

  return (
    <>
      <div className={styles.overlay} onClick={close} />
      <div className={styles.container}>
        <img src="/icons/pix-banco-central.svg" alt="PIX" />
        <img src="/icons/qrcode-demo.svg" alt="QRcode" />
        <span>Realize a recarga e aguarde o processamento do pagamento.</span>
        <button onClick={handlePayment} type="button">
          Continuar
        </button>
      </div>
    </>
  );
}
