import { Form } from "@unform/web";
import Link from "next/link";
import { Input } from "../components/Input";
import styles from "../styles/pages/Home.module.css";

export default function Register() {
  function handleSubmit() {
    // Validação dos campos
    // Validação do usuário
    // Login e cache
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Registrar</h1>
        <p>
          Cadastre-se em nossa plataforma ou faça
          <Link href="/login">login</Link>
        </p>

        <Form onSubmit={handleSubmit}>
          <Input
            name="name"
            placeholder="Introduza seu nome"
            tag="nome"
          ></Input>
          <Input
            name="email"
            placeholder="Insira seu email"
            tag="email"
          ></Input>
          <Input
            name="password"
            autoComplete="off"
            placeholder="Crie uma senha"
            tag="senha"
          ></Input>
          <button type="submit">Próximo</button>
        </Form>
      </div>
    </div>
  );
}
