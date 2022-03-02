import { Form } from "@unform/web";
import { useRef } from "react";
import Header from "../components/Header";
import styles from "../styles/pages/Account.module.css";
import SoccerStyle from "../styles/pages/Soccer.module.css";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";

export default function Account() {
  const ref = useRef(null);
  return (
    <div ref={ref} className={` ${SoccerStyle.container} container-fwh`}>
      <Header use="all" parentNode={ref} />

      <div className={[SoccerStyle.content, styles.content].join(" ")}>
        <Form
          onSubmit={(data) => {
            console.info(data);
          }}
        >
          <div className={styles.leftBox}>
            <div className={styles.profileBox}>
              <div className={styles.userImageBox}>
                <img
                  className={styles.image}
                  src="/icons/user.svg"
                  alt="user"
                />
              </div>
              <div className={styles.userName}>
                <span>Gabriel Bardasson</span>
                <button>
                  <img src="/icons/pencil.svg" alt="edit" />
                </button>
              </div>
            </div>
            <div className={styles.userInfoBox}>
              <div className={styles.emailInputBox}>
                <Input
                  name="email"
                  defaultValue="g*****son@gmail.com"
                  placeholder="Insira um email válido"
                  tag="email"
                />
                <button>verificar</button>
              </div>
              <div>
                <Input
                  name="pix"
                  defaultValue="minhachavepixtop"
                  placeholder="Insira sua chave PIX"
                  tag="chave pix"
                />
              </div>
              <div>
                <Input
                  name="password"
                  autoComplete="off"
                  type="password"
                  defaultValue="vhdsr20192020"
                  placeholder="Insira uma nova senha"
                  tag="Email"
                />
              </div>
            </div>
          </div>
          <div className={styles.rightBox}>
            <div className={styles.paymentBox}>
              <div>
                <span>Pagamento</span>
              </div>
              <img src="icons/fuel.svg" alt="fuel" />
              <span>Duas recargas em andamento</span>
            </div>
            <div className={styles.checkBox}>
              <Checkbox name="2step" label="Verificação em duas etapas" />
              <Checkbox name="notification" label="Notificações por e-mail" />
              <Checkbox name="darkmode" label="Modo escuro" />
            </div>
            <div className={styles.submitBox}>
              <button type="submit">Salvar</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}