import { Form } from "@unform/web";
import Link from "next/link";
import Router from "next/router";
import { Input } from "../components/Input";
import styles from "../styles/pages/UserAuth.module.css";

export default function Login() {
  function handleSubmit() {
    // Validação dos campos
    // Validação do usuário
    // Login e cache
    Router.push("/soccer");
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

        <Form onSubmit={handleSubmit}>
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
