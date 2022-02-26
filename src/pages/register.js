import { Form } from "@unform/web";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { Input } from "../components/Input";
import styles from "../styles/pages/UserAuth.module.css";

export default function Register() {
  const [currentStep, setCurrentStep] = useState("initial");

  function handleNextStep(data, { reset }) {
    // Validação dos campos
    setCurrentStep("email-validation");
  }

  function handleEmailValidation(data, { reset }) {
    // Validação de Email
    // Conclusão de cadastro
    Router.push("/soccer");
  }

  return (
    <div className="container-fwh">
      <div className={styles.content}>
        <h1>Registrar</h1>
        <p>
          Cadastre-se em nossa plataforma ou faça{" "}
          <Link href="/login">login</Link>
        </p>

        {["initial"].includes(currentStep) && (
          <Form onSubmit={handleNextStep}>
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
              type="password"
              placeholder="Crie uma senha"
              tag="senha"
            ></Input>
            <button type="submit">Próximo</button>
          </Form>
        )}

        {["email-validation"].includes(currentStep) && (
          <Form onSubmit={handleEmailValidation}>
            <Input
              name="code"
              placeholder="Código de 6 dígitos enviado por email"
              tag="código"
            ></Input>
            <button type="submit">Confirmar</button>
          </Form>
        )}
      </div>
    </div>
  );
}
