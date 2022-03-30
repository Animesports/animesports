import { Form } from "@unform/web";
import Link from "next/link";
import Router from "next/router";
import { useRef } from "react";
import { useContext } from "react";
import { Input } from "../components/Input";
import { authContext } from "../contexts/AuthContext";
import styles from "../styles/pages/UserAuth.module.css";
import { useNextOnEnter } from "../utils/Inputs";

export default function Login() {
  const formRef = useRef(null);
  const { signIn } = useContext(authContext);

  function handleSubmit({ email, password }, { reset }) {
    // Validação dos campos
    // Validação do usuário
    // Login e cache

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useNextOnEnter(
      ["email", "password"].map((name) => formRef.current.getFieldRef(name)),
      async () => {
        await signIn({ email, password });
        Router.push("/soccer");
        reset();
      }
    );
  }

  return (
    <div className="container-fwh">
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Entrar</h1>
          <p>
            Entre com sua conta ou <Link href="/register">registre-se</Link>
          </p>
        </div>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="Introduza seu email"
            tag="email"
          ></Input>
          <Input
            name="password"
            autoComplete="off"
            type="password"
            placeholder="Insira sua senha"
            tag="senha"
          ></Input>
          <button type="submit">Acessar</button>
        </Form>
      </div>
    </div>
  );
}
