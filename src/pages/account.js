import { Form } from "@unform/web";
import styles from "../styles/pages/Account.module.css";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";
import { Payment } from "../components/Payment";
import { Modal } from "../components/Modal";
import { VerifyEmail } from "../components/VerifyEmail";
import { Structure } from "../components/Structure";
import { OnlyRegisteredUsers } from "../services/auth";
import { configContext } from "../contexts/ConfigContext";
import { Config } from "../utils/Types";
import { useContext, useRef } from "react";
import { configValidation } from "../utils/Yup";
import { paymentContext } from "../contexts/PaymentContext";
import { Loading } from "../components/Loading";
import { plural } from "../utils/Global";

export default function Account() {
  const [formref, openPaymentRef, openEmailVerify] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const { config, save, apply, saved, processing } = useContext(configContext);
  const { payments, payFetched } = useContext(paymentContext);

  const verifiedCount = payments.filter((pay) => pay?.verified).length;

  function handleSave() {
    configValidation(config, save, formref);
  }

  function handleChange() {
    const newConfigs = new Config();

    for (const option in newConfigs) {
      newConfigs[option] = formref.current.getFieldValue(option);
      if (typeof newConfigs[option] === "string")
        newConfigs[option] = newConfigs[option].trim();
      if (newConfigs[option].length === 0) newConfigs[option] = null;
    }
    configValidation(newConfigs, () => apply(newConfigs), formref);
  }

  return (
    <>
      <Structure contentClass={styles.content}>
        {OnlyRegisteredUsers((user) => {
          return (
            <>
              {
                <Form
                  ref={formref}
                  onChange={handleChange}
                  onSubmit={handleSave}
                >
                  <div className={styles.leftBox}>
                    <div className={styles.profileBox}>
                      <div className={styles.userImageBox}>
                        <img
                          className={styles.image}
                          src="/icons/user.svg"
                          alt="user"
                        />
                        <div className={styles.imageOverlay}>
                          <img src="/icons/camera.svg" alt="Change" />
                        </div>
                      </div>
                      <div className={styles.userName}>
                        <span>{user.data.name}</span>
                      </div>
                    </div>
                    <div className={styles.userInfoBox}>
                      <div className={styles.emailInputBox}>
                        <Input
                          name="email"
                          defaultValue={config.email}
                          placeholder="Insira um email válido"
                          tag="Email"
                        />
                        {!user.data.email.verified && (
                          <button type="button" ref={openEmailVerify}>
                            verificar
                          </button>
                        )}
                      </div>
                      <div>
                        <Input
                          name="pix"
                          defaultValue={config.pix}
                          placeholder="Chave PIX para receber recompensas"
                          tag="Chave PIX"
                        />
                      </div>
                      <div>
                        <Input
                          name="password"
                          autoComplete="off"
                          type="password"
                          defaultValue={config.password}
                          placeholder="Insira uma nova senha"
                          tag="Senha"
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.rightBox}>
                    <div className={styles.paymentBox} ref={openPaymentRef}>
                      <div>
                        <span>Pagamento</span>
                      </div>
                      {payFetched && verifiedCount === 0 && (
                        <>
                          <img src="icons/fuel.svg" alt="fuel" />
                          <span>Recarregue e continue jogando</span>
                        </>
                      )}
                      {payFetched && verifiedCount > 0 && (
                        <>
                          <img src="icons/approve.svg" alt="approve" />
                          <span>
                            {verifiedCount}{" "}
                            {plural(verifiedCount).convert("recarga")} em
                            andamento
                          </span>
                        </>
                      )}
                      {!payFetched && <Loading />}
                    </div>
                    <div className={styles.checkBox}>
                      <Checkbox
                        name="twosteps"
                        label="Verificação em duas etapas"
                        checked={config.twosteps}
                      />
                      <Checkbox
                        name="video"
                        label="Vídeo de fundo"
                        checked={config.video}
                      />
                      <Checkbox
                        name="darkmode"
                        label="Modo escuro"
                        checked={config.darkmode}
                      />
                    </div>
                    <div className={styles.submitBox}>
                      {!processing && !saved && (
                        <button type="submit">Salvar</button>
                      )}
                      {!processing && saved && (
                        <button className={styles.disable} type="button">
                          Salvo!
                        </button>
                      )}
                      {processing && (
                        <button className={styles.disable} type="button">
                          Salvando...
                        </button>
                      )}
                    </div>
                  </div>
                </Form>
              }
            </>
          );
        })}
      </Structure>

      <Modal openRef={openPaymentRef} customStyle>
        <Payment />
      </Modal>

      <Modal openRef={openEmailVerify} customStyle>
        <VerifyEmail />
      </Modal>
    </>
  );
}
