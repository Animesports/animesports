import { Form } from "@unform/web";
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { Input } from "../components/Input";
import { authContext } from "../contexts/AuthContext";
import styles from "../styles/pages/UserAuth.module.css";
import { useNextOnEnter } from "../utils/Inputs";

export default function Register() {
  const [currentStep, setCurrentStep] = useState("initial");
  const { signUp } = useContext(authContext);
  const formRef = useRef(null);

  function handleNextStep({ name, email, password }, { reset }) {
    // Validação dos campos
    // Verificação de cadastro existente

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useNextOnEnter(
      ["name", "email", "password"].map((name) =>
        formRef.current.getFieldRef(name)
      ),
      () => {
        signUp({ name, email, password }).then(
          () => {
            setCurrentStep("email-validation");
            reset();
          },
          (error) => {
            console.info(error);
          }
        );
      }
    );
  }

  function handleEmailValidation(data, { reset }) {
    // Validação de Email
    // Conclusão de cadastro
    Router.push("/soccer");
    reset();
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
          <Form ref={formRef} onSubmit={handleNextStep}>
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
