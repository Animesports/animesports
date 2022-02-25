import { Form } from "@unform/web";
import Link from "next/link";
import { Input } from "../components/Input";
import styles from "../styles/pages/Home.module.css";

export default function Login() {
  function handleSubmit() {
    // Validação dos campos
    // Validação do usuário
    // Login e cache
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Entrar</h1>
        <p>
          Entre com sua conta ou <Link href="/register">registre-se</Link>
        </p>

        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="Introduza seu email"
            tag="email"
          ></Input>
          <Input
            name="password"
            autoComplete="off"
            placeholder="Insira sua senha"
            tag="senha"
          ></Input>
          <button type="submit">Acessar</button>
        </Form>
      </div>
    </div>
  );
}
